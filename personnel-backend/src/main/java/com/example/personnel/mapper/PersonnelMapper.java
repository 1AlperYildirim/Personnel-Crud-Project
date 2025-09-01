package com.example.personnel.mapper;

import com.example.personnel.dto.PersonnelDTO;
import com.example.personnel.entity.Personnel;

import java.util.List;

public final class PersonnelMapper {
    private PersonnelMapper() {}

    public static PersonnelDTO toDTO(Personnel e) {
        if (e == null) return null;
        return PersonnelDTO.builder()
                .id(e.getId())
                .fullName(e.getFullName())
                .registryNumber(e.getRegistryNumber())
                .email(e.getEmail())
                .department(e.getDepartment())
                .build();
    }

    public static Personnel toEntity(PersonnelDTO d) {
        if (d == null) return null;
        return Personnel.builder()
                .id(d.getId())
                .fullName(d.getFullName())
                .registryNumber(d.getRegistryNumber())
                .email(d.getEmail())
                .department(d.getDepartment())
                .build();
    }

    public static List<PersonnelDTO> toDTOList(List<Personnel> list) {
        return list.stream().map(PersonnelMapper::toDTO).toList();
    }
}
