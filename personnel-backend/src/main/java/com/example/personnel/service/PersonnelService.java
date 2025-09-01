package com.example.personnel.service;

import com.example.personnel.entity.Personnel;

import java.util.List;

public interface PersonnelService {

    List<Personnel> getAll();

    Personnel create(Personnel p);

    Personnel update(Long id, Personnel p);

    void delete(Long id);

    List<Personnel> search(String name, String registry, String email, String department);
}
