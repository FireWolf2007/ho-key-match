export interface ITeamMySuffix {
    id?: number;
    name?: string;
    userLogin?: string;
    userId?: number;
}

export class TeamMySuffix implements ITeamMySuffix {
    constructor(public id?: number, public name?: string, public userLogin?: string, public userId?: number) {}
}
