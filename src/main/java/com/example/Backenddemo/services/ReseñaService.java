package com.example.Backenddemo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backenddemo.model.Reseña;
import com.example.Backenddemo.repository.ReseñaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReseñaService {

    @Autowired
    private ReseñaRepository reseñaRepository;

    public List<Reseña> findAll() {
        return reseñaRepository.findAll();
    }

    public Optional<Reseña> findById(Long id) {
        return reseñaRepository.findById(id);
    }

    public Reseña save(Reseña reseña) {
        return reseñaRepository.save(reseña);
    }

    public void deleteById(Long id) {
        reseñaRepository.deleteById(id);
    }
}
