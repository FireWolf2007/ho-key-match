import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HockeyMatchSharedModule } from 'app/shared';
import {
    GameMySuffixService,
    GameMySuffixComponent,
    GameMySuffixDetailComponent,
    GameMySuffixUpdateComponent,
    GameMySuffixDeletePopupComponent,
    GameMySuffixDeleteDialogComponent,
    gameRoute,
    gamePopupRoute,
    GameMySuffixResolve
} from './';

const ENTITY_STATES = [...gameRoute, ...gamePopupRoute];

@NgModule({
    imports: [HockeyMatchSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GameMySuffixComponent,
        GameMySuffixDetailComponent,
        GameMySuffixUpdateComponent,
        GameMySuffixDeleteDialogComponent,
        GameMySuffixDeletePopupComponent
    ],
    entryComponents: [
        GameMySuffixComponent,
        GameMySuffixUpdateComponent,
        GameMySuffixDeleteDialogComponent,
        GameMySuffixDeletePopupComponent
    ],
    providers: [GameMySuffixService, GameMySuffixResolve],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HockeyMatchGameMySuffixModule {}
