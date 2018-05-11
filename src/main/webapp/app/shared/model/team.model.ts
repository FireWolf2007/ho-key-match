export interface ITeam {
    id?: number;
    name?: string;
    userLogin?: string;
    userId?: number;
}

export class Team implements ITeam {
    constructor(public id?: number, public name?: string, public userLogin?: string, public userId?: number) {}
}
