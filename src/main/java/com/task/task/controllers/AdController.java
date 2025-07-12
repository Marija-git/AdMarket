package com.task.task.controllers;
import com.task.task.dto.AdDtoDetailResponse;
import com.task.task.dto.AdDtoRequest;
import com.task.task.dto.AdDtoResponse;
import com.task.task.entities.Ad;
import com.task.task.enums.Category;
import com.task.task.mapper.AdMapper;
import com.task.task.services.Interfaces.IAdService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;


@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {

    private final IAdService adService;
    private final AdMapper adMapper;


    @GetMapping
    public Page<AdDtoResponse> getall(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) Boolean mineOnly
    ) {
        return adService.getAll(title, category, minPrice, maxPrice, page, size, mineOnly);
    }

    @GetMapping("/{id}")
    public AdDtoDetailResponse getAdById(@PathVariable Long id) {
        return adService.getById(id);
    }


    @PostMapping
    public AdDtoDetailResponse createAd(@Valid @RequestBody AdDtoRequest request) {
        Ad ad = adMapper.fromRequest(request);
        Ad saved = adService.createAd(ad);
        return adMapper.toDetailDto(saved);
    }

    @PutMapping("/{id}")
    public AdDtoDetailResponse updateAd(@PathVariable Long id, @RequestBody AdDtoRequest request) {
        Ad adToUpdate = adMapper.fromRequest(request);
        Ad updated = adService.updateAd(id, adToUpdate);
        return adMapper.toDetailDto(updated);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAd(@PathVariable Long id) {
        adService.deleteAd(id);
    }
}
