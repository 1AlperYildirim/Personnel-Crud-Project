package com.example.personnel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter
@Data
@NoArgsConstructor @AllArgsConstructor @Builder
public class PersonnelDTO {
    private Long id;
    private String fullName;
    private String department;
    private String email;
    private String registryNumber;
}
