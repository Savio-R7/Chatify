package com.savior.chatio.application_service.models;

import java.security.Principal;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.EnumType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements Principal {
    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private int countryCode;
    @Column(nullable = false, unique = true)
    private String phone;
    private int oneTimePassword;

    @Enumerated(EnumType.STRING)
    private Role role;
    
    @Lob
    private byte[] publicKey;
    @Lob
    private byte[] privateKey;

    private boolean isBlocked;
    private boolean isDeleted;
    private boolean isOnline;

    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;
    private Date lastSeenAt;
}