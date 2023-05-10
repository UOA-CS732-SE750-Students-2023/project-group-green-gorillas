import { ActionItemAssigneeService } from '../action-item-assignee.service';
import { ActionItemAssigneeRepository } from '../action-item-assignee.repository';
import { createMock } from '@golevelup/ts-jest';
import { UUID } from '../../../../types/uuid.type';
import { ActionItemAssigneeFactory } from '../action-item-assignee.factory';

describe('ActionItemAssigneeService', () => {
  let actionItemAssigneeService: ActionItemAssigneeService;
  let actionItemAssigneeRepository: any;

  const actionItemId: UUID = '123';
  const userId: UUID = '456';

  beforeEach(() => {
    actionItemAssigneeRepository = createMock<ActionItemAssigneeRepository>();
    actionItemAssigneeService = new ActionItemAssigneeService(
      actionItemAssigneeRepository,
    );
  });

  describe('listByActionItemId', () => {
    it('should call actionItemAssigneeRepository.listByActionItemId with the provided actionItemId', async () => {
      await actionItemAssigneeService.listByActionItemId(actionItemId);

      expect(
        actionItemAssigneeRepository.listByActionItemId,
      ).toHaveBeenCalledWith(actionItemId);
    });

    it('should return the result of actionItemAssigneeRepository.listByActionItemId', async () => {
      const expected: any[] = [
        { id: '789', userId: '123', actionItemId: '456' },
      ];
      actionItemAssigneeRepository.listByActionItemId.mockResolvedValue(
        expected,
      );

      const result = await actionItemAssigneeService.listByActionItemId(
        actionItemId,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('create', () => {
    it('should call actionItemAssigneeRepository.save with the result of ActionItemAssigneeFactory.create', async () => {
      const expected = { id: '123', userId: '456', actionItemId: '789' };
      actionItemAssigneeRepository.save.mockResolvedValue(expected);

      await actionItemAssigneeService.create(userId, actionItemId);

      expect(actionItemAssigneeRepository.save).toHaveBeenCalledWith(
        ActionItemAssigneeFactory.create(userId, actionItemId),
      );
    });

    it('should return the result of actionItemAssigneeRepository.save', async () => {
      const expected = { id: '123', userId: '456', actionItemId: '789' };
      actionItemAssigneeRepository.save.mockResolvedValue(expected);

      const result = await actionItemAssigneeService.create(
        userId,
        actionItemId,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('delete', () => {
    it('should call actionItemAssigneeRepository.delete with the provided userId and actionItemId', async () => {
      await actionItemAssigneeService.delete(userId, actionItemId);

      expect(actionItemAssigneeRepository.delete).toHaveBeenCalledWith(
        actionItemId,
        userId,
      );
    });
  });

  describe('save', () => {
    it('should call actionItemAssigneeRepository.save with the provided actionItemAssignee', async () => {
      const actionItemAssignee: any = {
        id: '123',
        userId: '456',
        actionItemId: '789',
      };
      actionItemAssigneeRepository.save.mockResolvedValue(actionItemAssignee);

      await actionItemAssigneeService.save(actionItemAssignee);

      expect(actionItemAssigneeRepository.save).toHaveBeenCalledWith(
        actionItemAssignee,
      );
    });
  });
});
