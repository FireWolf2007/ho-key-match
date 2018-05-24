package ru.wolfa.demo.hockey.match.repository;

import ru.wolfa.demo.hockey.match.domain.Tournament;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tournament entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {

}
