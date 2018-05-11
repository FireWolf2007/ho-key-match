package ru.wolfa.demo.hockey.match.repository;

import ru.wolfa.demo.hockey.match.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
