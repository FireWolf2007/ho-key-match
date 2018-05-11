import { browser, protractor } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { GameComponentsPage, GameUpdatePage } from './game.page-object';

describe('Game e2e test', () => {
    let navBarPage: NavBarPage;
    let gameUpdatePage: GameUpdatePage;
    let gameComponentsPage: GameComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Games', () => {
        navBarPage.goToEntity('game');
        gameComponentsPage = new GameComponentsPage();
        expect(gameComponentsPage.getTitle()).toMatch(/hockeyMatchApp.game.home.title/);
    });

    it('should load create Game page', () => {
        gameComponentsPage.clickOnCreateButton();
        gameUpdatePage = new GameUpdatePage();
        expect(gameUpdatePage.getPageTitle()).toMatch(/hockeyMatchApp.game.home.createOrEditLabel/);
        gameUpdatePage.cancel();
    });

    /* it('should create and save Games', () => {
        gameComponentsPage.clickOnCreateButton();
        gameUpdatePage.setTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(gameUpdatePage.getTimeInput()).toContain('2001-01-01T02:30');
        gameUpdatePage.setGoalsTeam1Input('5');
        expect(gameUpdatePage.getGoalsTeam1Input()).toMatch('5');
        gameUpdatePage.setGoalsTeam2Input('5');
        expect(gameUpdatePage.getGoalsTeam2Input()).toMatch('5');
        gameUpdatePage.setResultTeam1Input('5');
        expect(gameUpdatePage.getResultTeam1Input()).toMatch('5');
        gameUpdatePage.setResultTeam2Input('5');
        expect(gameUpdatePage.getResultTeam2Input()).toMatch('5');
        gameUpdatePage.tournamentSelectLastOption();
        gameUpdatePage.team1SelectLastOption();
        gameUpdatePage.team2SelectLastOption();
        gameUpdatePage.save();
        expect(gameUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
