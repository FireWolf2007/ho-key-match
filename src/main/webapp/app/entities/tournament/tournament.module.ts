import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HockeyMatchSharedModule } from 'app/shared';
import {
    TournamentService,
    TournamentComponent,
    TournamentDetailComponent,
    TournamentUpdateComponent,
    TournamentDeletePopupComponent,
    TournamentDeleteDialogComponent,
    tournamentRoute,
    tournamentPopupRoute,
    TournamentResolve,
    TournamentResolvePagingParams
} from './';

const ENTITY_STATES = [...tournamentRoute, ...tournamentPopupRoute];

@NgModule({
    imports: [HockeyMatchSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TournamentComponent,
        TournamentDetailComponent,
        TournamentUpdateComponent,
        TournamentDeleteDialogComponent,
        TournamentDeletePopupComponent
    ],
    entryComponents: [TournamentComponent, TournamentUpdateComponent, TournamentDeleteDialogComponent, TournamentDeletePopupComponent],
    providers: [TournamentService, TournamentResolve, TournamentResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HockeyMatchTournamentModule {}
