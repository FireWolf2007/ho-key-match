import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IGameMySuffix } from 'app/shared/model/game-my-suffix.model';
import { GameMySuffixService } from './game-my-suffix.service';
import { ITeamMySuffix } from 'app/shared/model/team-my-suffix.model';
import { TeamMySuffixService } from 'app/entities/team-my-suffix';

@Component({
    selector: 'jhi-game-my-suffix-update',
    templateUrl: './game-my-suffix-update.component.html'
})
export class GameMySuffixUpdateComponent implements OnInit {
    private _game: IGameMySuffix;
    isSaving: boolean;

    teams: ITeamMySuffix[];
    time: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private gameService: GameMySuffixService,
        private teamService: TeamMySuffixService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ game }) => {
            this.game = game.body ? game.body : game;
        });
        this.teamService.query().subscribe(
            (res: HttpResponse<ITeamMySuffix[]>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<IGameMySuffix>>) {
        result.subscribe((res: HttpResponse<IGameMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTeamById(index: number, item: ITeamMySuffix) {
        return item.id;
    }
    get game() {
        return this._game;
    }

    set game(game: IGameMySuffix) {
        this._game = game;
        this.time = moment(game.time).format();
    }
}
