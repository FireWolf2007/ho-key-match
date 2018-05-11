/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { HockeyMatchTestModule } from '../../../test.module';
import { GameMySuffixDetailComponent } from 'app/entities/game-my-suffix/game-my-suffix-detail.component';
import { GameMySuffix } from 'app/shared/model/game-my-suffix.model';

describe('Component Tests', () => {
    describe('GameMySuffix Management Detail Component', () => {
        let comp: GameMySuffixDetailComponent;
        let fixture: ComponentFixture<GameMySuffixDetailComponent>;
        const route = ({ data: of({ game: new GameMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HockeyMatchTestModule],
                declarations: [GameMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GameMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GameMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.game).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
