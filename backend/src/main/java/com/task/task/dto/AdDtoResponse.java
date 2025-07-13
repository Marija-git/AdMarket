package com.task.task.dto;
import com.task.task.enums.Category;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class AdDtoResponse {
    private Long id;
    private String imageUrl;
    private String title;
    private BigDecimal price;
    private String city;
    private Category category;
    private String ownerUsername;
    private String description;
    private LocalDate datePosted;
    private String phone;
}
