import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Tournament } from 'app/shared/model/tournament.model';
import { TournamentService } from './tournament.service';
import { TournamentComponent } from './tournament.component';
import { TournamentDetailComponent } from './tournament-detail.component';
import { TournamentUpdateComponent } from './tournament-update.component';
import { TournamentDeletePopupComponent } from './tournament-delete-dialog.component';

@Injectable()
export class TournamentResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

@Injectable()
export class TournamentResolve implements Resolve<any> {
    constructor(private service: TournamentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Tournament();
    }
}

export const tournamentRoute: Routes = [
    {
        path: 'tournament',
        component: TournamentComponent,
        resolve: {
            pagingParams: TournamentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.tournament.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tournament/:id/view',
        component: TournamentDetailComponent,
        resolve: {
            tournament: TournamentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.tournament.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tournament/new',
        component: TournamentUpdateComponent,
        resolve: {
            tournament: TournamentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.tournament.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tournament/:id/edit',
        component: TournamentUpdateComponent,
        resolve: {
            tournament: TournamentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.tournament.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tournamentPopupRoute: Routes = [
    {
        path: 'tournament/:id/delete',
        component: TournamentDeletePopupComponent,
        resolve: {
            tournament: TournamentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.tournament.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
