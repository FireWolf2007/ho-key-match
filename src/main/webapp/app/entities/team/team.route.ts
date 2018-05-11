import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Team } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { TeamComponent } from './team.component';
import { TeamDetailComponent } from './team-detail.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamDeletePopupComponent } from './team-delete-dialog.component';

@Injectable()
export class TeamResolvePagingParams implements Resolve<any> {
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
export class TeamResolve implements Resolve<any> {
    constructor(private service: TeamService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Team();
    }
}

export const teamRoute: Routes = [
    {
        path: 'team',
        component: TeamComponent,
        resolve: {
            pagingParams: TeamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team/:id/view',
        component: TeamDetailComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team/new',
        component: TeamUpdateComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team/:id/edit',
        component: TeamUpdateComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teamPopupRoute: Routes = [
    {
        path: 'team/:id/delete',
        component: TeamDeletePopupComponent,
        resolve: {
            team: TeamResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
