import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGameMySuffix } from 'app/shared/model/game-my-suffix.model';

type EntityResponseType = HttpResponse<IGameMySuffix>;
type EntityArrayResponseType = HttpResponse<IGameMySuffix[]>;

@Injectable()
export class GameMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/games';

    constructor(private http: HttpClient) {}

    create(game: IGameMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(game);
        return this.http
            .post<IGameMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(game: IGameMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(game);
        return this.http
            .put<IGameMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IGameMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IGameMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(game: IGameMySuffix): IGameMySuffix {
        const copy: IGameMySuffix = Object.assign({}, game, {
            time: game.time != null && game.time.isValid() ? game.time.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.time = res.body.time != null ? moment(res.body.time) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((game: IGameMySuffix) => {
            game.time = game.time != null ? moment(game.time) : null;
        });
        return res;
    }
}
