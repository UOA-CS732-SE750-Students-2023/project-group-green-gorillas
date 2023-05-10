import { ActionItemFactory } from '../action-item.factory';
import { ActionItem } from '../action-item';

describe('ActionItemFactory', () => {
  describe('create', () => {
    it('should create a new ActionItem object with the provided parameters', () => {
      const teamId = 'teamId';
      const organisationId = 'organisationId';
      const boardId = 'boardId';
      const note = 'Some note';
      const createdBy = 'createdBy';

      const actionItem = ActionItemFactory.create(
        teamId,
        organisationId,
        boardId,
        note,
        createdBy,
      );

      expect(actionItem).toBeInstanceOf(ActionItem);
      expect(actionItem.teamId).toEqual(teamId);
      expect(actionItem.organisationId).toEqual(organisationId);
      expect(actionItem.boardId).toEqual(boardId);
      expect(actionItem.note).toEqual(note);
      expect(actionItem.createdBy).toEqual(createdBy);
      expect(actionItem.updatedBy).toEqual(createdBy);
    });
  });
});
