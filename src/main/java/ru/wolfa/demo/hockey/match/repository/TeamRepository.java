package ru.wolfa.demo.hockey.match.repository;

import ru.wolfa.demo.hockey.match.domain.Team;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Team entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query("select team from Team team where team.user.login = ?#{principal.username}")
    List<Team> findByUserIsCurrentUser();

}
