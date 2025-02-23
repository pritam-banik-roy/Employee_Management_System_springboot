package com.developer.employee_management.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	 private final CustomUserDetailsService customUserDetailsService;
	    private final JwtRequestFilter jwtRequestFilter;

	    public SecurityConfig(CustomUserDetailsService customUserDetailsService, JwtRequestFilter jwtRequestFilter) {
	        this.customUserDetailsService = customUserDetailsService;
	        this.jwtRequestFilter = jwtRequestFilter;
	    }

	    @Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	        http
	        //.cors().and()
	            .csrf(csrf -> csrf.disable())  
	            .authorizeHttpRequests(auth -> auth
	                .requestMatchers("/employee/register","/employee/login","/authenticate","/s3/*").permitAll()
	                .anyRequest().authenticated()  
	            )
	            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) 
	            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); 

	        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
	        return http.build();
	    }

	    @Bean
	    public AuthenticationManager authenticationManager() {
	        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
	        authProvider.setUserDetailsService(customUserDetailsService);
	        authProvider.setPasswordEncoder(passwordEncoder());

	        return new ProviderManager(authProvider);
	    }

	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    
	    
	    
	    @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(Arrays.asList("*")); 
	        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); 
	        configuration.setAllowedHeaders(Arrays.asList("*")); 
	        

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration); 
	        return source;
	    }
	}