package com.example.Backenddemo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Backenddemo.model.Reseña;

@Repository
public interface ReseñaRepository extends JpaRepository<Reseña, Long> {
    List<Reseña> findByEventoId(Long eventoId);
}