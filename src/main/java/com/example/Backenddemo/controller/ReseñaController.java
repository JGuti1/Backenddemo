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
import org.springframework.web.bind.annotation.RestController;

import com.example.Backenddemo.model.Reseña;
import com.example.Backenddemo.services.ReseñaService;

@RestController
@RequestMapping("/api/reseñas")
public class ReseñaController {

    @Autowired
    private ReseñaService reseñaService;

    @GetMapping
    public List<Reseña> listarReseñas() {
        return reseñaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reseña> obtenerReseñaPorId(@PathVariable Long id) {
        Optional<Reseña> reseña = reseñaService.findById(id);
        return reseña.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reseña crearReseña(@RequestBody Reseña reseña) {
        return reseñaService.save(reseña);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reseña> actualizarReseña(@PathVariable Long id, @RequestBody Reseña reseñaDetails) {
        Optional<Reseña> reseña = reseñaService.findById(id);
        if (reseña.isPresent()) {
            Reseña updatedReseña = reseña.get();
            updatedReseña.setCalificacion(reseñaDetails.getCalificacion());
            updatedReseña.setComentario(reseñaDetails.getComentario());
            return ResponseEntity.ok(reseñaService.save(updatedReseña));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarReseña(@PathVariable Long id) {
        reseñaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
