import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { TournamentComponentsPage, TournamentUpdatePage } from './tournament.page-object';

describe('Tournament e2e test', () => {
    let navBarPage: NavBarPage;
    let tournamentUpdatePage: TournamentUpdatePage;
    let tournamentComponentsPage: TournamentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tournaments', () => {
        navBarPage.goToEntity('tournament');
        tournamentComponentsPage = new TournamentComponentsPage();
        expect(tournamentComponentsPage.getTitle()).toMatch(/hockeyMatchApp.tournament.home.title/);
    });

    it('should load create Tournament page', () => {
        tournamentComponentsPage.clickOnCreateButton();
        tournamentUpdatePage = new TournamentUpdatePage();
        expect(tournamentUpdatePage.getPageTitle()).toMatch(/hockeyMatchApp.tournament.home.createOrEditLabel/);
        tournamentUpdatePage.cancel();
    });

    it('should create and save Tournaments', () => {
        tournamentComponentsPage.clickOnCreateButton();
        tournamentUpdatePage.setNameInput('name');
        expect(tournamentUpdatePage.getNameInput()).toMatch('name');
        tournamentUpdatePage.save();
        expect(tournamentUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
