package com.savior.chatio.application_service.requests.commands;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CallPayload implements Payload {
    Date createdAt;
}
