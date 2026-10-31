package dev.isimsf.bibliotheque.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Livre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    private String isbn;
    @ManyToOne
    @JoinColumn(name = "auteur_id", nullable = false)
    private Auteur auteur;
    public Livre() {
    }
    public Livre(String titre, String isbn, Auteur auteur) {
        this.titre = titre;
        this.isbn = isbn;
        this.auteur = auteur;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitre() {
        return titre;
    }
    public void setTitre(String titre) {
        this.titre = titre;
    }
    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public Auteur getAuteur() {
        return auteur;
    }
    public void setAuteur(Auteur auteur) {
        this.auteur = auteur;
    }
}