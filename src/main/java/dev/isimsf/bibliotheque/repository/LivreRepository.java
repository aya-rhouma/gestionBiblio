package dev.isimsf.bibliotheque.repository;

import dev.isimsf.bibliotheque.entity.Livre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivreRepository extends JpaRepository<Livre, Long> {

    List<Livre> findByAuteurId(Long auteurId);
    boolean existsByAuteurId(Long auteurId);
}
