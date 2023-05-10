import { uuid } from '../../../../utils/uuid/uuid';
import { Board, BoardStage } from '../board';

describe('Board', () => {
  const name = 'Test Board';
  const organisationId = uuid();
  const teamId = uuid();
  const createdBy = uuid();
  let board: Board;

  beforeEach(() => {
    board = new Board(name, organisationId, teamId, createdBy);
  });

  it('should have a generated UUID', () => {
    expect(board.id).toBeDefined();
  });

  it('should have a name', () => {
    expect(board.name).toEqual(name);
  });

  it('should have a stage', () => {
    expect(board.stage).toEqual(BoardStage.THINK);
  });

  it('should have a createdBy', () => {
    expect(board.createdBy).toEqual(createdBy);
  });

  it('should have a createdAt datetime', () => {
    expect(board.createdAt).toBeDefined();
  });

  it('should have a updatedAt datetime', () => {
    expect(board.updatedAt).toBeDefined();
  });

  it('should have a sessionPayload object', () => {
    expect(board.sessionPayload).toBeDefined();
  });

  it('should be able to update the name', () => {
    const newName = 'New Test Board Name';
    board.updateName(newName);
    expect(board.name).toEqual(newName);
  });

  it('should be able to update the stage', () => {
    const newStage = BoardStage.GROUP;
    board.updateStage(newStage);
    expect(board.stage).toEqual(newStage);
  });

  it('should be able to set the session payload', () => {
    const payload = { key: 'value' };
    board.setSessionPayload(payload);
    expect(board.sessionPayload).toEqual(payload);
  });
});
