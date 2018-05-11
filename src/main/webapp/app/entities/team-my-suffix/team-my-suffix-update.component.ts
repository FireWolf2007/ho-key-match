import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiAlertService } from 'ng-jhipster';

import { ITeamMySuffix } from 'app/shared/model/team-my-suffix.model';
import { TeamMySuffixService } from './team-my-suffix.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-team-my-suffix-update',
    templateUrl: './team-my-suffix-update.component.html'
})
export class TeamMySuffixUpdateComponent implements OnInit {
    private _team: ITeamMySuffix;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private teamService: TeamMySuffixService,
        private userService: UserService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ team }) => {
            this.team = team.body ? team.body : team;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.team.id !== undefined) {
            this.subscribeToSaveResponse(this.teamService.update(this.team));
        } else {
            this.subscribeToSaveResponse(this.teamService.create(this.team));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITeamMySuffix>>) {
        result.subscribe((res: HttpResponse<ITeamMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get team() {
        return this._team;
    }

    set team(team: ITeamMySuffix) {
        this._team = team;
    }
}
