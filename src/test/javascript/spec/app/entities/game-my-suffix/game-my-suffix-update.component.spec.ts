/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HockeyMatchTestModule } from '../../../test.module';
import { GameMySuffixUpdateComponent } from 'app/entities/game-my-suffix/game-my-suffix-update.component';
import { GameMySuffixService } from 'app/entities/game-my-suffix/game-my-suffix.service';
import { GameMySuffix } from 'app/shared/model/game-my-suffix.model';

import { TeamMySuffixService } from 'app/entities/team-my-suffix';

describe('Component Tests', () => {
    describe('GameMySuffix Management Update Component', () => {
        let comp: GameMySuffixUpdateComponent;
        let fixture: ComponentFixture<GameMySuffixUpdateComponent>;
        let service: GameMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HockeyMatchTestModule],
                declarations: [GameMySuffixUpdateComponent],
                providers: [TeamMySuffixService, GameMySuffixService]
            })
                .overrideTemplate(GameMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GameMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GameMySuffix(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.game = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new GameMySuffix();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.game = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
