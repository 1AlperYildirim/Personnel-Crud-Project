package com.example.personnel.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendWelcomeEmail(String to, String fullName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("donotreplytam@gmail.com");
        message.setTo(to);
        message.setSubject("Welcome to the System!");
        message.setText("Hello " + fullName + ",\n\n" +
                "Welcome to the personnel management system! Your registration was successful.\n\n" +
                "Have a nice day.");
        mailSender.send(message);
    }

    public void sendUpdateEmail(String to, String fullName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("donotreplytam@gmail.com");
        message.setTo(to);
        message.setSubject("Your Personnel Information Has Changed");
        message.setText("Hello " + fullName + ",\n\n" +
                "One or more of your information has changed.\n" +
                "Please check your new information.\n\n" +
                "Have a nice day.");
        mailSender.send(message);
    }

    public void sendDeletionEmail(String to, String fullName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("donotreplytam@gmail.com");
        message.setTo(to);
        message.setSubject("You are Fired");
        message.setText("Hello " + fullName + ",\n\n" +
                "You are fired.\n" +
                "You do not have an access to the system anymore.\n\n" +
                "Have a nice day.");
        mailSender.send(message);
    }
}
