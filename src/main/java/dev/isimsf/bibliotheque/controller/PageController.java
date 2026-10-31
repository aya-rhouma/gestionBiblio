
package dev.isimsf.bibliotheque.controller;

import dev.isimsf.bibliotheque.entity.Auteur;
import dev.isimsf.bibliotheque.entity.Livre;
import dev.isimsf.bibliotheque.repository.AuteurRepository;
import dev.isimsf.bibliotheque.repository.LivreRepository;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class PageController {

    private final AuteurRepository auteurRepository;
    private final LivreRepository livreRepository;

    public PageController(AuteurRepository auteurRepository,
                          LivreRepository livreRepository) {
        this.auteurRepository = auteurRepository;
        this.livreRepository = livreRepository;
    }

    @GetMapping("/")
    public String accueil(Model model) {
        model.addAttribute("nombreAuteurs", auteurRepository.count());
        model.addAttribute("nombreLivres", livreRepository.count());
        return "index";
    }

    // AFFICHER LES AUTEURS
    @GetMapping("/auteurs")
    public String afficherAuteurs(Model model) {
        model.addAttribute("auteurs", auteurRepository.findAll());
        return "auteurs";
    }

    // FORMULAIRE D'AJOUT D'AUTEUR
    @GetMapping("/auteurs/nouveau")
    public String formulaireAuteur(Model model) {
        model.addAttribute("auteur", new Auteur());
        model.addAttribute("formAction", "/auteurs");
        model.addAttribute("titreFormulaire", "Ajouter un auteur");
        return "form-auteur";
    }

    // ENREGISTRER UN AUTEUR
    @PostMapping("/auteurs")
    public String ajouterAuteur(@ModelAttribute Auteur auteur) {
        auteurRepository.save(auteur);
        return "redirect:/auteurs";
    }

    // FORMULAIRE DE MODIFICATION D'AUTEUR
    @GetMapping("/auteurs/{id}/modifier")
    public String formulaireModifierAuteur(
            @PathVariable Long id,
            Model model,
            RedirectAttributes redirectAttributes) {

        Auteur auteur = auteurRepository.findById(id).orElse(null);

        if (auteur == null) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Auteur introuvable.");
            return "redirect:/auteurs";
        }

        model.addAttribute("auteur", auteur);
        model.addAttribute("formAction", "/auteurs/" + id + "/modifier");
        model.addAttribute("titreFormulaire", "Modifier un auteur");
        return "form-auteur";
    }

    // ENREGISTRER LA MODIFICATION D'AUTEUR
    @PostMapping("/auteurs/{id}/modifier")
    public String modifierAuteur(
            @PathVariable Long id,
            @ModelAttribute Auteur donnees,
            RedirectAttributes redirectAttributes) {

        Auteur auteur = auteurRepository.findById(id).orElse(null);

        if (auteur == null) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Auteur introuvable.");
            return "redirect:/auteurs";
        }

        auteur.setNom(donnees.getNom());
        auteur.setPrenom(donnees.getPrenom());
        auteurRepository.save(auteur);

        redirectAttributes.addFlashAttribute(
                "succes", "Auteur modifié avec succès.");
        return "redirect:/auteurs";
    }

    // SUPPRIMER UN AUTEUR SANS LIVRES ASSOCIÉS
    @PostMapping("/auteurs/{id}/supprimer")
    public String supprimerAuteur(
            @PathVariable Long id,
            RedirectAttributes redirectAttributes) {

        Auteur auteur = auteurRepository.findById(id).orElse(null);

        if (auteur == null) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Auteur introuvable.");
            return "redirect:/auteurs";
        }

        if (livreRepository.existsByAuteurId(id)) {

            redirectAttributes.addFlashAttribute(
                    "erreur",
                    "Impossible de supprimer cet auteur. Supprimez d'abord ses livres."
            );

            redirectAttributes.addFlashAttribute(
                    "auteurSelectionne",
                    auteur
            );

            return "redirect:/auteurs";
        }

        auteurRepository.deleteById(id);

        redirectAttributes.addFlashAttribute(
                "succes",
                "Auteur supprimé avec succès."
        );

        return "redirect:/auteurs";

    }

    // AFFICHER LES LIVRES ET RECHERCHER PAR AUTEUR
    @GetMapping("/livres")
    public String afficherLivres(
            @RequestParam(required = false) Long auteurId,
            Model model) {

        if (auteurId != null) {
            model.addAttribute(
                    "livres", livreRepository.findByAuteurId(auteurId));
            model.addAttribute("auteurSelectionne", auteurId);
            auteurRepository.findById(auteurId).ifPresent(auteur ->
                    model.addAttribute("auteurFiltre", auteur));
        } else {
            model.addAttribute("livres", livreRepository.findAll());
        }

        model.addAttribute("auteurs", auteurRepository.findAll());
        return "livres";
    }

    // FORMULAIRE D'AJOUT DE LIVRE
    @GetMapping("/livres/nouveau")
    public String formulaireLivre(Model model) {
        model.addAttribute("livre", new Livre());
        model.addAttribute("auteurs", auteurRepository.findAll());
        model.addAttribute("formAction", "/livres");
        model.addAttribute("titreFormulaire", "Ajouter un livre");
        return "form-livre";
    }

    // ENREGISTRER UN LIVRE
    @PostMapping("/livres")
    public String ajouterLivre(
            @ModelAttribute Livre livre,
            @RequestParam("auteur.id") Long auteurId,
            RedirectAttributes redirectAttributes) {

        Auteur auteur = auteurRepository.findById(auteurId).orElse(null);

        if (auteur == null) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Veuillez sélectionner un auteur valide.");
            return "redirect:/livres/nouveau";
        }

        livre.setAuteur(auteur);
        livreRepository.save(livre);

        redirectAttributes.addFlashAttribute(
                "succes", "Livre ajouté avec succès.");
        return "redirect:/livres";
    }

    // FORMULAIRE DE MODIFICATION DE LIVRE
    @GetMapping("/livres/{id}/modifier")
    public String formulaireModifierLivre(
            @PathVariable Long id,
            Model model,
            RedirectAttributes redirectAttributes) {

        Livre livre = livreRepository.findById(id).orElse(null);

        if (livre == null) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Livre introuvable.");
            return "redirect:/livres";
        }

        model.addAttribute("livre", livre);
        model.addAttribute("auteurs", auteurRepository.findAll());
        model.addAttribute("formAction", "/livres/" + id + "/modifier");
        model.addAttribute("titreFormulaire", "Modifier un livre");
        return "form-livre";
    }

    // ENREGISTRER LA MODIFICATION DU LIVRE
    @PostMapping("/livres/{id}/modifier")
    public String modifierLivre(
            @PathVariable Long id,
            @ModelAttribute Livre donnees,
            @RequestParam("auteur.id") Long auteurId,
            RedirectAttributes redirectAttributes) {

        Livre livre = livreRepository.findById(id).orElse(null);
        Auteur auteur = auteurRepository.findById(auteurId).orElse(null);

        if (livre == null || auteur == null) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Livre ou auteur introuvable.");
            return "redirect:/livres";
        }

        livre.setTitre(donnees.getTitre());
        livre.setIsbn(donnees.getIsbn());
        livre.setAuteur(auteur);
        livreRepository.save(livre);

        redirectAttributes.addFlashAttribute(
                "succes", "Livre modifié avec succès.");
        return "redirect:/livres";
    }

    // SUPPRIMER UN LIVRE
    @PostMapping("/livres/{id}/supprimer")
    public String supprimerLivre(
            @PathVariable Long id,
            RedirectAttributes redirectAttributes) {

        if (!livreRepository.existsById(id)) {
            redirectAttributes.addFlashAttribute(
                    "erreur", "Livre introuvable.");
        } else {
            livreRepository.deleteById(id);
            redirectAttributes.addFlashAttribute(
                    "succes", "Livre supprimé avec succès.");
        }

        return "redirect:/livres";
    }
}
