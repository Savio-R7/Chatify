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
public class UserResponse implements Response {
    private int id;
    private String name;
    private int countryCode;
    private String phone;
    private byte[] publicKey;
    private boolean isOnline;
    private Date lastSeenAt;
}
