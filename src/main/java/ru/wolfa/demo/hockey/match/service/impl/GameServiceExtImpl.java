package ru.wolfa.demo.hockey.match.service.impl;

import java.util.Optional;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.wolfa.demo.hockey.match.repository.GameRepository;
import ru.wolfa.demo.hockey.match.security.AuthoritiesConstants;
import ru.wolfa.demo.hockey.match.security.SecurityUtils;
import ru.wolfa.demo.hockey.match.service.dto.GameDTO;
import ru.wolfa.demo.hockey.match.service.mapper.GameMapper;
import ru.wolfa.demo.hockey.match.web.rest.errors.BadRequestAlertException;

@Service
@Transactional
@Primary
public class GameServiceExtImpl extends GameServiceImpl {

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
        if (gameDTO.getId() != null) {
            Optional<GameDTO> opt = findOne(gameDTO.getId());
            if (opt.isPresent()) {
                GameDTO dto = opt.get();
                if (
                        (!dto.getTeam1Id().equals(gameDTO.getTeam1Id())
                        || !dto.getTeam2Id().equals(gameDTO.getTeam2Id()))
                        && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)
                        ) {
                    throw new BadRequestAlertException("Change team in game allowed only for admin","GameDTO", "game.teams.change.by.user.forbidden");
                }
            }
        }
        return super.save(gameDTO);
    }

    public GameServiceExtImpl(GameRepository gameRepository, GameMapper gameMapper) {
        super(gameRepository, gameMapper);
    }

}
