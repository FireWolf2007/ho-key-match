import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HockeyMatchSharedModule } from 'app/shared';
import { HockeyMatchAdminModule } from 'app/admin/admin.module';
import {
    TeamComponent,
    TeamDetailComponent,
    TeamUpdateComponent,
    TeamDeletePopupComponent,
    TeamDeleteDialogComponent,
    teamRoute,
    teamPopupRoute
} from './';

const ENTITY_STATES = [...teamRoute, ...teamPopupRoute];

@NgModule({
    imports: [HockeyMatchSharedModule, HockeyMatchAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TeamComponent, TeamDetailComponent, TeamUpdateComponent, TeamDeleteDialogComponent, TeamDeletePopupComponent],
    entryComponents: [TeamComponent, TeamUpdateComponent, TeamDeleteDialogComponent, TeamDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HockeyMatchTeamModule {}
