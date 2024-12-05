package com.example.Backenddemo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Backenddemo.model.Evento;

@Repository
public interface IEventoRepository extends JpaRepository<Evento, Long> {
    List<Evento> findByUsuarioId(Long usuarioId);
    List<Evento> findByFechaGreaterThanEqual(LocalDate fecha);
}
