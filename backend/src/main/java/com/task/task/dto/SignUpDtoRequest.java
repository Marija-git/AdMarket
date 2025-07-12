package com.task.task.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignUpDtoRequest {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    @Pattern(regexp = "^[0-9]{9,10}$", message = "Please,enter a valid phone number.")
    private String phone;
}
