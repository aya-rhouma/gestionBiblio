
package dev.isimsf.bibliotheque.service;

import dev.isimsf.bibliotheque.entity.Auteur;
import dev.isimsf.bibliotheque.entity.Livre;
import dev.isimsf.bibliotheque.repository.AuteurRepository;
import dev.isimsf.bibliotheque.repository.LivreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivreService {

    private final LivreRepository livreRepository;
    private final AuteurRepository auteurRepository;

    public LivreService(
            LivreRepository livreRepository,
            AuteurRepository auteurRepository) {
        this.livreRepository = livreRepository;
        this.auteurRepository = auteurRepository;
    }

    public Livre ajouterLivre(Livre livre) {
        Long auteurId = livre.getAuteur().getId();

        Auteur auteur = auteurRepository.findById(auteurId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Auteur introuvable : " + auteurId));

        livre.setAuteur(auteur);
        return livreRepository.save(livre);
    }

    public List<Livre> listerLivres() {
        return livreRepository.findAll();
    }

    public Livre chercherLivreParId(Long id) {
        return livreRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Livre introuvable : " + id));
    }

    public List<Livre> rechercherParAuteur(Long auteurId) {
        if (!auteurRepository.existsById(auteurId)) {
            throw new RuntimeException(
                    "Auteur introuvable : " + auteurId);
        }

        return livreRepository.findByAuteurId(auteurId);
    }

    public void supprimerLivre(Long id) {
        if (!livreRepository.existsById(id)) {
            throw new RuntimeException(
                    "Livre introuvable : " + id);
        }

        livreRepository.deleteById(id);
    }

    public Livre modifierLivre(Long id, Livre donnees) {
        Livre livre = chercherLivreParId(id);

        Long auteurId = donnees.getAuteur().getId();

        Auteur auteur = auteurRepository.findById(auteurId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Auteur introuvable : " + auteurId));

        livre.setTitre(donnees.getTitre());
        livre.setIsbn(donnees.getIsbn());
        livre.setAuteur(auteur);

        return livreRepository.save(livre);
    }

    public Livre modifierTitre(Long id, String nouveauTitre) {
        Livre livre = chercherLivreParId(id);
        livre.setTitre(nouveauTitre);
        return livreRepository.save(livre);
    }
}
