import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HockeyMatchTeamMySuffixModule } from './team-my-suffix/team-my-suffix.module';
import { HockeyMatchGameMySuffixModule } from './game-my-suffix/game-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        HockeyMatchTeamMySuffixModule,
        HockeyMatchGameMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HockeyMatchEntityModule {}
