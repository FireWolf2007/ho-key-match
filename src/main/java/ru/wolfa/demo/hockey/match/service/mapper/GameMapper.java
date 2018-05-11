package ru.wolfa.demo.hockey.match.service.mapper;

import ru.wolfa.demo.hockey.match.domain.*;
import ru.wolfa.demo.hockey.match.service.dto.GameDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Game and its DTO GameDTO.
 */
@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface GameMapper extends EntityMapper<GameDTO, Game> {

    @Mapping(source = "team1.id", target = "team1Id")
    @Mapping(source = "team1.name", target = "team1Name")
    @Mapping(source = "team2.id", target = "team2Id")
    @Mapping(source = "team2.name", target = "team2Name")
    GameDTO toDto(Game game);

    @Mapping(source = "team1Id", target = "team1")
    @Mapping(source = "team2Id", target = "team2")
    Game toEntity(GameDTO gameDTO);

    default Game fromId(Long id) {
        if (id == null) {
            return null;
        }
        Game game = new Game();
        game.setId(id);
        return game;
    }
}
