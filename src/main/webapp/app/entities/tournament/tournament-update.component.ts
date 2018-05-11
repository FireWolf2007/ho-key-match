import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ITournament } from 'app/shared/model/tournament.model';
import { TournamentService } from './tournament.service';

@Component({
    selector: 'jhi-tournament-update',
    templateUrl: './tournament-update.component.html'
})
export class TournamentUpdateComponent implements OnInit {
    private _tournament: ITournament;
    isSaving: boolean;

    constructor(private tournamentService: TournamentService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ tournament }) => {
            this.tournament = tournament.body ? tournament.body : tournament;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tournament.id !== undefined) {
            this.subscribeToSaveResponse(this.tournamentService.update(this.tournament));
        } else {
            this.subscribeToSaveResponse(this.tournamentService.create(this.tournament));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITournament>>) {
        result.subscribe((res: HttpResponse<ITournament>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get tournament() {
        return this._tournament;
    }

    set tournament(tournament: ITournament) {
        this._tournament = tournament;
    }
}
