package ru.wolfa.demo.hockey.match.service.dto;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Game entity.
 */
public class GameDTO implements Serializable {

    private Long id;

    private ZonedDateTime time;

    @Min(value = 0)
    @Max(value = 1000)
    private Integer goalsTeam1;

    @Min(value = 0)
    @Max(value = 1000)
    private Integer goalsTeam2;

    @Min(value = 0)
    @Max(value = 3)
    private Integer result;

    private Long team1Id;

    private String team1Name;

    private Long team2Id;

    private String team2Name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getTime() {
        return time;
    }

    public void setTime(ZonedDateTime time) {
        this.time = time;
    }

    public Integer getGoalsTeam1() {
        return goalsTeam1;
    }

    public void setGoalsTeam1(Integer goalsTeam1) {
        this.goalsTeam1 = goalsTeam1;
    }

    public Integer getGoalsTeam2() {
        return goalsTeam2;
    }

    public void setGoalsTeam2(Integer goalsTeam2) {
        this.goalsTeam2 = goalsTeam2;
    }

    public Integer getResult() {
        return result;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public Long getTeam1Id() {
        return team1Id;
    }

    public void setTeam1Id(Long teamId) {
        this.team1Id = teamId;
    }

    public String getTeam1Name() {
        return team1Name;
    }

    public void setTeam1Name(String teamName) {
        this.team1Name = teamName;
    }

    public Long getTeam2Id() {
        return team2Id;
    }

    public void setTeam2Id(Long teamId) {
        this.team2Id = teamId;
    }

    public String getTeam2Name() {
        return team2Name;
    }

    public void setTeam2Name(String teamName) {
        this.team2Name = teamName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GameDTO gameDTO = (GameDTO) o;
        if (gameDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gameDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GameDTO{" +
            "id=" + getId() +
            ", time='" + getTime() + "'" +
            ", goalsTeam1=" + getGoalsTeam1() +
            ", goalsTeam2=" + getGoalsTeam2() +
            ", result=" + getResult() +
            ", team1=" + getTeam1Id() +
            ", team1='" + getTeam1Name() + "'" +
            ", team2=" + getTeam2Id() +
            ", team2='" + getTeam2Name() + "'" +
            "}";
    }
}
