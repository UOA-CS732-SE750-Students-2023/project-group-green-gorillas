import { createMock } from '@golevelup/ts-jest';
import { UUID } from 'src/types/uuid.type';
import { ActionItemService } from '../action-item.service';
import { ActionItemRepository } from '../action-item.repository';
import { ActionItem, ActionItemStatus } from '../action-item';

describe('ActionItemService', () => {
  let service: ActionItemService;
  let actionItemRepository: ActionItemRepository;

  const teamId: UUID = 'team-id';
  const organisationId: UUID = 'organisation-id';
  const boardId: UUID = 'board-id';
  const note: string = 'note';
  const createdBy: UUID = 'created-by';
  const updatedBy: UUID = 'updated-by';

  const actionItem: ActionItem = new ActionItem(
    teamId,
    organisationId,
    boardId,
    note,
    createdBy,
  );

  beforeEach(() => {
    actionItemRepository = createMock<ActionItemRepository>();
    service = new ActionItemService(actionItemRepository);
  });

  describe('listByStatus', () => {
    it('should return an empty array if no action item with the given status is found', async () => {
      const status: ActionItemStatus = ActionItemStatus.IN_PROGRESS;
      const listByStatusSpy = jest.spyOn(actionItemRepository, 'listByStatus');
      listByStatusSpy.mockResolvedValue([]);

      const result = await service.listByStatus(teamId, status);

      expect(result).toEqual([]);
      expect(listByStatusSpy).toHaveBeenCalledTimes(1);
      expect(listByStatusSpy).toHaveBeenCalledWith(teamId, status);
    });

    it('should return an array of action items with the given status', async () => {
      const status: ActionItemStatus = ActionItemStatus.IN_PROGRESS;
      const listByStatusSpy = jest.spyOn(actionItemRepository, 'listByStatus');
      listByStatusSpy.mockResolvedValue([actionItem]);

      const result = await service.listByStatus(teamId, status);

      expect(result).toEqual([actionItem]);
      expect(listByStatusSpy).toHaveBeenCalledTimes(1);
      expect(listByStatusSpy).toHaveBeenCalledWith(teamId, status);
    });
  });

  describe('listByBoardId', () => {
    it('should return an empty array if no action item with the given boardId is found', async () => {
      const listByBoardIdSpy = jest.spyOn(
        actionItemRepository,
        'listByBoardId',
      );
      listByBoardIdSpy.mockResolvedValue([]);

      const result = await service.listByBoardId(boardId, teamId);

      expect(result).toEqual([]);
      expect(listByBoardIdSpy).toHaveBeenCalledTimes(1);
      expect(listByBoardIdSpy).toHaveBeenCalledWith(teamId, boardId);
    });

    it('should return an array of action items with the given boardId', async () => {
      const listByBoardIdSpy = jest.spyOn(
        actionItemRepository,
        'listByBoardId',
      );
      listByBoardIdSpy.mockResolvedValue([actionItem]);

      const result = await service.listByBoardId(boardId, teamId);

      expect(result).toEqual([actionItem]);
      expect(listByBoardIdSpy).toHaveBeenCalledTimes(1);
      expect(listByBoardIdSpy).toHaveBeenCalledWith(teamId, boardId);
    });
  });
});
