import { BoardNote, BoardNoteType, BoardNoteColor } from '../board-note';
import { DateTime } from 'luxon';

describe('BoardNote', () => {
  const boardSectionId = 'boardSectionId';
  const boardId = 'boardId';
  const organisationId = 'organisationId';
  const teamId = 'teamId';
  const note = 'note';
  const createdBy = 'createdBy';
  const parentId = 'parentId';
  const type = BoardNoteType.NORMAL;
  const color = BoardNoteColor.PINK;

  it('should create a BoardNote instance', () => {
    const boardNote = new BoardNote(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
      type,
      parentId,
      color,
    );

    expect(boardNote).toBeInstanceOf(BoardNote);
    expect(boardNote.id).toBeTruthy();
    expect(boardNote.boardSectionId).toBe(boardSectionId);
    expect(boardNote.boardId).toBe(boardId);
    expect(boardNote.organisationId).toBe(organisationId);
    expect(boardNote.teamId).toBe(teamId);
    expect(boardNote.note).toBe(note);
    expect(boardNote.createdBy).toBe(createdBy);
    expect(boardNote.parentId).toBe(parentId);
    expect(boardNote.type).toBe(type);
    expect(boardNote.color).toBe(color);
    expect(boardNote.createdAt).toBeInstanceOf(DateTime);
    expect(boardNote.updatedAt).toBeInstanceOf(DateTime);
  });

  it('should update the note', () => {
    const boardNote = new BoardNote(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
      type,
      parentId,
      color,
    );

    const newNote = 'new note';
    boardNote.updateNote(newNote);

    expect(boardNote.note).toBe(newNote);
  });

  it('should update the parent ID', () => {
    const boardNote = new BoardNote(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
      type,
      parentId,
      color,
    );

    const newParentId = 'new parentId';
    boardNote.updateParentId(newParentId);

    expect(boardNote.parentId).toBe(newParentId);
  });

  it('should update the board section ID', () => {
    const boardNote = new BoardNote(
      boardSectionId,
      boardId,
      organisationId,
      teamId,
      note,
      createdBy,
      type,
      parentId,
      color,
    );

    const newBoardSectionId = 'new boardSectionId';
    boardNote.updateBoardSectionId(newBoardSectionId);

    expect(boardNote.boardSectionId).toBe(newBoardSectionId);
  });
});
