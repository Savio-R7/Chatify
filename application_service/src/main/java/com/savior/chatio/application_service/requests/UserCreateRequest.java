package com.savior.chatio.application_service.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreateRequest{
    private String name;
    private int countryCode;
    private String phone;
}