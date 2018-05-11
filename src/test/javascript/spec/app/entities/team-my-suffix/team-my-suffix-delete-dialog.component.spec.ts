/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HockeyMatchTestModule } from '../../../test.module';
import { TeamMySuffixDeleteDialogComponent } from 'app/entities/team-my-suffix/team-my-suffix-delete-dialog.component';
import { TeamMySuffixService } from 'app/entities/team-my-suffix/team-my-suffix.service';

describe('Component Tests', () => {
    describe('TeamMySuffix Management Delete Component', () => {
        let comp: TeamMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TeamMySuffixDeleteDialogComponent>;
        let service: TeamMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HockeyMatchTestModule],
                declarations: [TeamMySuffixDeleteDialogComponent],
                providers: [TeamMySuffixService]
            })
                .overrideTemplate(TeamMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeamMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeamMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
