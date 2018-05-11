import { Moment } from 'moment';

export interface IGame {
    id?: number;
    time?: Moment;
    goalsTeam1?: number;
    goalsTeam2?: number;
    resultTeam1?: number;
    resultTeam2?: number;
    tournamentName?: string;
    tournamentId?: number;
    team1Name?: string;
    team1Id?: number;
    team2Name?: string;
    team2Id?: number;
}

export class Game implements IGame {
    constructor(
        public id?: number,
        public time?: Moment,
        public goalsTeam1?: number,
        public goalsTeam2?: number,
        public resultTeam1?: number,
        public resultTeam2?: number,
        public tournamentName?: string,
        public tournamentId?: number,
        public team1Name?: string,
        public team1Id?: number,
        public team2Name?: string,
        public team2Id?: number
    ) {}
}
