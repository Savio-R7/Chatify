package com.savior.chatio.application_service.advices;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import io.jsonwebtoken.MalformedJwtException;
import com.savior.chatio.application_service.exceptions.AlreadyExistsException;
import com.savior.chatio.application_service.exceptions.InternalTamperingException;
import com.savior.chatio.application_service.exceptions.InvalidCredentialsException;
import com.savior.chatio.application_service.exceptions.NotFoundException;
import com.savior.chatio.application_service.responses.ErrorResponse;

@ControllerAdvice
public class CommonControllerAdvice {
     
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(Exception e) {
        return ResponseEntity.status(404).body(ErrorResponse.builder()
            .status(404)
            .error("Not Found")
            .message(e.getMessage())
            .build());
    }
        
    @ExceptionHandler(InternalTamperingException.class)
    public ResponseEntity<ErrorResponse> handleInternalTamperingException(Exception e) {
        return ResponseEntity.status(500).body(ErrorResponse.builder()
            .status(500)
            .error("Internal Server Error")
            .message(e.getMessage())
            .build());
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleAlreadyExistsException(Exception e) {
        return ResponseEntity.status(409).body(ErrorResponse.builder()
            .status(409)
            .error("Conflict")
            .message(e.getMessage())
            .build());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(Exception e) {
        return ResponseEntity.status(401).body(ErrorResponse.builder()
            .status(401)
            .error("Unauthorized")
            .message(e.getMessage())
            .build());
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<ErrorResponse> handleMalformedJwtException(Exception e) {
        return ResponseEntity.status(401).body(ErrorResponse.builder()
            .status(401)
            .error("Unauthorized")
            .message(e.getMessage())
            .build());
    }

}
