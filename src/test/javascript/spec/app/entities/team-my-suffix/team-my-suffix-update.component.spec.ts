/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HockeyMatchTestModule } from '../../../test.module';
import { TeamMySuffixUpdateComponent } from 'app/entities/team-my-suffix/team-my-suffix-update.component';
import { TeamMySuffixService } from 'app/entities/team-my-suffix/team-my-suffix.service';
import { TeamMySuffix } from 'app/shared/model/team-my-suffix.model';

import { UserService } from 'app/core';

describe('Component Tests', () => {
    describe('TeamMySuffix Management Update Component', () => {
        let comp: TeamMySuffixUpdateComponent;
        let fixture: ComponentFixture<TeamMySuffixUpdateComponent>;
        let service: TeamMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HockeyMatchTestModule],
                declarations: [TeamMySuffixUpdateComponent],
                providers: [UserService, TeamMySuffixService]
            })
                .overrideTemplate(TeamMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeamMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TeamMySuffix(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.team = entity;
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
                    const entity = new TeamMySuffix();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.team = entity;
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
