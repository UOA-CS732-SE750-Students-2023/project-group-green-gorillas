import { DateTime } from 'luxon';
import { UserRole } from '../../../domain/user/user';

export const users = [
  {
    id: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'sden406@aucklanduni.ac.nz',
    displayName: 'Oliver',
    firstName: 'Oliver',
    lastName: 'Deng',
    role: UserRole.ADMIN,
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
  {
    id: '1f6d2f4c-3e4c-49c7-ba24-bc84e12baca9',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'wany583@aucklanduni.ac.nz',
    displayName: 'Ethan',
    firstName: 'Ethan',
    lastName: 'Wang',
    role: UserRole.ADMIN,
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
  {
    id: 'eb89d03a-57b8-4641-8298-2b39019a66f2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'yzhb603@aucklanduni.ac.nz',
    displayName: 'Monica',
    firstName: 'Monica',
    lastName: 'Zhang',
    role: UserRole.ADMIN,
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
  {
    id: '4587287f-2528-4f4b-8454-a78fa97dfa18',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'ywu644@aucklanduni.ac.nz',
    displayName: 'Philip',
    firstName: 'Philip',
    lastName: 'Wu',
    role: UserRole.ADMIN,
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
  {
    id: 'f3a2ba74-3336-4398-b7c8-a0032b5204dd',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'yil909@aucklanduni.ac.nz',
    displayName: 'Chucky',
    firstName: 'Chucky',
    lastName: 'Li',
    role: UserRole.ADMIN,
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
  {
    id: 'ed1a3647-536c-4aeb-842d-00cdbce5e509',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    email: 'cwon301@aucklanduni.ac.nz',
    displayName: 'Jenny',
    firstName: 'Jenny',
    lastName: 'Wong',
    role: UserRole.ADMIN,
    active: true,
    createdAt: DateTime.now().toMillis(),
    updatedAt: DateTime.now().toMillis(),
  },
];
