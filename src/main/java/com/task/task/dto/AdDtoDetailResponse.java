package com.task.task.dto;
import com.task.task.enums.Category;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AdDtoDetailResponse {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private Category category;
    private String city;
    private LocalDate datePosted;
    private UserDtoResponse user;
}
