package com.example.personnel.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "personnel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Personnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "department", nullable = false)
    private String department;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "registry_number", nullable = false, unique = true)
    private String registryNumber;

}
