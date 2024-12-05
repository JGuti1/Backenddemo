package com.example.Backenddemo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backenddemo.model.Usuario;
import com.example.Backenddemo.repository.IUsuarioRepository;

@Service
public class AuthService {

    @Autowired
    private IUsuarioRepository usuarioRepository;

    public Usuario authenticate(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null && usuario.getPassword().equals(password)) {
            return usuario;
        }
        return null;
    }
}
