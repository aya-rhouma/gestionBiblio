package dev.isimsf.bibliotheque.controller;

import dev.isimsf.bibliotheque.entity.Auteur;
import dev.isimsf.bibliotheque.repository.LivreRepository;
import dev.isimsf.bibliotheque.service.AuteurService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auteurs")
public class AuteurController {

    private final AuteurService auteurService;
    private final LivreRepository livreRepository;

    public AuteurController(AuteurService auteurService, LivreRepository livreRepository) {
        this.auteurService = auteurService;
        this.livreRepository = livreRepository;
    }

    @PostMapping
    public Auteur ajouterAuteur(@RequestBody Auteur auteur) {
        return auteurService.ajouterAuteur(auteur);
    }

    @GetMapping
    public List<Auteur> listerAuteurs() {
        return auteurService.listerAuteurs();
    }

    @GetMapping("/{id}")
    public Auteur chercherAuteur(@PathVariable Long id) {
        return auteurService.trouverAuteur(id);
    }

    @PutMapping("/{id}")
    public Auteur modifierAuteur(@PathVariable Long id, @RequestBody Auteur donnees) {
        Auteur auteur = auteurService.trouverAuteur(id);
        auteur.setNom(donnees.getNom());
        auteur.setPrenom(donnees.getPrenom());
        return auteurService.ajouterAuteur(auteur);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> supprimerAuteur(@PathVariable Long id) {
        Auteur auteur = auteurService.trouverAuteur(id);
        if (livreRepository.existsByAuteurId(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "message", "Impossible de supprimer cet auteur. Supprimez d'abord ses livres.",
                    "auteurId", id,
                    "auteurNom", auteur.getPrenom() + " " + auteur.getNom()
            ));
        }
        auteurService.supprimerAuteur(id);
        return ResponseEntity.noContent().build();
    }
}
