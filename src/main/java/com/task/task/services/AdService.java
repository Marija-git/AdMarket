package com.task.task.services;

import com.task.task.dto.AdDtoDetailResponse;
import com.task.task.dto.AdDtoResponse;
import com.task.task.entities.Ad;
import com.task.task.enums.Category;
import com.task.task.exceptions.NotFoundException;
import com.task.task.mapper.AdDetailMapper;
import com.task.task.mapper.AdMapper;
import com.task.task.repositories.Interfaces.IAdRepository;
import com.task.task.services.Interfaces.IAdService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;


@Service
public class AdService implements IAdService {

    private final IAdRepository adRepository;
    private final AdMapper adMapper;
    private final AdDetailMapper adDetailMapper;

    public AdService(IAdRepository adRepository, AdMapper adMapper,AdDetailMapper adDetailMapper) {
        this.adRepository = adRepository;
        this.adMapper = adMapper;
        this.adDetailMapper = adDetailMapper;
    }

    @Override
    public Page<AdDtoResponse> getAll(String title, Category category, BigDecimal minPrice, BigDecimal maxPrice,
                                      int page, int size)
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

        Page<Ad> ads = adRepository.findAll(spec, PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "datePosted")));
        return ads.map(adMapper::toDto);
    }

    @Override
    public AdDtoDetailResponse getById(Long id) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Ad not found with id: " + id));
        return adDetailMapper.toAdDetailDto(ad);
    }
}

