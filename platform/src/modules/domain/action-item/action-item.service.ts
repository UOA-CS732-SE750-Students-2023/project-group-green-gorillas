import { ActionItemRepository } from './action-item.repository';

export class ActionItemService {
  constructor(private readonly actionItemRepository: ActionItemRepository) {}
}
