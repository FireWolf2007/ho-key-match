import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGameMySuffix } from 'app/shared/model/game-my-suffix.model';
import { GameMySuffixService } from './game-my-suffix.service';

@Component({
    selector: 'jhi-game-my-suffix-delete-dialog',
    templateUrl: './game-my-suffix-delete-dialog.component.html'
})
export class GameMySuffixDeleteDialogComponent {
    game: IGameMySuffix;

    constructor(private gameService: GameMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gameListModification',
                content: 'Deleted an game'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-my-suffix-delete-popup',
    template: ''
})
export class GameMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ game }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GameMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.game = game.body;
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
