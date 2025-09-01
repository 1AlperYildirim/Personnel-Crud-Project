package com.example.personnel.config;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {
    
    @Before("execution(* com.example.personnel.service.*.*(..))")
    public void logBeforeServiceMethods() {
        log.info("Service method called");
    }

    // service katmanındaki tüm metodlar
    @Before("execution(* com.example.personnel.service.*.*(..))")
    public void beforeService(JoinPoint jp) {
        log.info("SERVICE -> {} args={}", jp.getSignature().toShortString(), jp.getArgs());
    }

    @AfterReturning(pointcut = "execution(* com.example.personnel.service.*.*(..))", returning = "ret")
    public void afterService(JoinPoint jp, Object ret) {
        log.info("SERVICE OK <- {} return={}", jp.getSignature().toShortString(), ret);
    }

    // controller giriş/çıkış (isteğe bağlı, veri boyutu büyükse sadece endpoint adını logla)
    @Before("execution(* com.example.personnel.controller.*.*(..))")
    public void beforeController(JoinPoint jp) {
        log.info("HTTP -> {}", jp.getSignature().toShortString());
    }

    @AfterReturning("execution(* com.example.personnel.controller.*.*(..))")
    public void afterController(JoinPoint jp) {
        log.info("HTTP OK <- {}", jp.getSignature().toShortString());
    }
}
