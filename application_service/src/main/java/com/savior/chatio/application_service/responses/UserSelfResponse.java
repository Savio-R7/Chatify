package com.savior.chatio.application_service.responses;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSelfResponse implements Response {
    private int id;
    private String name;
    private int countryCode;
    private String phone;
    private String role;
    private boolean isBlocked;
    private boolean isDeleted;
    private boolean isOnline;
    private Date createdAt;
    private Date updatedAt;
    private Date lastSeenAt;
}
