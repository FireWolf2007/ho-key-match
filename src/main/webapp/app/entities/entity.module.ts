import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HockeyMatchTeamModule } from './team/team.module';
import { HockeyMatchGameModule } from './game/game.module';
import { HockeyMatchTournamentModule } from './tournament/tournament.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        HockeyMatchTeamModule,
        HockeyMatchGameModule,
        HockeyMatchTournamentModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HockeyMatchEntityModule {}
