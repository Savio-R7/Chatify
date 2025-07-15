package com.savior.chatio.application_service.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOtpResponse implements Response {
    private String phone;
    private int OneTimePassword;
}