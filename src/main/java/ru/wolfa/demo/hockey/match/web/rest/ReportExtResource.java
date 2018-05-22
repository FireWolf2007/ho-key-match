package ru.wolfa.demo.hockey.match.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.codahale.metrics.annotation.Timed;

import ru.wolfa.demo.hockey.match.service.TournamentExtService;
import ru.wolfa.demo.hockey.match.service.dto.TournamentWithTeamDTO;
import ru.wolfa.demo.hockey.match.web.rest.util.PaginationUtil;

@Controller
@RequestMapping(value="/api")
public class ReportExtResource {

    /**
     * GET  /teams : get all the teams.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of teams in body
     */
    @GetMapping("/reports/tournaments")
    @Timed
    public ResponseEntity<List<TournamentWithTeamDTO>> getAllTournamentsWithBestTeam(Pageable pageable) {
        log.debug("REST request to get a page of Teams");
        Page<TournamentWithTeamDTO> page = tournamentExtService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/reports/tournaments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private final Logger log = LoggerFactory.getLogger(TeamResource.class);

    private TournamentExtService tournamentExtService;
}
