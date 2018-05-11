package ru.wolfa.demo.hockey.match.service.mapper;

import ru.wolfa.demo.hockey.match.domain.*;
import ru.wolfa.demo.hockey.match.service.dto.TournamentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Tournament and its DTO TournamentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TournamentMapper extends EntityMapper<TournamentDTO, Tournament> {



    default Tournament fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tournament tournament = new Tournament();
        tournament.setId(id);
        return tournament;
    }
}
