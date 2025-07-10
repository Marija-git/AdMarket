package com.task.task.controllers;
import com.task.task.dto.AdDtoDetailResponse;
import com.task.task.dto.AdDtoResponse;
import com.task.task.enums.Category;
import com.task.task.services.Interfaces.IAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {

    private final IAdService adService;

    @GetMapping
    public Page<AdDtoResponse> getall(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return adService.getAll(title, category, minPrice, maxPrice, page, size);
    }

    @GetMapping("/{id}")
    public AdDtoDetailResponse getAdById(@PathVariable Long id) {
        return adService.getById(id);
    }
}
