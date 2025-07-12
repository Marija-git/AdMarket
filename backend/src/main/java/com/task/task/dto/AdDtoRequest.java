package com.task.task.dto;
import com.task.task.enums.Category;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdDtoRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String imageUrl;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Price cannot be negative")
    @Digits(integer = 12, fraction = 2, message = "Price must be a valid amount (max 12 digits and 2 decimal places)")
    private BigDecimal price;

    @NotBlank(message = "City is required")
    private String city;

    @NotNull(message = "Category is required")
    private Category category;
}
