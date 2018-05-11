import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGameMySuffix } from 'app/shared/model/game-my-suffix.model';

@Component({
    selector: 'jhi-game-my-suffix-detail',
    templateUrl: './game-my-suffix-detail.component.html'
})
export class GameMySuffixDetailComponent implements OnInit {
    game: IGameMySuffix;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ game }) => {
            this.game = game.body ? game.body : game;
        });
    }

    previousState() {
        window.history.back();
    }
}
