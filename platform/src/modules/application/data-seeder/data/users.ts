import { DateTime } from 'luxon';

export const users = [
  {
    id: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'sden406@aucklanduni.ac.nz',
    displayName: 'Oliver',
    firstName: 'Oliver',
    lastName: 'Deng',
    type: 'ADMIN',
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
];
