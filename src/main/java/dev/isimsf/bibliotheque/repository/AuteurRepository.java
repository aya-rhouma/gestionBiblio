package dev.isimsf.bibliotheque.repository;

import dev.isimsf.bibliotheque.entity.Auteur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuteurRepository extends JpaRepository<Auteur, Long> {
}