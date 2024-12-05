package com.example.Backenddemo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backenddemo.model.Evento;
import com.example.Backenddemo.repository.IEventoRepository;

@Service
public class EventosService {

    @Autowired
    private IEventoRepository eventoRepository;

    public List<Evento> selectAllEvents() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> selectById(Long id) {
        return eventoRepository.findById(id);
    }

    public Evento save(Evento evento) {
        return eventoRepository.save(evento);
    }

    public void deleteById(Long id) {
        eventoRepository.deleteById(id);
    }

    public List<Evento> findUpcomingEvents() {
        LocalDate today = LocalDate.now();
        return eventoRepository.findByFechaGreaterThanEqual(today);
    }

    public List<Evento> findByUsuarioId(Long usuarioId) {
        return eventoRepository.findByUsuarioId(usuarioId);
    }
}
