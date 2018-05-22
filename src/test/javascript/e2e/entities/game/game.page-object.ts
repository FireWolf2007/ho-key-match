import { element, by, promise, ElementFinder } from 'protractor';

export class GameComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-game div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GameUpdatePage {
    pageTitle = element(by.id('jhi-game-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    timeInput = element(by.id('field_time'));
    goalsTeam1Input = element(by.id('field_goalsTeam1'));
    goalsTeam2Input = element(by.id('field_goalsTeam2'));
    resultTeam1Input = element(by.id('field_resultTeam1'));
    resultTeam2Input = element(by.id('field_resultTeam2'));
    tournamentSelect = element(by.id('field_tournament'));
    team1Select = element(by.id('field_team1'));
    team2Select = element(by.id('field_team2'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setTimeInput(time): promise.Promise<void> {
        return this.timeInput.sendKeys(time);
    }

    getTimeInput() {
        return this.timeInput.getAttribute('value');
    }

    setGoalsTeam1Input(goalsTeam1): promise.Promise<void> {
        return this.goalsTeam1Input.sendKeys(goalsTeam1);
    }

    getGoalsTeam1Input() {
        return this.goalsTeam1Input.getAttribute('value');
    }

    setGoalsTeam2Input(goalsTeam2): promise.Promise<void> {
        return this.goalsTeam2Input.sendKeys(goalsTeam2);
    }

    getGoalsTeam2Input() {
        return this.goalsTeam2Input.getAttribute('value');
    }

    setResultTeam1Input(resultTeam1): promise.Promise<void> {
        return this.resultTeam1Input.sendKeys(resultTeam1);
    }

    getResultTeam1Input() {
        return this.resultTeam1Input.getAttribute('value');
    }

    setResultTeam2Input(resultTeam2): promise.Promise<void> {
        return this.resultTeam2Input.sendKeys(resultTeam2);
    }

    getResultTeam2Input() {
        return this.resultTeam2Input.getAttribute('value');
    }

    tournamentSelectLastOption(): promise.Promise<void> {
        return this.tournamentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    tournamentSelectOption(option): promise.Promise<void> {
        return this.tournamentSelect.sendKeys(option);
    }

    getTournamentSelect(): ElementFinder {
        return this.tournamentSelect;
    }

    getTournamentSelectedOption() {
        return this.tournamentSelect.element(by.css('option:checked')).getText();
    }

    team1SelectLastOption(): promise.Promise<void> {
        return this.team1Select
            .all(by.tagName('option'))
            .last()
            .click();
    }

    team1SelectOption(option): promise.Promise<void> {
        return this.team1Select.sendKeys(option);
    }

    getTeam1Select(): ElementFinder {
        return this.team1Select;
    }

    getTeam1SelectedOption() {
        return this.team1Select.element(by.css('option:checked')).getText();
    }

    team2SelectLastOption(): promise.Promise<void> {
        return this.team2Select
            .all(by.tagName('option'))
            .last()
            .click();
    }

    team2SelectOption(option): promise.Promise<void> {
        return this.team2Select.sendKeys(option);
    }

    getTeam2Select(): ElementFinder {
        return this.team2Select;
    }

    getTeam2SelectedOption() {
        return this.team2Select.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
