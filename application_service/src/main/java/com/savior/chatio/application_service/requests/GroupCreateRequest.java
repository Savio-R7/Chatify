package com.savior.chatio.application_service.requests;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupCreateRequest {
    private String name;
    private String description;
    private Set<Integer> members;
}
