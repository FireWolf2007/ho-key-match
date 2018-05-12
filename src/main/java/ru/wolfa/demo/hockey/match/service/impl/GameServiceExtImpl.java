package ru.wolfa.demo.hockey.match.service.impl;

import java.util.Optional;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ru.wolfa.demo.hockey.match.config.Constants;
import ru.wolfa.demo.hockey.match.repository.GameRepository;
import ru.wolfa.demo.hockey.match.security.AuthoritiesConstants;
import ru.wolfa.demo.hockey.match.security.SecurityUtils;
import ru.wolfa.demo.hockey.match.service.TeamService;
import ru.wolfa.demo.hockey.match.service.dto.GameDTO;
import ru.wolfa.demo.hockey.match.service.dto.TeamDTO;
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
        // Rule 1
        if (gameDTO.getTeam1Id().equals(gameDTO.getTeam2Id())) {
            throw new BadRequestAlertException("team1 and team2 must be different commands","GameDTO", "game.teams.must.differ");
        }
        if (gameDTO.getId() != null) {
            Optional<GameDTO> opt = findOne(gameDTO.getId());
            if (opt.isPresent()) {
                // Rule 2
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
        // Rule 3
        if (!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            TeamDTO optTeamDTO = teamService.findOne(gameDTO.getTeam1Id()).get();
            if (!SecurityUtils.getCurrentUserLogin().orElse(Constants.ANONYMOUS_USER).equals(optTeamDTO.getUserLogin())) {
                optTeamDTO = teamService.findOne(gameDTO.getTeam2Id()).get();
                if (!SecurityUtils.getCurrentUserLogin().orElse(Constants.ANONYMOUS_USER).equals(optTeamDTO.getUserLogin())) {
                    throw new BadRequestAlertException("Create game allowed only for admin or user of the participating team","GameDTO", "game.create.by.not.participating.team.forbidden");
                }
            }
        }
        // Rule 4
        if (gameDTO.getGoalsTeam1() != null && gameDTO.getGoalsTeam2() != null
                && gameDTO.getResultTeam1() != null && gameDTO.getResultTeam2() != null) {
            int total = gameDTO.getResultTeam1().intValue() + gameDTO.getResultTeam2().intValue();
            if (total != 3) {
                throw new BadRequestAlertException("Result sum must be 3","GameDTO", "game.result.not.three");
            }
            if (gameDTO.getResultTeam1().intValue() > gameDTO.getResultTeam2().intValue()) {
                if (gameDTO.getGoalsTeam1().intValue() < gameDTO.getGoalsTeam2().intValue()) {
                    throw new BadRequestAlertException("Results incorrect: gaols by team1 > goals by team2","GameDTO", "game.goals.and.result.conflict");
                }
            } else {
                if (gameDTO.getGoalsTeam1().intValue() > gameDTO.getGoalsTeam2().intValue()) {
                    throw new BadRequestAlertException("Results incorrect: gaols by team1 < goals by team2","GameDTO", "game.goals.and.result.conflict");
                }
            }
        }
        return super.save(gameDTO);
    }

    public GameServiceExtImpl(GameRepository gameRepository, GameMapper gameMapper, TeamService teamService) {
        super(gameRepository, gameMapper);
        this.teamService = teamService;
    }

    private final TeamService teamService;
}
