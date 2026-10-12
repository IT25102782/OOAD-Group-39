package com.example.udawatta_stores_website.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
public class SecurityConfig {


    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    // =========================================================
    // SECURITY RULES
    // =========================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

                // =================================================
                // CSRF
                // =================================================
                .csrf(
                        csrf ->
                                csrf.disable()
                )


                // =================================================
                // CORS
                // =================================================
                .cors(
                        cors ->
                                cors.configurationSource(
                                        corsConfigurationSource()
                                )
                )


                // =================================================
                // JWT = STATELESS
                // =================================================
                .sessionManagement(
                        session ->
                                session.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS
                                )
                )


                // Disable default Spring login page
                .formLogin(
                        form ->
                                form.disable()
                )


                // Disable HTTP Basic authentication
                .httpBasic(
                        basic ->
                                basic.disable()
                )


                // =================================================
                // API SECURITY RULES
                // =================================================

                .authorizeHttpRequests(

                        auth -> auth


                                // =================================
                                // CORS PREFLIGHT
                                // =================================

                                .requestMatchers(
                                        HttpMethod.OPTIONS,
                                        "/**"
                                )
                                .permitAll()


                                // =================================
                                // AUTHENTICATION
                                // =================================

                                // Login and Registration are public
                                .requestMatchers(
                                        "/api/users/login",
                                        "/api/users/register"
                                )
                                .permitAll()


                                // =================================
                                // PRODUCTS
                                // =================================

                                // Admin product statistics
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products/stats"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // Anyone can browse products
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/products",
                                        "/api/products/*"
                                )
                                .permitAll()


                                // Only ADMIN can add products
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/products/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // Only ADMIN can update products
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/products/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // Only ADMIN can delete products
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/products/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // =================================
                                // REVIEWS
                                // =================================

                                /*
                                 * Anyone can read customer reviews.
                                 *
                                 * Used by:
                                 * - Home page review section
                                 * - Product details review section
                                 */
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/reviews",
                                        "/api/reviews/**"
                                )
                                .permitAll()


                                /*
                                 * Logged-in CUSTOMER or ADMIN
                                 * can submit a review.
                                 */
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/reviews"
                                )
                                .hasAnyRole(
                                        "CUSTOMER",
                                        "ADMIN"
                                )


                                /*
                                 * Only ADMIN can delete reviews.
                                 */
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/reviews/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // =================================
                                // ORDERS
                                // =================================

                                // Customer places an order
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/orders"
                                )
                                .hasAnyRole(
                                        "CUSTOMER",
                                        "ADMIN"
                                )


                                // Customer views only own orders
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/orders/my-orders"
                                )
                                .hasAnyRole(
                                        "CUSTOMER",
                                        "ADMIN"
                                )


                                // ADMIN views all orders
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/orders"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // ADMIN changes order status
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/orders/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // ADMIN deletes an order
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/orders/**"
                                )
                                .hasRole(
                                        "ADMIN"
                                )


                                // =================================
                                // PAYHERE
                                // =================================

                                // PayHere callback must be public
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/payments/notify"
                                )
                                .permitAll()


                                // Payment hash requires login
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/payments/hash/**"
                                )
                                .authenticated()


                                // =================================
                                // DEFAULT
                                // =================================

                                // Anything not listed above
                                // requires authentication
                                .anyRequest()
                                .authenticated()
                )


                // =================================================
                // JWT FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =========================================================
    // CORS CONFIGURATION
    // =========================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {


        CorsConfiguration configuration =
                new CorsConfiguration();


        // React / Vite frontend
        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:5173"
                )
        );


        // Allowed HTTP methods
        configuration.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );


        // Headers required by React + JWT
        configuration.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );


        configuration.setAllowCredentials(
                true
        );


        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}