package dev.isimsf.bibliotheque.service;

import dev.isimsf.bibliotheque.entity.Auteur;
import dev.isimsf.bibliotheque.repository.AuteurRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.List;

@Service
public class AuteurService {

    private final AuteurRepository auteurRepository;

    public AuteurService(AuteurRepository auteurRepository) {
        this.auteurRepository = auteurRepository;
    }

    public Auteur ajouterAuteur(Auteur auteur) {
        return auteurRepository.save(auteur);
    }

    public List<Auteur> listerAuteurs() {
        return auteurRepository.findAll();
    }

    public Auteur trouverAuteur(Long id) {
        return auteurRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Auteur introuvable : " + id));
    }

    public void supprimerAuteur(Long id) {
        auteurRepository.deleteById(id);
    }
}
