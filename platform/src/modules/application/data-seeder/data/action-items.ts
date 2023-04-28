import { ActionItemStatus } from '../../../domain/action-item/action-item';
import { DateTime } from 'luxon';

export const actionItems = [
  {
    id: '036e71dc-acad-4d95-9baa-5dfbe184ae92',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    note: 'This is action item A. ',
    status: ActionItemStatus.IN_PROGRESS,
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
  {
    id: '5ef1f7bb-a001-4715-9971-777755d4dbcb',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    note: 'This is action item B',
    status: ActionItemStatus.IN_PROGRESS,
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
  {
    id: '04d5439a-0da7-470b-a438-f98e3b1dfc68',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    note: 'This is action item C',
    status: ActionItemStatus.IN_PROGRESS,
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
  {
    id: 'cbdc15ce-ba17-4362-ba20-28751066998e',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    note: 'This is action item D',
    status: ActionItemStatus.IN_PROGRESS,
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
];
