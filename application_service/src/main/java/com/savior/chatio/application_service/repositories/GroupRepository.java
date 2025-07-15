package com.savior.chatio.application_service.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.savior.chatio.application_service.models.Group;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    public Optional<Group> findByJoinCode(String joinCode);
    public List<Group> findByMembersContains(int userId);
    public List<Group> findByCreator(int creator);
    public boolean existsByIdAndCreator(int id, int creator);
    public boolean existsByIdAndMembersContains(int id, int userId);
    
}
