package com.task.task.mapper;
import com.task.task.dto.AdDtoResponse;
import com.task.task.entities.Ad;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdMapper {
    AdDtoResponse toDto(Ad ad);
}
