package com.savior.chatio.application_service.controllers;

import java.security.Principal;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import com.savior.chatio.application_service.exceptions.UnauthorizedException;
import com.savior.chatio.application_service.models.Message;
import com.savior.chatio.application_service.models.User;
import com.savior.chatio.application_service.requests.commands.MessagePayload;
import com.savior.chatio.application_service.requests.commands.CommandRequest;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class MessageController {
    @MessageMapping("/user/{phoneNumber}")
    @SendTo("/queue/{phoneNumber}")
    public Message sendMessage(@Payload CommandRequest commandRequest, @DestinationVariable String phoneNumber, Principal principal) {
        log.info("Sending message to {}", phoneNumber);
        User user = (User) principal;
        if (commandRequest.getCommandType().equals("MESSAGE") && commandRequest.getPayload() instanceof MessagePayload) {
            MessagePayload messageRequest = (MessagePayload) commandRequest.getPayload();
            Message message = Message.builder()
                .from(user.getPhone())
                .to(messageRequest.getGroup().isPresent() ? messageRequest.getTo().toString() : phoneNumber )
                .message(messageRequest.getMessage())
                .group(messageRequest.getGroup().orElse(null))
                .build();
            return message;
        }
        throw new IllegalArgumentException("Invalid message request");
    }

    @SubscribeMapping("/queue/{phoneNumber}")
    public void subscribeToUser(@DestinationVariable String phoneNumber, Principal principal) {
        if (principal instanceof User){
            User user = (User) principal;
            if (!phoneNumber.equals(user.getPhone())) {
                throw new UnauthorizedException("You are not authorized to view this user's messages");
            }
        }
        log.info("Subscribed to {}", phoneNumber);
    }

}
