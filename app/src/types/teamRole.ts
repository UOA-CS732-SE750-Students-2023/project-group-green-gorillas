export enum Role {
    LEADER = 'LEADER',
    TEMPORARY_LEADER = 'TEMPORARY_LEADER',
    MEMBER = 'MEMBER',
}

export type TeamRole = {
    role: Role;
    userId: string;
    teamId: string;
    organisationId: string;
    createdAt: string;
    updateAt: string;
};
