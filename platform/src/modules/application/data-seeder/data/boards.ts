import { BoardStage } from '../../../domain/board/board';
import { DateTime } from 'luxon';

export const boards = [
  {
    id: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    name: 'Sprint 100',
    stage: BoardStage.FINALIZE,
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
  {
    id: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    name: 'Sprint 101',
    stage: BoardStage.FINALIZE,
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
];
