import { ActionItemAssigneeFactory } from '../action-item-assignee.factory';
import { UUID } from '../../../../types/uuid.type';
import { ActionItemAssignee } from '../action-item-assignee';

describe('ActionItemAssigneeFactory', () => {
  describe('create', () => {
    it('should return an instance of ActionItemAssignee', () => {
      // Arrange
      const userId: UUID = 'user-123';
      const actionItemId: UUID = 'action-item-123';

      // Act
      const actionItemAssignee = ActionItemAssigneeFactory.create(
        userId,
        actionItemId,
      );

      // Assert
      expect(actionItemAssignee).toBeInstanceOf(ActionItemAssignee);
      expect(actionItemAssignee.userId).toEqual(userId);
      expect(actionItemAssignee.actionItemId).toEqual(actionItemId);
    });
  });
});
