package ru.wolfa.demo.hockey.match.repository;

import ru.wolfa.demo.hockey.match.domain.Tournament;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Tournament entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

}
