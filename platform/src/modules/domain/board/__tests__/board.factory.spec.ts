import { BoardFactory } from '../board.factory';
import { Board } from '../board';

describe('BoardFactory', () => {
  it('should create a new Board', () => {
    const name = 'Test Board';
    const organisationId = 'org-123';
    const teamId = 'team-123';
    const createdBy = 'user-123';

    const board = BoardFactory.create(name, organisationId, teamId, createdBy);

    expect(board).toBeInstanceOf(Board);
    expect(board.name).toBe(name);
    expect(board.organisationId).toBe(organisationId);
    expect(board.teamId).toBe(teamId);
    expect(board.createdBy).toBe(createdBy);
  });
});
