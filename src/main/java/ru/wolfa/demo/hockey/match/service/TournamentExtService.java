package ru.wolfa.demo.hockey.match.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ru.wolfa.demo.hockey.match.service.dto.TournamentWithTeamDTO;

public interface TournamentExtService {

    Page<TournamentWithTeamDTO> findAll(Pageable pageable);

}
