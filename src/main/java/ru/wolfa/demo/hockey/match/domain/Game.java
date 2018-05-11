package ru.wolfa.demo.hockey.match.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_time")
    private ZonedDateTime time;

    @Min(value = 0)
    @Max(value = 1000)
    @Column(name = "goals_team_1")
    private Integer goalsTeam1;

    @Min(value = 0)
    @Max(value = 1000)
    @Column(name = "goals_team_2")
    private Integer goalsTeam2;

    @Min(value = 0)
    @Max(value = 3)
    @Column(name = "result_team_1")
    private Integer resultTeam1;

    @Min(value = 0)
    @Max(value = 3)
    @Column(name = "result_team_2")
    private Integer resultTeam2;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Team team1;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Team team2;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public Game time(ZonedDateTime time) {
        this.time = time;
        return this;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Integer getGoalsTeam1() {
        return goalsTeam1;
    }

    public Game goalsTeam1(Integer goalsTeam1) {
        this.goalsTeam1 = goalsTeam1;
        return this;
    }

    public void setGoalsTeam1(Integer goalsTeam1) {
        this.goalsTeam1 = goalsTeam1;
    }

    public Integer getGoalsTeam2() {
        return goalsTeam2;
    }

    public Game goalsTeam2(Integer goalsTeam2) {
        this.goalsTeam2 = goalsTeam2;
        return this;
    }

    public void setGoalsTeam2(Integer goalsTeam2) {
        this.goalsTeam2 = goalsTeam2;
    }

    public Integer getResultTeam1() {
        return resultTeam1;
    }

    public Game resultTeam1(Integer resultTeam1) {
        this.resultTeam1 = resultTeam1;
        return this;
    }

    public void setResultTeam1(Integer resultTeam1) {
        this.resultTeam1 = resultTeam1;
    }

    public Integer getResultTeam2() {
        return resultTeam2;
    }

    public Game resultTeam2(Integer resultTeam2) {
        this.resultTeam2 = resultTeam2;
        return this;
    }

    public void setResultTeam2(Integer resultTeam2) {
        this.resultTeam2 = resultTeam2;
    }

    public Team getTeam1() {
        return team1;
    }

    public Game team1(Team team) {
        this.team1 = team;
        return this;
    }

    public void setTeam1(Team team) {
        this.team1 = team;
    }

    public Team getTeam2() {
        return team2;
    }

    public Game team2(Team team) {
        this.team2 = team;
        return this;
    }

    public void setTeam2(Team team) {
        this.team2 = team;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Game game = (Game) o;
        if (game.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), game.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", goalsTeam1=" + getGoalsTeam1() +
            ", goalsTeam2=" + getGoalsTeam2() +
            ", resultTeam1=" + getResultTeam1() +
            ", resultTeam2=" + getResultTeam2() +
            "}";
    }
}
