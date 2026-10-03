package com.example.udawatta_stores_website.controller;

import com.example.udawatta_stores_website.model.Order;
import com.example.udawatta_stores_website.model.Product;

import com.example.udawatta_stores_website.repository.OrderRepository;
import com.example.udawatta_stores_website.repository.ProductRepository;

import com.example.udawatta_stores_website.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/orders")
public class OrderController {


    @Autowired
    private OrderRepository orderRepository;


    @Autowired
    private ProductRepository productRepository;


    @Autowired
    private JwtUtil jwtUtil;

        // Example:
    // Carrot (x2), Milk (x1)
    private static final Pattern ORDER_ITEM_PATTERN =
            Pattern.compile(
                    "(.+?)\\s*\\(x(\\d+)\\)(?:,\\s*|$)"
            );


    private static final Set<String> ALLOWED_STATUSES =
            Set.of(
                    "PENDING",
                    "SHIPPED",
                    "DELIVERED"
            );


    // =========================================================
    // PLACE ORDER
    // =========================================================

    @PostMapping
    @Transactional
    public ResponseEntity<?> placeOrder(
            @RequestBody Order order,
            @RequestHeader("Authorization")
            String authorizationHeader
    ) {
