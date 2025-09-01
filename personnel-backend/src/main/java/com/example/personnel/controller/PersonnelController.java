package com.example.personnel.controller;

import com.example.personnel.dto.PersonnelDTO;
import com.example.personnel.entity.Personnel;
import com.example.personnel.mapper.PersonnelMapper;
import com.example.personnel.service.PersonnelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/personnel")
@RequiredArgsConstructor
public class PersonnelController {

    private final PersonnelService personnelService;

    @GetMapping
    public ResponseEntity<List<PersonnelDTO>> getAll() {
        List<PersonnelDTO> list = personnelService.getAll()
                .stream()
                .map(PersonnelMapper::toDTO)
                .toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<PersonnelDTO> create(@RequestBody PersonnelDTO dto) {
        Personnel saved = personnelService.create(PersonnelMapper.toEntity(dto));
        return ResponseEntity.ok(PersonnelMapper.toDTO(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonnelDTO> update(@PathVariable Long id, @RequestBody PersonnelDTO dto) {
        Personnel updated = personnelService.update(id, PersonnelMapper.toEntity(dto));
        return ResponseEntity.ok(PersonnelMapper.toDTO(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        personnelService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<PersonnelDTO>> search(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String registryNumber,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String department
    ) {
        List<PersonnelDTO> list = personnelService.search(fullName, registryNumber, email, department)
                .stream()
                .map(PersonnelMapper::toDTO)
                .toList();
        return ResponseEntity.ok(list);
    }

}