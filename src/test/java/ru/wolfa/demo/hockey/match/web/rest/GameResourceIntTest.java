package ru.wolfa.demo.hockey.match.web.rest;

import ru.wolfa.demo.hockey.match.HockeyMatchApp;

import ru.wolfa.demo.hockey.match.domain.Game;
import ru.wolfa.demo.hockey.match.domain.Team;
import ru.wolfa.demo.hockey.match.domain.Team;
import ru.wolfa.demo.hockey.match.repository.GameRepository;
import ru.wolfa.demo.hockey.match.service.GameService;
import ru.wolfa.demo.hockey.match.service.dto.GameDTO;
import ru.wolfa.demo.hockey.match.service.mapper.GameMapper;
import ru.wolfa.demo.hockey.match.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;
import java.util.ArrayList;

import static ru.wolfa.demo.hockey.match.web.rest.TestUtil.sameInstant;
import static ru.wolfa.demo.hockey.match.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GameResource REST controller.
 *
 * @see GameResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HockeyMatchApp.class)
public class GameResourceIntTest {

    private static final ZonedDateTime DEFAULT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_GOALS_TEAM_1 = 0;
    private static final Integer UPDATED_GOALS_TEAM_1 = 1;

    private static final Integer DEFAULT_GOALS_TEAM_2 = 0;
    private static final Integer UPDATED_GOALS_TEAM_2 = 1;

    private static final Integer DEFAULT_RESULT_TEAM_1 = 0;
    private static final Integer UPDATED_RESULT_TEAM_1 = 1;

    private static final Integer DEFAULT_RESULT_TEAM_2 = 0;
    private static final Integer UPDATED_RESULT_TEAM_2 = 1;

    @Autowired
    private GameRepository gameRepository;


    @Autowired
    private GameMapper gameMapper;
    

    @Autowired
    private GameService gameService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGameMockMvc;

    private Game game;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GameResource gameResource = new GameResource(gameService);
        this.restGameMockMvc = MockMvcBuilders.standaloneSetup(gameResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Game createEntity(EntityManager em) {
        Game game = new Game()
            .time(DEFAULT_TIME)
            .goalsTeam1(DEFAULT_GOALS_TEAM_1)
            .goalsTeam2(DEFAULT_GOALS_TEAM_2)
            .resultTeam1(DEFAULT_RESULT_TEAM_1)
            .resultTeam2(DEFAULT_RESULT_TEAM_2);
        // Add required entity
        Team team1 = TeamResourceIntTest.createEntity(em);
        em.persist(team1);
        em.flush();
        game.setTeam1(team1);
        // Add required entity
        Team team2 = TeamResourceIntTest.createEntity(em);
        em.persist(team2);
        em.flush();
        game.setTeam2(team2);
        return game;
    }

    @Before
    public void initTest() {
        game = createEntity(em);
    }

    @Test
    @Transactional
    public void createGame() throws Exception {
        int databaseSizeBeforeCreate = gameRepository.findAll().size();

        // Create the Game
        GameDTO gameDTO = gameMapper.toDto(game);
        restGameMockMvc.perform(post("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameDTO)))
            .andExpect(status().isCreated());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeCreate + 1);
        Game testGame = gameList.get(gameList.size() - 1);
        assertThat(testGame.getTime()).isEqualTo(DEFAULT_TIME);
        assertThat(testGame.getGoalsTeam1()).isEqualTo(DEFAULT_GOALS_TEAM_1);
        assertThat(testGame.getGoalsTeam2()).isEqualTo(DEFAULT_GOALS_TEAM_2);
        assertThat(testGame.getResultTeam1()).isEqualTo(DEFAULT_RESULT_TEAM_1);
        assertThat(testGame.getResultTeam2()).isEqualTo(DEFAULT_RESULT_TEAM_2);
    }

    @Test
    @Transactional
    public void createGameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gameRepository.findAll().size();

        // Create the Game with an existing ID
        game.setId(1L);
        GameDTO gameDTO = gameMapper.toDto(game);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGameMockMvc.perform(post("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGames() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        // Get all the gameList
        restGameMockMvc.perform(get("/api/games?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(game.getId().intValue())))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))))
            .andExpect(jsonPath("$.[*].goalsTeam1").value(hasItem(DEFAULT_GOALS_TEAM_1)))
            .andExpect(jsonPath("$.[*].goalsTeam2").value(hasItem(DEFAULT_GOALS_TEAM_2)))
            .andExpect(jsonPath("$.[*].resultTeam1").value(hasItem(DEFAULT_RESULT_TEAM_1)))
            .andExpect(jsonPath("$.[*].resultTeam2").value(hasItem(DEFAULT_RESULT_TEAM_2)));
    }
    

    @Test
    @Transactional
    public void getGame() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        // Get the game
        restGameMockMvc.perform(get("/api/games/{id}", game.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(game.getId().intValue()))
            .andExpect(jsonPath("$.time").value(sameInstant(DEFAULT_TIME)))
            .andExpect(jsonPath("$.goalsTeam1").value(DEFAULT_GOALS_TEAM_1))
            .andExpect(jsonPath("$.goalsTeam2").value(DEFAULT_GOALS_TEAM_2))
            .andExpect(jsonPath("$.resultTeam1").value(DEFAULT_RESULT_TEAM_1))
            .andExpect(jsonPath("$.resultTeam2").value(DEFAULT_RESULT_TEAM_2));
    }
    @Test
    @Transactional
    public void getNonExistingGame() throws Exception {
        // Get the game
        restGameMockMvc.perform(get("/api/games/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGame() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        int databaseSizeBeforeUpdate = gameRepository.findAll().size();

        // Update the game
        Game updatedGame = gameRepository.findById(game.getId()).get();
        // Disconnect from session so that the updates on updatedGame are not directly saved in db
        em.detach(updatedGame);
        updatedGame
            .time(UPDATED_TIME)
            .goalsTeam1(UPDATED_GOALS_TEAM_1)
            .goalsTeam2(UPDATED_GOALS_TEAM_2)
            .resultTeam1(UPDATED_RESULT_TEAM_1)
            .resultTeam2(UPDATED_RESULT_TEAM_2);
        GameDTO gameDTO = gameMapper.toDto(updatedGame);

        restGameMockMvc.perform(put("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameDTO)))
            .andExpect(status().isOk());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeUpdate);
        Game testGame = gameList.get(gameList.size() - 1);
        assertThat(testGame.getTime()).isEqualTo(UPDATED_TIME);
        assertThat(testGame.getGoalsTeam1()).isEqualTo(UPDATED_GOALS_TEAM_1);
        assertThat(testGame.getGoalsTeam2()).isEqualTo(UPDATED_GOALS_TEAM_2);
        assertThat(testGame.getResultTeam1()).isEqualTo(UPDATED_RESULT_TEAM_1);
        assertThat(testGame.getResultTeam2()).isEqualTo(UPDATED_RESULT_TEAM_2);
    }

    @Test
    @Transactional
    public void updateNonExistingGame() throws Exception {
        int databaseSizeBeforeUpdate = gameRepository.findAll().size();

        // Create the Game
        GameDTO gameDTO = gameMapper.toDto(game);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGameMockMvc.perform(put("/api/games")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gameDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Game in the database
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGame() throws Exception {
        // Initialize the database
        gameRepository.saveAndFlush(game);

        int databaseSizeBeforeDelete = gameRepository.findAll().size();

        // Get the game
        restGameMockMvc.perform(delete("/api/games/{id}", game.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Game> gameList = gameRepository.findAll();
        assertThat(gameList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Game.class);
        Game game1 = new Game();
        game1.setId(1L);
        Game game2 = new Game();
        game2.setId(game1.getId());
        assertThat(game1).isEqualTo(game2);
        game2.setId(2L);
        assertThat(game1).isNotEqualTo(game2);
        game1.setId(null);
        assertThat(game1).isNotEqualTo(game2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GameDTO.class);
        GameDTO gameDTO1 = new GameDTO();
        gameDTO1.setId(1L);
        GameDTO gameDTO2 = new GameDTO();
        assertThat(gameDTO1).isNotEqualTo(gameDTO2);
        gameDTO2.setId(gameDTO1.getId());
        assertThat(gameDTO1).isEqualTo(gameDTO2);
        gameDTO2.setId(2L);
        assertThat(gameDTO1).isNotEqualTo(gameDTO2);
        gameDTO1.setId(null);
        assertThat(gameDTO1).isNotEqualTo(gameDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gameMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gameMapper.fromId(null)).isNull();
    }
}
