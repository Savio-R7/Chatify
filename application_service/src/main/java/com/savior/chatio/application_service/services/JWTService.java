package com.savior.chatio.application_service.services;

import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;
import com.savior.chatio.application_service.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {

    private final String SECRET_KEY = "F9669B65E3A6AAA16EA37FC284E4121419A551E54468574D3EE746C3F3";

    public Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(User user) {
        return Jwts
                .builder()
                .claims()
                    .add("uid", user.getId())
                    .add("role", user.getRole())
                    .add("phone", user.getPhone())
                .and()
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 60*60*1000 ))
                .signWith(getSigninKey())
                .compact();
    }

    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
