import { ActionItemFactory } from '../action-item.factory';

describe('ActionItemFactory', () => {
  it('should be able to create action item', () => {
    expect(
      ActionItemFactory.create(
        'teamId',
        'organisationId',
        'boardId',
        'note',
        '123123',
      ),
    ).toBeDefined();
  });
});
