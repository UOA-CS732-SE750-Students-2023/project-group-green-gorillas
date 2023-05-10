import { ActionItemAssignee } from '../action-item-assignee';

describe('ActionItemAssignee', () => {
  describe('constructor', () => {
    it('should create an instance of ActionItemAssignee', () => {
      // Arrange
      const userId = 'd57b1e32-f87e-4245-afb5-5186bc3de679';
      const actionItemId = '5f87a24b-8d27-4a53-8b54-8c0a240ba1c5';

      // Act
      const actionItemAssignee = new ActionItemAssignee(userId, actionItemId);

      // Assert
      expect(actionItemAssignee).toBeInstanceOf(ActionItemAssignee);
      expect(actionItemAssignee.userId).toBe(userId);
      expect(actionItemAssignee.actionItemId).toBe(actionItemId);
      expect(actionItemAssignee.createdAt).toBeDefined();
    });
  });
});
