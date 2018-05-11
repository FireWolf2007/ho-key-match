package ru.wolfa.demo.hockey.match.domain;

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
    @Column(name = "result")
    private Integer result;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Team team1;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
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

    public Integer getResult() {
        return result;
    }

    public Game result(Integer result) {
        this.result = result;
        return this;
    }

    public void setResult(Integer result) {
        this.result = result;
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
            ", result=" + getResult() +
            "}";
    }
}
