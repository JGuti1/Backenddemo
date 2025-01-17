package com.example.Backenddemo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backenddemo.model.Comentario;
import com.example.Backenddemo.repository.ComentarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Comentario> findAll() {
        return comentarioRepository.findAll();
    }

    public Optional<Comentario> findById(Long id) {
        return comentarioRepository.findById(id);
    }

    public Comentario save(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    public void deleteById(Long id) {
        comentarioRepository.deleteById(id);
    }
}
