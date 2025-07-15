package com.savior.chatio.application_service.controllers;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.savior.chatio.application_service.exceptions.InternalTamperingException;
import com.savior.chatio.application_service.exceptions.NotFoundException;
import com.savior.chatio.application_service.requests.UserCreateRequest;
import com.savior.chatio.application_service.requests.UserLoginOtpRequest;
import com.savior.chatio.application_service.requests.UserOTPRequest;
import com.savior.chatio.application_service.responses.UserKeyPairResponse;
import com.savior.chatio.application_service.responses.UserLoginOtpResponse;
import com.savior.chatio.application_service.responses.UserOtpResponse;
import com.savior.chatio.application_service.responses.UserResponse;
import com.savior.chatio.application_service.responses.UserSelfResponse;
import com.savior.chatio.application_service.services.UserService;
import com.savior.chatio.application_service.models.User;


@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/signup")
    public UserOtpResponse createUser(@RequestBody UserCreateRequest request){ 
        User user = userService.createUser(request.getName(), request.getCountryCode(), request.getPhone());
        user = userService.generateOneTimePassword(user.getPhone()).get();
        return UserOtpResponse.builder()
            .phone(user.getPhone())
            .OneTimePassword(user.getOneTimePassword())
            .build();
    }

    @PostMapping("/otp/request")
    public UserOtpResponse requestOTP(@RequestBody UserOTPRequest request){
        Optional<User> user = userService.generateOneTimePassword(request.getPhone());
        if (user.isPresent()){
            return UserOtpResponse.builder()
                .phone(user.get().getPhone())
                .OneTimePassword(user.get().getOneTimePassword())
                .build();
        }
        throw new NotFoundException("User not found. Create an account first.");
    }

    @PostMapping("/login")
    public UserLoginOtpResponse verifyLogin(@RequestBody UserLoginOtpRequest request){
        Optional<User> user = userService.loginUser(request.getPhone(), request.getOneTimePassword());
        if (user.isPresent()){
            Optional<String> token = userService.generateToken(user.get().getId());
            if (token.isPresent()){
                return UserLoginOtpResponse.builder()
                    .token(token.get())
                    .build();
            }
        }
        throw new NotFoundException("Request OTP first.");
    }

    @GetMapping("")
    public UserSelfResponse getCurrentUser(@RequestAttribute("uid") int id){
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()){
            return UserSelfResponse.builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .countryCode(user.get().getCountryCode())
                .phone(user.get().getPhone())
                .role(user.get().getRole().toString())
                .isBlocked(user.get().isBlocked())
                .isDeleted(user.get().isDeleted())
                .isOnline(user.get().isOnline())
                .createdAt(user.get().getCreatedAt())
                .updatedAt(user.get().getUpdatedAt())
                .lastSeenAt(user.get().getLastSeenAt())
                .build();
        }
        throw new InternalTamperingException("Cannot reach this point. Internal tampering detected.");
    }

    @PostMapping("/generateKeyPair")
    public UserKeyPairResponse generateKeyPair(@RequestHeader("uid") int id, @RequestHeader("role") String role) {
        Optional<User> user = userService.generateKeyPair(id);
        if (user.isPresent()){
            return UserKeyPairResponse.builder()
                .publicKey(user.get().getPublicKey())
                .privateKey(user.get().getPrivateKey())
                .build();
        }
        throw new InternalTamperingException("Cannot reach this point. Internal tampering detected.");
    }
    
    @GetMapping("/{phone}")
    public UserResponse getUserByPhone(@PathVariable String phone){
        Optional<User> user = userService.getUserByPhone(phone);
        if (user.isPresent()){
            return UserResponse.builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .countryCode(user.get().getCountryCode())
                .phone(user.get().getPhone())
                .publicKey(user.get().getPublicKey())
                .isOnline(user.get().isOnline())
                .lastSeenAt(user.get().getLastSeenAt())
                .build();
        }
        throw new NotFoundException("User not found.");
    }

    @PostMapping("/status/online")
    public UserResponse updateUserStatusOnline(@RequestHeader("uid") int id, @RequestHeader("role") String role){
        Optional<User> user = userService.setUserOnline(id);
        if (user.isPresent()){
            return UserResponse.builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .countryCode(user.get().getCountryCode())
                .phone(user.get().getPhone())
                .publicKey(user.get().getPublicKey())
                .isOnline(user.get().isOnline())
                .lastSeenAt(user.get().getLastSeenAt())
                .build();
        }
        throw new InternalTamperingException("Cannot reach this point. Internal tampering detected.");
    }

    @PostMapping("/status/offline")
    public UserResponse updateUserStatusOffline(@RequestHeader("uid") int id, @RequestHeader("role") String role){
        Optional<User> user = userService.setUserOffline(id);
        if (user.isPresent()){
            return UserResponse.builder()
                .id(user.get().getId())
                .name(user.get().getName())
                .countryCode(user.get().getCountryCode())
                .phone(user.get().getPhone())
                .publicKey(user.get().getPublicKey())
                .isOnline(user.get().isOnline())
                .lastSeenAt(user.get().getLastSeenAt())
                .build();
        }
        throw new InternalTamperingException("Cannot reach this point. Internal tampering detected.");
    }

}
