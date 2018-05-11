import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { GameMySuffix } from 'app/shared/model/game-my-suffix.model';
import { GameMySuffixService } from './game-my-suffix.service';
import { GameMySuffixComponent } from './game-my-suffix.component';
import { GameMySuffixDetailComponent } from './game-my-suffix-detail.component';
import { GameMySuffixUpdateComponent } from './game-my-suffix-update.component';
import { GameMySuffixDeletePopupComponent } from './game-my-suffix-delete-dialog.component';

@Injectable()
export class GameMySuffixResolve implements Resolve<any> {
    constructor(private service: GameMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new GameMySuffix();
    }
}

export const gameRoute: Routes = [
    {
        path: 'game-my-suffix',
        component: GameMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-my-suffix/:id/view',
        component: GameMySuffixDetailComponent,
        resolve: {
            game: GameMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-my-suffix/new',
        component: GameMySuffixUpdateComponent,
        resolve: {
            game: GameMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'game-my-suffix/:id/edit',
        component: GameMySuffixUpdateComponent,
        resolve: {
            game: GameMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.game.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gamePopupRoute: Routes = [
    {
        path: 'game-my-suffix/:id/delete',
        component: GameMySuffixDeletePopupComponent,
        resolve: {
            game: GameMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.game.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
