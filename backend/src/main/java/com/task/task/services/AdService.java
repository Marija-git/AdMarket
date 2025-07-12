package com.task.task.services;
import com.task.task.dto.AdDtoDetailResponse;
import com.task.task.dto.AdDtoResponse;
import com.task.task.entities.Ad;
import com.task.task.entities.User;
import com.task.task.enums.Category;
import com.task.task.mapper.AdMapper;
import com.task.task.repositories.Interfaces.IAdRepository;
import com.task.task.repositories.Interfaces.IUserRepository;
import com.task.task.services.Interfaces.IAdService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.time.LocalDate;


@Service
public class AdService implements IAdService {

    private final IAdRepository adRepository;
    private final AdMapper adMapper;
    private final IUserRepository userRepository;

    public AdService(IAdRepository adRepository, AdMapper adMapper,IUserRepository userRepository) {
        this.adRepository = adRepository;
        this.adMapper = adMapper;
        this.userRepository=userRepository;
    }

    @Override
    public Page<AdDtoResponse> getAll(String title, Category category, BigDecimal minPrice, BigDecimal maxPrice,
                                      int page, int size, Boolean mineOnly)
    {
        Specification<Ad> spec = (root, query, cb) -> cb.conjunction(); //SELECT * FROM ads WHERE 1=1

        if (title != null && !title.isBlank()) {
            spec = spec.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
        }
        if (category != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("category"), category));
        }
        if (minPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if (Boolean.TRUE.equals(mineOnly)) {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You must be authenticated to filter by your ads");
            }

            String currentUsername = authentication.getName();

            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("user").get("username"), currentUsername));
        }

        Page<Ad> ads = adRepository.findAll(spec, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "datePosted")));
        return ads.map(adMapper::toDto);
    }

    @Override
    public AdDtoDetailResponse getById(Long id) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID " + id + " not found"));
        return adMapper.toDetailDto(ad);
    }

    @Override
    public Ad createAd(Ad ad) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You must be authenticated to create an ad");
        }
        String currentUsername = authentication.getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        ad.setUser(user);
        ad.setDatePosted(LocalDate.now());
        return adRepository.save(ad);
    }

    @Override
    public Ad updateAd(Long id, Ad adData) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You must be authenticated to update an ad");
        }
        String currentUsername = authentication.getName();

        Ad existingAd = adRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID " + id + " not found"));

        if (!existingAd.getUser().getUsername().equals(currentUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this ad");
        }

        existingAd.setTitle(adData.getTitle());
        existingAd.setDescription(adData.getDescription());
        existingAd.setImageUrl(adData.getImageUrl());
        existingAd.setPrice(adData.getPrice());
        existingAd.setCity(adData.getCity());
        existingAd.setCategory(adData.getCategory());

        return adRepository.save(existingAd);
    }

    @Override
    public void deleteAd(Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You must be authenticated to delete an ad");
        }

        Ad ad = adRepository.findById(id)
                .orElseThrow(() ->new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with ID " + id + " not found"));

        String currentUsername = authentication.getName();
        if (!ad.getUser().getUsername().equals(currentUsername)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this ad");
        }

        adRepository.delete(ad);
    }

}

