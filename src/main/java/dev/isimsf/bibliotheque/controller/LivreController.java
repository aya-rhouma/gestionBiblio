
package dev.isimsf.bibliotheque.controller;

import dev.isimsf.bibliotheque.entity.Livre;
import dev.isimsf.bibliotheque.service.LivreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/livres")
public class LivreController {

    private final LivreService livreService;

    public LivreController(LivreService livreService) {
        this.livreService = livreService;
    }

    @PostMapping
    public Livre ajouterLivre(@RequestBody Livre livre) {
        return livreService.ajouterLivre(livre);
    }

    @GetMapping
    public List<Livre> listerLivres() {
        return livreService.listerLivres();
    }

    @GetMapping("/{id}")
    public Livre chercherLivreParId(@PathVariable Long id) {
        return livreService.chercherLivreParId(id);
    }

    @GetMapping("/auteur/{idAuteur}")
    public List<Livre> rechercherParAuteur(
            @PathVariable Long idAuteur) {
        return livreService.rechercherParAuteur(idAuteur);
    }

    @PutMapping("/{id}")
    public Livre modifierLivre(
            @PathVariable Long id,
            @RequestBody Livre livre) {
        return livreService.modifierLivre(id, livre);
    }

    @DeleteMapping("/{id}")
    public void supprimerLivre(@PathVariable Long id) {
        livreService.supprimerLivre(id);
    }
}
