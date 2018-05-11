package ru.wolfa.demo.hockey.match.service;

import ru.wolfa.demo.hockey.match.service.dto.GameDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Game.
 */
public interface GameService {

    /**
     * Save a game.
     *
     * @param gameDTO the entity to save
     * @return the persisted entity
     */
    GameDTO save(GameDTO gameDTO);

    /**
     * Get all the games.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<GameDTO> findAll(Pageable pageable);


    /**
     * Get the "id" game.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<GameDTO> findOne(Long id);

    /**
     * Delete the "id" game.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
