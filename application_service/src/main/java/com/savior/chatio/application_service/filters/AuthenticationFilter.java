package com.savior.chatio.application_service.filters;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import com.savior.chatio.application_service.exceptions.UnauthorizedException;
import com.savior.chatio.application_service.services.JWTService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class AuthenticationFilter implements Filter {

    @Autowired
    private JWTService jwtService;

    final String[] allowedPaths = {
        "/user/login",
        "/user/signup",
        "/user/otp/request",
        "/socket",
    };

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        if (!req.getMethod().equals("OPTIONS") && !Arrays.asList(allowedPaths).stream().anyMatch(req.getRequestURI()::contains)) {
            if (req.getHeader(HttpHeaders.AUTHORIZATION) == null) {
                throw new UnauthorizedException("Unauthorized");
            }
            String header = req.getHeader(HttpHeaders.AUTHORIZATION);
            if (!header.startsWith("Bearer ")) {
                throw new UnauthorizedException("Unauthorized");
            }
            String token = header.substring(7);
            if (token.equals("null") || token.equals("undefined") || token.equals("")) {
                throw new UnauthorizedException("Unauthorized");
            }
            Claims claims = jwtService.extractAllClaims(token);
            req.setAttribute("uid", claims.get("uid"));
            req.setAttribute("role", claims.get("role"));
            req.setAttribute("phone", claims.get("phone"));
        }
        chain.doFilter(request, response);
    }
    
}
