package com.savior.chatio.application_service.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.savior.chatio.application_service.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    public Optional<User> findByPhone(String phone);
}
