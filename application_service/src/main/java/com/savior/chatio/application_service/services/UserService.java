package com.savior.chatio.application_service.services;

import java.util.Optional;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.savior.chatio.application_service.exceptions.AlreadyExistsException;
import com.savior.chatio.application_service.exceptions.InvalidCredentialsException;
import com.savior.chatio.application_service.exceptions.NotFoundException;
import com.savior.chatio.application_service.models.Role;
import com.savior.chatio.application_service.models.User;
import com.savior.chatio.application_service.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTService jwtService;

    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User createUser(String name, int countryCode, String phone) {
        if (userRepository.findByPhone(phone).isPresent()){
            throw new AlreadyExistsException("User with phone number " + phone + " already exists.");
        }
        User user = User.builder()
            .name(name)
            .countryCode(countryCode)
            .phone(phone)
            .role(Role.USER)
            .oneTimePassword(0)
            .isBlocked(false)
            .isDeleted(false)
            .isOnline(false)
            .build();
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String phone, int otp) {
        if (this.verifyOneTimePassword(phone, otp)){
            return this.getUserByPhone(phone);
        }
        return Optional.empty();
    }

    public Optional<User> updateUserName(int id, String name){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setName(name);
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<User> updateUserPhone(int id, int countryCode, String phone){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setCountryCode(countryCode);
            user.get().setPhone(phone);
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<User> generateOneTimePassword(String phone){
        Optional<User> user = userRepository.findByPhone(phone);
        if(user.isPresent()){
            user.get().setOneTimePassword((int)(Math.random() * 10000));
            // Logic to send OTP to user via SMS
            System.out.println("OTP: >>>>> " + user.get().getOneTimePassword() + " <<<<<");
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public boolean verifyOneTimePassword(int id, int otp){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent() && user.get().getOneTimePassword() != 0){
            if (user.get().getOneTimePassword() == otp){
                user.get().setOneTimePassword(0);
                userRepository.save(user.get());
                return true;
            }
        }
        return false;
    }

    public boolean verifyOneTimePassword(String phone, int otp){
        Optional<User> user = userRepository.findByPhone(phone);
        if(user.isPresent() && user.get().getOneTimePassword() != 0){
            if (user.get().getOneTimePassword() == otp){
                user.get().setOneTimePassword(0);
                userRepository.save(user.get());
                return true;
            }
            throw new InvalidCredentialsException("Invalid OTP provided by user.");
        }
        throw new NotFoundException("User not found. Create an account first.");
    }

    public Optional<User> blockUserSwitch(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setBlocked(!user.get().isBlocked());
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<User> deleteUser(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setDeleted(true);
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<User> setUserOnline(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setOnline(true);
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<User> setUserOffline(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            user.get().setOnline(false);
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<User> generateKeyPair(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            try{
                KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
                keyPairGenerator.initialize(2048);
                KeyPair keys = keyPairGenerator.generateKeyPair();
                user.get().setPublicKey(keys.getPublic().getEncoded());
                user.get().setPrivateKey(keys.getPrivate().getEncoded());
            } catch (Exception e){
                return Optional.empty();
            }
            return Optional.of(userRepository.save(user.get()));
        }
        return Optional.empty();
    }

    public Optional<String> generateToken(int id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return Optional.of(jwtService.generateToken(user.get()));
        }
        return Optional.empty();
    }
}
