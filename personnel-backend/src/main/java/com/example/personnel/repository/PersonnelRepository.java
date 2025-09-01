package com.example.personnel.repository;

import com.example.personnel.entity.Personnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonnelRepository extends JpaRepository<Personnel, Long> {
    
    boolean existsByEmail(String email);
    boolean existsByRegistryNumber(String registryNumber);

    @Query("SELECT p FROM Personnel p " +
       "WHERE (:fullName IS NULL OR LOWER(p.fullName) LIKE LOWER(CONCAT('%', :fullName, '%'))) " +
       "AND (:registryNumber IS NULL OR p.registryNumber LIKE CONCAT('%', :registryNumber, '%')) " +
       "AND (:email IS NULL OR LOWER(p.email) LIKE LOWER(CONCAT('%', :email, '%'))) " +
       "AND (:department IS NULL OR LOWER(p.department) LIKE LOWER(CONCAT('%', :department, '%')))")
List<Personnel> findByFilters(@Param("fullName") String fullName, 
                             @Param("registryNumber") String registryNumber, 
                             @Param("email") String email, 
                             @Param("department") String department);

}