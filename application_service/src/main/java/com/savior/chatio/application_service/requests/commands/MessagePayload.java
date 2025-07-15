package com.savior.chatio.application_service.requests.commands;

import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessagePayload implements Payload {
    String message;
    Optional<String> to;
    Optional<Integer> group;
}
