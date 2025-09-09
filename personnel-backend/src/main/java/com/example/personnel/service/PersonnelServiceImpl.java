package com.example.personnel.service;

import com.example.personnel.entity.Personnel;
import com.example.personnel.exception.ResourceNotFoundException;
import com.example.personnel.repository.PersonnelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonnelServiceImpl implements PersonnelService {

    private final PersonnelRepository repo;
    private final EmailService emailService;

    @Override
    public List<Personnel> getAll() {
        return repo.findAll();
    }

    @Override
    public Personnel create(Personnel p) {
        try {
            Personnel saved = repo.save(p);
            emailService.sendWelcomeEmail(saved.getEmail(), saved.getFullName());
            return saved;
        } catch (DataIntegrityViolationException ex) {
            throw ex;
        }
    }

    @Override
    public Personnel update(Long id, Personnel p) {
        Personnel existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personnel not found: " + id));

        boolean emailChanged = !existing.getEmail().equals(p.getEmail());
        boolean infoChanged =
                !existing.getFullName().equals(p.getFullName()) ||
                !existing.getRegistryNumber().equals(p.getRegistryNumber()) ||
                !existing.getDepartment().equals(p.getDepartment());

        existing.setFullName(p.getFullName());
        existing.setRegistryNumber(p.getRegistryNumber());
        existing.setEmail(p.getEmail());
        existing.setDepartment(p.getDepartment());

        try {
            Personnel updated = repo.save(existing);

            if (emailChanged) {
                emailService.sendUpdateEmail(updated.getEmail(), updated.getFullName());
            } 
            else if (infoChanged) {
                emailService.sendUpdateEmail(updated.getEmail(), updated.getFullName());
            }

            return updated;
        } catch (DataIntegrityViolationException ex) {
            throw ex;
        }
    }

    @Override
    public void delete(Long id) {
        Personnel existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Personnel not found: " + id));

        emailService.sendDeletionEmail(existing.getEmail(), existing.getFullName());

        repo.delete(existing);
    }

    @Override
    public List<Personnel> search(String fullName, String registry, String email, String department) {
        return repo.findByFilters(fullName, registry, email, department);
    }
}
