import { ActionItem, ActionItemStatus } from '../action-item';

describe('Action Item', () => {
  it('should be to initialized', () => {
    const actionItem = new ActionItem(
      'teamId',
      'organisationId',
      'boardId',
      'note',
      '123123',
    );
    expect(actionItem).toBeDefined();
  });

  it('should be able to update note', () => {
    const actionItem = new ActionItem(
      'teamId',
      'organisationId',
      'boardId',
      'note',
      '123123',
    );

    actionItem.updateNote('123', 'userId');

    expect(actionItem.note).toBe('123');
    expect(actionItem.updatedBy).toBe('userId');
  });

  it('should be able to update status', () => {
    const actionItem = new ActionItem(
      'teamId',
      'organisationId',
      'boardId',
      'note',
      '123123',
    );

    actionItem.updateStatus(ActionItemStatus.COMPLETED, 'userId');

    expect(actionItem.status).toBe(ActionItemStatus.COMPLETED);
    expect(actionItem.updatedBy).toBe('userId');
  });
});
