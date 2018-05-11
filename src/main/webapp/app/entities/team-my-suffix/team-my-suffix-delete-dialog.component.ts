import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeamMySuffix } from 'app/shared/model/team-my-suffix.model';
import { TeamMySuffixService } from './team-my-suffix.service';

@Component({
    selector: 'jhi-team-my-suffix-delete-dialog',
    templateUrl: './team-my-suffix-delete-dialog.component.html'
})
export class TeamMySuffixDeleteDialogComponent {
    team: ITeamMySuffix;

    constructor(private teamService: TeamMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teamService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'teamListModification',
                content: 'Deleted an team'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-team-my-suffix-delete-popup',
    template: ''
})
export class TeamMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ team }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TeamMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.team = team.body;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
