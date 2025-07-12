package com.task.task.dto;
import com.task.task.enums.Category;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class AdDtoResponse {
    private String imageUrl;
    private String title;
    private BigDecimal price;
    private String city;
    private Category category;
    private String ownerUsername;
}
