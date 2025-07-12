package com.task.task.controllers;
import com.task.task.dto.LoginDtoRequest;
import com.task.task.dto.SignUpDtoRequest;
import com.task.task.dto.TokenDtoResponse;
import com.task.task.security.JwtUtil;
import com.task.task.services.Interfaces.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<TokenDtoResponse> signup(@Valid @RequestBody SignUpDtoRequest request) {
        userService.register(request.getUsername(), request.getPassword(), request.getPhone());

        UserDetails userDetails = userService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new TokenDtoResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDtoResponse> login(@RequestBody LoginDtoRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new TokenDtoResponse(token));
    }
}
