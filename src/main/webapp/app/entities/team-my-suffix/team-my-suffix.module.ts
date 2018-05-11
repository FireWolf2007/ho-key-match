import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HockeyMatchSharedModule } from 'app/shared';
import { HockeyMatchAdminModule } from 'app/admin/admin.module';
import {
    TeamMySuffixService,
    TeamMySuffixComponent,
    TeamMySuffixDetailComponent,
    TeamMySuffixUpdateComponent,
    TeamMySuffixDeletePopupComponent,
    TeamMySuffixDeleteDialogComponent,
    teamRoute,
    teamPopupRoute,
    TeamMySuffixResolve,
    TeamMySuffixResolvePagingParams
} from './';

const ENTITY_STATES = [...teamRoute, ...teamPopupRoute];

@NgModule({
    imports: [HockeyMatchSharedModule, HockeyMatchAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeamMySuffixComponent,
        TeamMySuffixDetailComponent,
        TeamMySuffixUpdateComponent,
        TeamMySuffixDeleteDialogComponent,
        TeamMySuffixDeletePopupComponent
    ],
    entryComponents: [
        TeamMySuffixComponent,
        TeamMySuffixUpdateComponent,
        TeamMySuffixDeleteDialogComponent,
        TeamMySuffixDeletePopupComponent
    ],
    providers: [TeamMySuffixService, TeamMySuffixResolve, TeamMySuffixResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HockeyMatchTeamMySuffixModule {}
