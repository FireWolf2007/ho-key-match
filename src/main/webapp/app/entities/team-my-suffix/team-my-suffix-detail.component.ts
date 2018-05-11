import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeamMySuffix } from 'app/shared/model/team-my-suffix.model';

@Component({
    selector: 'jhi-team-my-suffix-detail',
    templateUrl: './team-my-suffix-detail.component.html'
})
export class TeamMySuffixDetailComponent implements OnInit {
    team: ITeamMySuffix;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ team }) => {
            this.team = team.body ? team.body : team;
        });
    }

    previousState() {
        window.history.back();
    }
}
