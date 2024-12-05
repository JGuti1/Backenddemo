package com.example.Backenddemo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backenddemo.model.Evento;
import com.example.Backenddemo.services.EventosService;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventosService eventosService;

    @GetMapping
    public List<Evento> listarEventos(@RequestParam(required = false) Long usuarioId) {
        if (usuarioId != null) {
            return eventosService.findByUsuarioId(usuarioId);
        } else {
            return eventosService.findUpcomingEvents();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evento> obtenerEventoPorId(@PathVariable Long id) {
        Optional<Evento> evento = eventosService.selectById(id);
        return evento.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Evento> crearEvento(@RequestBody Evento evento) {
        try {
            Evento nuevoEvento = eventosService.save(evento);
            return ResponseEntity.status(201).body(nuevoEvento);
        } catch (Exception e) {
            e.printStackTrace(); // Imprime la excepción en los logs
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evento> actualizarEvento(@PathVariable Long id, @RequestBody Evento eventoDetails) {
        Optional<Evento> evento = eventosService.selectById(id);
        if (evento.isPresent()) {
            Evento updatedEvento = evento.get();
            updatedEvento.setNombre(eventoDetails.getNombre());
            updatedEvento.setLugar(eventoDetails.getLugar());
            updatedEvento.setFecha(eventoDetails.getFecha());
            updatedEvento.setDescripcion(eventoDetails.getDescripcion());
            return ResponseEntity.ok(eventosService.save(updatedEvento));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEvento(@PathVariable Long id) {
        try {
            eventosService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace(); // Imprime la excepción en los logs
            return ResponseEntity.status(500).build();
        }
    }
}
