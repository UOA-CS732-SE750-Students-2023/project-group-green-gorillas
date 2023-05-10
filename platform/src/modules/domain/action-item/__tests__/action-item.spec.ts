// Import necessary modules and classes
import { DateTime } from 'luxon';
import { UUID } from '../../../../types/uuid.type';
import { ActionItem, ActionItemStatus } from '../action-item';

// Mock the uuid function to return a fixed UUID for testing
jest.mock('../../../../types/uuid.type', () => ({
  uuid: () => 'test-id',
}));

describe('ActionItem', () => {
  let teamId: UUID;
  let organisationId: UUID;
  let boardId: UUID;
  let createdBy: UUID;
  let actionItem: any;

  beforeEach(() => {
    // Set up initial values for testing
    teamId = 'test-team-id';
    organisationId = 'test-organisation-id';
    boardId = 'test-board-id';
    createdBy = 'test-creator-id';
    actionItem = new ActionItem(
      teamId,
      organisationId,
      boardId,
      'Initial note',
      createdBy,
    );
  });

  describe('updateNote', () => {
    it('updates the note and updatedAt properties', () => {
      // Call the updateNote method with a new note and creator ID
      const newNote = 'New note';
      const updatedBy: UUID = 'test-updater-id';
      actionItem.updateNote(newNote, updatedBy);

      // Assert that the note and updatedAt properties have been updated
      expect(actionItem.note).toEqual(newNote);
      expect(actionItem.updatedBy).toEqual(updatedBy);
      expect(actionItem.updatedAt).toBeInstanceOf(DateTime);
    });
  });

  describe('updateStatus', () => {
    it('updates the status and updatedAt properties', () => {
      // Call the updateStatus method with a new status and creator ID
      const newStatus = ActionItemStatus.COMPLETED;
      const updatedBy: UUID = 'test-updater-id';
      actionItem.updateStatus(newStatus, updatedBy);

      // Assert that the status and updatedAt properties have been updated
      expect(actionItem.status).toEqual(newStatus);
      expect(actionItem.updatedBy).toEqual(updatedBy);
      expect(actionItem.updatedAt).toBeInstanceOf(DateTime);
    });
  });
});
