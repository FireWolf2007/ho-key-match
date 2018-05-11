package ru.wolfa.demo.hockey.match.service.impl;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.wolfa.demo.hockey.match.repository.GameRepository;
import ru.wolfa.demo.hockey.match.service.dto.GameDTO;
import ru.wolfa.demo.hockey.match.service.mapper.GameMapper;
import ru.wolfa.demo.hockey.match.web.rest.errors.BadRequestAlertException;

@Service
@Transactional
@Primary
public class GameServiceExtImpl extends GameServiceImpl {

    public GameServiceExtImpl(GameRepository gameRepository, GameMapper gameMapper) {
        super(gameRepository, gameMapper);
    }

    /**
     * Save a game.
     *
     * @param gameDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GameDTO save(GameDTO gameDTO) {
        if (gameDTO.getTeam1Id().equals(gameDTO.getTeam2Id())) {
            throw new BadRequestAlertException("team1 and team2 must be different commands","GameDTO", "game.teams.must.differ");
        }
        return super.save(gameDTO);
    }

}
