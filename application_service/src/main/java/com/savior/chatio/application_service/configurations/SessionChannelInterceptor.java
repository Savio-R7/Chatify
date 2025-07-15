package com.savior.chatio.application_service.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;
import com.savior.chatio.application_service.exceptions.UnauthorizedException;
import com.savior.chatio.application_service.models.User;
import com.savior.chatio.application_service.services.JWTService;
import com.savior.chatio.application_service.services.UserService;

import io.jsonwebtoken.Claims;

@Component
public class SessionChannelInterceptor implements ChannelInterceptor {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserService userService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            if (accessor.containsNativeHeader("Authorization")) {
                String token = accessor.getFirstNativeHeader("Authorization");
                if (token.startsWith("Bearer ")) {
                    token = token.substring(7);
                    Claims claims = jwtService.extractAllClaims(token);
                    User user = userService.getUserById((Integer) claims.get("uid")).orElseThrow(() -> new UnauthorizedException("Unauthorized"));
                    accessor.setUser(user);
                    return message;
                }
            }
            throw new UnauthorizedException("Unauthorized");
        }
        return message;
    }
    
}
