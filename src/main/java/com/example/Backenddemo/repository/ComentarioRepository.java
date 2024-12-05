package com.example.Backenddemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Backenddemo.model.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
}
