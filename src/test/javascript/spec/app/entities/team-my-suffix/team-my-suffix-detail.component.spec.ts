/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { HockeyMatchTestModule } from '../../../test.module';
import { TeamMySuffixDetailComponent } from 'app/entities/team-my-suffix/team-my-suffix-detail.component';
import { TeamMySuffix } from 'app/shared/model/team-my-suffix.model';

describe('Component Tests', () => {
    describe('TeamMySuffix Management Detail Component', () => {
        let comp: TeamMySuffixDetailComponent;
        let fixture: ComponentFixture<TeamMySuffixDetailComponent>;
        const route = ({ data: of({ team: new TeamMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HockeyMatchTestModule],
                declarations: [TeamMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeamMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeamMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.team).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
