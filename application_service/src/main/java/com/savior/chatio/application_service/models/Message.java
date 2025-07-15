package com.savior.chatio.application_service.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    String message;
    String from;
    String to;
    Integer group;
    Date createdAt;
}
