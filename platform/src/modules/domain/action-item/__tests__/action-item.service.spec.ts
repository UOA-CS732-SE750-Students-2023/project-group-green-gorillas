import { ActionItemService } from '../action-item.service';
import { createMock } from '@golevelup/ts-jest';
import { ActionItemRepository } from '../action-item.repository';
import { ActionItemStatus } from '../action-item';

describe('ActionItemService', () => {
  let actionItemService: ActionItemService;

  const actionItemRepository = createMock<ActionItemRepository>();

  beforeAll(() => {
    actionItemService = new ActionItemService(actionItemRepository);
  });

  it('should be able to list by status', async () => {
    actionItemRepository.listByStatus.mockResolvedValue([]);

    const result = await actionItemService.listByStatus(
      '123',
      ActionItemStatus.IN_PROGRESS,
    );

    expect(result).toEqual([]);
  });

  it('should be able to list by board id', async () => {
    actionItemRepository.listByBoardId.mockResolvedValue([]);

    const result = await actionItemService.listByBoardId('123', '123');

    expect(result).toEqual([]);
  });

  it('should be able to save', async () => {
    actionItemRepository.save.mockResolvedValue({} as any);

    const result = await actionItemService.save({} as any);

    expect(result).toEqual({});
  });

  it('should be able to create', async () => {
    actionItemRepository.save.mockResolvedValue({} as any);

    const result = await actionItemService.create('1', '1', '1', 'note', '1');

    expect(result).toEqual({});
  });

  it('should be able to delete', async () => {
    actionItemRepository.delete.mockResolvedValue(undefined);

    await actionItemService.delete('i');

    expect(actionItemRepository.delete).toHaveBeenCalledTimes(1);
  });

  it('should be able to get by id', async () => {
    actionItemRepository.getById.mockResolvedValue(undefined);

    const result = await actionItemService.getById('1');

    expect(result).toEqual(undefined);
  });
});
