import { DateTime } from 'luxon';

export const boardSections = [
  // Team A Sprint 100
  {
    id: '425e5375-d288-44d9-9513-b7bbc824f8a2',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    name: 'Start',
    description:
      'Things that the team thinks would have a positive impact on the team if they were started.',
    order: 1,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
  {
    id: '1b7c84eb-1372-4158-87ce-6ad844c15778',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    name: 'Stop',
    description:
      'Things within the team’s workflow or process that aren’t helping the team to achieve their goals and should be stopped.',
    order: 2,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
  {
    id: '416c575d-29ae-40d2-9f36-f7b37851fb17',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    name: 'Continue',
    description:
      'Things that are already worked well in the previous iteration and should stay in the workflow.',
    order: 3,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
  // Team B Sprint 101
  {
    id: '86b17400-6ab4-4d9b-88c7-074c155634da',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    name: 'Start',
    description:
      'Things that the team thinks would have a positive impact on the team if they were started.',
    order: 1,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
  {
    id: '21a165fb-5841-477f-86cb-538d57264027',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    name: 'Stop',
    description:
      'Things within the team’s workflow or process that aren’t helping the team to achieve their goals and should be stopped.',
    order: 2,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
  {
    id: '475eb8ae-13e9-41de-9e6f-2faef09af9d5',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    name: 'Continue',
    description:
      'Things that are already worked well in the previous iteration and should stay in the workflow.',
    order: 3,
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
];
