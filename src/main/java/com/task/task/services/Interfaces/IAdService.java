package com.task.task.services.Interfaces;
import com.task.task.dto.AdDtoDetailResponse;
import com.task.task.dto.AdDtoResponse;
import com.task.task.entities.Ad;
import com.task.task.enums.Category;
import org.springframework.data.domain.Page;
import java.math.BigDecimal;

public interface IAdService {
    Page<AdDtoResponse> getAll(String title, Category category, BigDecimal minPrice, BigDecimal maxPrice,
                               int page, int size,Boolean mineOnly);

    public AdDtoDetailResponse getById(Long id);

    Ad createAd(Ad ad);

    public Ad updateAd(Long id, Ad adData);

    public void deleteAd(Long id);

}
