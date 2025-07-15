package com.savior.chatio.application_service.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserKeyPairResponse implements Response {
    private byte[] publicKey;
    private byte[] privateKey;
}
