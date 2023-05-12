import {
  BoardNoteColor,
  BoardNoteType,
} from '../../../domain/board-note/board-note';
import { DateTime } from 'luxon';

export const boardNotes = [
  {
    id: '825e7fb9-712f-4714-aa0c-6cf7ba75cf10',
    boardSectionId: '425e5375-d288-44d9-9513-b7bbc824f8a2',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.yellow,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note A',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
  },
  {
    id: '4abea5d1-50a2-4c19-967b-925bdfdbe3b3',
    boardSectionId: '425e5375-d288-44d9-9513-b7bbc824f8a2',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.blue,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note B',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: '1f6d2f4c-3e4c-49c7-ba24-bc84e12baca9',
  },
  {
    id: 'ff65c3ac-0c23-4051-a849-f2c530004d86',
    boardSectionId: '1b7c84eb-1372-4158-87ce-6ad844c15778',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.PINK,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note C',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'eb89d03a-57b8-4641-8298-2b39019a66f2',
  },
  {
    id: '4a19d8c7-dcae-4673-b83f-afe5e57f513f',
    boardSectionId: '1b7c84eb-1372-4158-87ce-6ad844c15778',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.yellow,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note D',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: '4587287f-2528-4f4b-8454-a78fa97dfa18',
  },
  {
    id: '2bc9ed5e-c5ef-43e9-8027-2b7fd2c558c3',
    boardSectionId: '416c575d-29ae-40d2-9f36-f7b37851fb17',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.blue,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note E',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'f3a2ba74-3336-4398-b7c8-a0032b5204dd',
  },
  {
    id: 'f387a2a3-5ef7-4ae9-9f79-d8a7a03d0766',
    boardSectionId: '416c575d-29ae-40d2-9f36-f7b37851fb17',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.PINK,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note F',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'ed1a3647-536c-4aeb-842d-00cdbce5e509',
  },
  {
    id: '94e7ffad-dff9-43cd-b742-995a5bc6574b',
    boardSectionId: '416c575d-29ae-40d2-9f36-f7b37851fb17',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.yellow,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note G',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'd9530a7c-08dd-4d58-9bdd-a7de4ee2df16',
  },
  {
    id: '7326aa77-7378-472a-bc8f-7c9a6c475681',
    boardSectionId: '416c575d-29ae-40d2-9f36-f7b37851fb17',
    boardId: '93256f47-fd61-4d33-add7-068111cafba0',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: 'b0275fd6-284d-4c4c-b1ea-c364f8252644',
    color: BoardNoteColor.blue,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note H',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
  // divider
  {
    id: '4bc7fdf7-4152-4994-ae3c-0f74ec561e7f',
    boardSectionId: '86b17400-6ab4-4d9b-88c7-074c155634da',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.yellow,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note A',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
  },
  {
    id: '2814f3a1-cc33-4b72-94ab-77a6d36c757e',
    boardSectionId: '86b17400-6ab4-4d9b-88c7-074c155634da',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.blue,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note B',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: '1f6d2f4c-3e4c-49c7-ba24-bc84e12baca9',
  },
  {
    id: 'df190e70-1b9b-41e7-8675-b66350750292',
    boardSectionId: '21a165fb-5841-477f-86cb-538d57264027',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.PINK,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note C',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'eb89d03a-57b8-4641-8298-2b39019a66f2',
  },
  {
    id: 'b846850f-08c5-4366-8893-ed0b3b487fc4',
    boardSectionId: '21a165fb-5841-477f-86cb-538d57264027',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.yellow,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note D',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: '4587287f-2528-4f4b-8454-a78fa97dfa18',
  },
  {
    id: '23f0d109-7c53-4d3e-a774-cb3c85905ba4',
    boardSectionId: '475eb8ae-13e9-41de-9e6f-2faef09af9d5',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.blue,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note E',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'f3a2ba74-3336-4398-b7c8-a0032b5204dd',
  },
  {
    id: 'e39e4c6e-e54e-4dd2-8e5d-0a755d456bcd',
    boardSectionId: '475eb8ae-13e9-41de-9e6f-2faef09af9d5',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.PINK,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note F',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'ed1a3647-536c-4aeb-842d-00cdbce5e509',
  },
  {
    id: 'e6a1f927-2d30-46c8-b7e0-c2c67309283a',
    boardSectionId: '475eb8ae-13e9-41de-9e6f-2faef09af9d5',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.yellow,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note G',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'd9530a7c-08dd-4d58-9bdd-a7de4ee2df16',
  },
  {
    id: '4de4ed8f-255e-47f7-ad65-fc089c575b6f',
    boardSectionId: '475eb8ae-13e9-41de-9e6f-2faef09af9d5',
    boardId: '1d8dc2b7-5976-4a9c-a5b6-0591ca5b2ef2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    teamId: '86144d5b-81fa-4556-b0d6-01b0f4836512',
    color: BoardNoteColor.blue,
    type: BoardNoteType.NORMAL,
    parentId: null,
    note: 'This is Note H',
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: 'a59111ae-2fac-49f3-a16d-217f2ff2ac75',
  },
];
