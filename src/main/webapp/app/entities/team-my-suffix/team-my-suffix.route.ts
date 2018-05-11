import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { TeamMySuffix } from 'app/shared/model/team-my-suffix.model';
import { TeamMySuffixService } from './team-my-suffix.service';
import { TeamMySuffixComponent } from './team-my-suffix.component';
import { TeamMySuffixDetailComponent } from './team-my-suffix-detail.component';
import { TeamMySuffixUpdateComponent } from './team-my-suffix-update.component';
import { TeamMySuffixDeletePopupComponent } from './team-my-suffix-delete-dialog.component';

@Injectable()
export class TeamMySuffixResolvePagingParams implements Resolve<any> {
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
export class TeamMySuffixResolve implements Resolve<any> {
    constructor(private service: TeamMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new TeamMySuffix();
    }
}

export const teamRoute: Routes = [
    {
        path: 'team-my-suffix',
        component: TeamMySuffixComponent,
        resolve: {
            pagingParams: TeamMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-my-suffix/:id/view',
        component: TeamMySuffixDetailComponent,
        resolve: {
            team: TeamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-my-suffix/new',
        component: TeamMySuffixUpdateComponent,
        resolve: {
            team: TeamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'team-my-suffix/:id/edit',
        component: TeamMySuffixUpdateComponent,
        resolve: {
            team: TeamMySuffixResolve
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
        path: 'team-my-suffix/:id/delete',
        component: TeamMySuffixDeletePopupComponent,
        resolve: {
            team: TeamMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hockeyMatchApp.team.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
