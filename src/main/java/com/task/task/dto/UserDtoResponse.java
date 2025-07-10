package com.task.task.dto;
import lombok.Data;
import java.time.LocalDate;

@Data
public class UserDtoResponse {
    private Long id;
    private String username;
    private String phone;
    private LocalDate registrationDate;
}
