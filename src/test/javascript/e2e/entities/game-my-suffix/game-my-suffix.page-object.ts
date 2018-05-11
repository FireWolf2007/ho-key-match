import { element, by } from 'protractor';

export class GameComponentsPage {
    createButton = element(by.css('#jh-create-entity'));
    title = element.all(by.css('jhi-game-my-suffix div h2#page-heading span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class GameUpdatePage {
    PageTitle = element(by.css('h2#jhi-game-my-suffix-heading'));
    saveButton = element(by.css('#save-entity'));
    cancelButton = element(by.css('#cancel-save'));
    timeInput = element(by.css('input#field_time'));
    goalsTeam1Input = element(by.css('input#field_goalsTeam1'));
    goalsTeam2Input = element(by.css('input#field_goalsTeam2'));
    resultInput = element(by.css('input#field_result'));
    team1Select = element(by.css('select#field_team1'));
    team2Select = element(by.css('select#field_team2'));

    getPageTitle() {
        return this.PageTitle.getAttribute('jhiTranslate');
    }

    setTimeInput(time) {
        this.timeInput.sendKeys(time);
    }

    getTimeInput() {
        return this.timeInput.getAttribute('value');
    }

    setGoalsTeam1Input(goalsTeam1) {
        this.goalsTeam1Input.sendKeys(goalsTeam1);
    }

    getGoalsTeam1Input() {
        return this.goalsTeam1Input.getAttribute('value');
    }

    setGoalsTeam2Input(goalsTeam2) {
        this.goalsTeam2Input.sendKeys(goalsTeam2);
    }

    getGoalsTeam2Input() {
        return this.goalsTeam2Input.getAttribute('value');
    }

    setResultInput(result) {
        this.resultInput.sendKeys(result);
    }

    getResultInput() {
        return this.resultInput.getAttribute('value');
    }

    team1SelectLastOption() {
        this.team1Select
            .all(by.tagName('option'))
            .last()
            .click();
    }

    team1SelectOption(option) {
        this.team1Select.sendKeys(option);
    }

    getTeam1Select() {
        return this.team1Select;
    }

    getTeam1SelectedOption() {
        return this.team1Select.element(by.css('option:checked')).getText();
    }

    team2SelectLastOption() {
        this.team2Select
            .all(by.tagName('option'))
            .last()
            .click();
    }

    team2SelectOption(option) {
        this.team2Select.sendKeys(option);
    }

    getTeam2Select() {
        return this.team2Select;
    }

    getTeam2SelectedOption() {
        return this.team2Select.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    cancel() {
        this.cancelButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
