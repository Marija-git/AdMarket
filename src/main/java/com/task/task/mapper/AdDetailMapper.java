package com.task.task.mapper;
import com.task.task.dto.AdDtoDetailResponse;
import com.task.task.dto.UserDtoResponse;
import com.task.task.entities.Ad;
import com.task.task.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdDetailMapper {
    AdDtoDetailResponse toAdDetailDto(Ad ad);
    UserDtoResponse toUserDto(User user);
}
