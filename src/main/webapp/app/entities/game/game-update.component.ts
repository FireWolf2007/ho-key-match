import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IGame } from 'app/shared/model/game.model';
import { GameService } from './game.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
    selector: 'jhi-game-update',
    templateUrl: './game-update.component.html'
})
export class GameUpdateComponent implements OnInit {
    private _game: IGame;
    isSaving: boolean;

    teams: ITeam[];
    time: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gameService: GameService,
        private teamService: TeamService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ game }) => {
            this.game = game.body ? game.body : game;
        });
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeam[]>) => {
                this.teams = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.game.time = moment(this.time, DATE_TIME_FORMAT);
        if (this.game.id !== undefined) {
            this.subscribeToSaveResponse(this.gameService.update(this.game));
        } else {
            this.subscribeToSaveResponse(this.gameService.create(this.game));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>) {
        result.subscribe((res: HttpResponse<IGame>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTeamById(index: number, item: ITeam) {
        return item.id;
    }
    get game() {
        return this._game;
    }

    set game(game: IGame) {
        this._game = game;
        this.time = moment(game.time).format();
    }
}
