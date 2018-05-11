import { Moment } from 'moment';

export interface IGameMySuffix {
    id?: number;
    time?: Moment;
    goalsTeam1?: number;
    goalsTeam2?: number;
    resultTeam1?: number;
    resultTeam2?: number;
    team1Name?: string;
    team1Id?: number;
    team2Name?: string;
    team2Id?: number;
}

export class GameMySuffix implements IGameMySuffix {
    constructor(
        public id?: number,
        public time?: Moment,
        public goalsTeam1?: number,
        public goalsTeam2?: number,
        public resultTeam1?: number,
        public resultTeam2?: number,
        public team1Name?: string,
        public team1Id?: number,
        public team2Name?: string,
        public team2Id?: number
    ) {}
}
