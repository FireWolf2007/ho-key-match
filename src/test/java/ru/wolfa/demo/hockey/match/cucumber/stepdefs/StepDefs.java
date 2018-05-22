package ru.wolfa.demo.hockey.match.cucumber.stepdefs;

import ru.wolfa.demo.hockey.match.HockeyMatchApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = HockeyMatchApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
