import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITournament } from 'app/shared/model/tournament.model';

@Component({
    selector: 'jhi-tournament-detail',
    templateUrl: './tournament-detail.component.html'
})
export class TournamentDetailComponent implements OnInit {
    tournament: ITournament;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ tournament }) => {
            this.tournament = tournament.body ? tournament.body : tournament;
        });
    }

    previousState() {
        window.history.back();
    }
}
