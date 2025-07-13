package com.task.task.mapper;
import com.task.task.dto.AdDtoRequest;
import com.task.task.dto.AdDtoResponse;
import com.task.task.dto.UserDtoResponse;
import com.task.task.entities.Ad;
import com.task.task.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface AdMapper {

    @Mapping(source = "user.username", target = "ownerUsername")
    @Mapping(source = "user.phone", target = "phone")
    AdDtoResponse toDto(Ad ad);

    Ad fromRequest(AdDtoRequest request);

    void updateAdFromRequest(AdDtoRequest request, @MappingTarget Ad ad);

    UserDtoResponse toUserDto(User user);

}
