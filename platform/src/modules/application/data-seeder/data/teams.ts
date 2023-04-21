import { DateTime } from 'luxon';

export const teams = [
  {
    id: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    name: 'Team A',
    active: true,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
  {
    id: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    name: 'Team B',
    active: true,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
  },
];
