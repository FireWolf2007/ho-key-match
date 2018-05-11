package ru.wolfa.demo.hockey.match.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.wolfa.demo.hockey.match.service.TournamentService;
import ru.wolfa.demo.hockey.match.web.rest.errors.BadRequestAlertException;
import ru.wolfa.demo.hockey.match.web.rest.util.HeaderUtil;
import ru.wolfa.demo.hockey.match.web.rest.util.PaginationUtil;
import ru.wolfa.demo.hockey.match.service.dto.TournamentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tournament.
 */
@RestController
@RequestMapping("/api")
public class TournamentResource {

    private final Logger log = LoggerFactory.getLogger(TournamentResource.class);

    private static final String ENTITY_NAME = "tournament";

    private final TournamentService tournamentService;

    public TournamentResource(TournamentService tournamentService) {
        this.tournamentService = tournamentService;
    }

    /**
     * POST  /tournaments : Create a new tournament.
     *
     * @param tournamentDTO the tournamentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tournamentDTO, or with status 400 (Bad Request) if the tournament has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tournaments")
    @Timed
    public ResponseEntity<TournamentDTO> createTournament(@RequestBody TournamentDTO tournamentDTO) throws URISyntaxException {
        log.debug("REST request to save Tournament : {}", tournamentDTO);
        if (tournamentDTO.getId() != null) {
            throw new BadRequestAlertException("A new tournament cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        TournamentDTO result = tournamentService.save(tournamentDTO);
        return ResponseEntity.created(new URI("/api/tournaments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tournaments : Updates an existing tournament.
     *
     * @param tournamentDTO the tournamentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tournamentDTO,
     * or with status 400 (Bad Request) if the tournamentDTO is not valid,
     * or with status 500 (Internal Server Error) if the tournamentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tournaments")
    @Timed
    public ResponseEntity<TournamentDTO> updateTournament(@RequestBody TournamentDTO tournamentDTO) throws URISyntaxException {
        log.debug("REST request to update Tournament : {}", tournamentDTO);
        if (tournamentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        TournamentDTO result = tournamentService.save(tournamentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tournamentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tournaments : get all the tournaments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tournaments in body
     */
    @GetMapping("/tournaments")
    @Timed
    public ResponseEntity<List<TournamentDTO>> getAllTournaments(Pageable pageable) {
        log.debug("REST request to get a page of Tournaments");
        Page<TournamentDTO> page = tournamentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tournaments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tournaments/:id : get the "id" tournament.
     *
     * @param id the id of the tournamentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tournamentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tournaments/{id}")
    @Timed
    public ResponseEntity<TournamentDTO> getTournament(@PathVariable Long id) {
        log.debug("REST request to get Tournament : {}", id);
        Optional<TournamentDTO> tournamentDTO = tournamentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tournamentDTO);
    }

    /**
     * DELETE  /tournaments/:id : delete the "id" tournament.
     *
     * @param id the id of the tournamentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tournaments/{id}")
    @Timed
    public ResponseEntity<Void> deleteTournament(@PathVariable Long id) {
        log.debug("REST request to delete Tournament : {}", id);
        tournamentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
