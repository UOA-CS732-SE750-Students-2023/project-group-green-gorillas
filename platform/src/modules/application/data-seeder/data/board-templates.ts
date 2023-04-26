import { DateTime } from 'luxon';
import { SYSTEM_USER_ID } from '../../../../constants/system-user-id';

export const boardTemplates = [
  {
    id: 'b5a5ef76-b1e4-41d0-be40-8c1d8c305122',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    name: 'Start, Stop, Continue',
    description: 'Come up with practical ideas for team based improvement.',
    descriptionLong:
      'When you want to get down to the fundamentals, Start Stop Continue is a simple technique for an action-oriented retrospective meeting that encourages participants to come up with practical ideas for team-based improvement and action items you implement right away.',
    boardTemplateSections: [
      {
        name: 'Start',
        description:
          'Things that the team thinks would have a positive impact on the team if they were started.',
        order: 1,
      },
      {
        name: 'Stop',
        description: `Things within the team’s workflow or process that aren’t helping the team to achieve their goals and should be stopped.`,
        order: 2,
      },
      {
        name: 'Continue',
        description:
          'Things that are already worked well in the previous iteration and should stay in the workflow.',
        order: 3,
      },
    ],
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: '1f6d2f4c-3e4c-49c7-ba24-bc84e12baca9',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    name: `Went Well, Didn't go Well`,
    description: `Focus on your team's strengths and weaknesses.`,
    descriptionLong:
      "The what went well, what didn't go well retrospective technique keeps teams focused on their activities over the prior iteration and how they can boost their efficiency and productivity to drive continuous improvement. The exercise helps focus the discussion and is a great tool for new and developing teams to improve performance and quality the next iteration of a project.",
    boardTemplateSections: [
      {
        name: `That Went Well`,
        description:
          'Things that the team thinks went well over the prior iteration.',
        order: 1,
      },
      {
        name: `That Didn't go Well`,
        description: `Things that the team thinks didn't go well over the prior iteration.`,
        order: 2,
      },
    ],
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: 'eb89d03a-57b8-4641-8298-2b39019a66f2',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    name: 'Mad, Sad, Glad',
    description: 'Figure out how the team is currently feeling.',
    descriptionLong:
      "Use the Mad Sad Glad retrospective template to check on your team's emotional wellbeing. Allow your team members to analyze the positive and negative emotions they may have experienced during past projects. The mad sad glad template will allow you to build a positive team dynamic that will improve communication and increase productivity in the long run.",
    boardTemplateSections: [
      {
        name: 'Glad',
        description:
          'Things that made the team happy and excited in the last iteration.',
        order: 1,
      },
      {
        name: 'Mad',
        description:
          'Things that the team found frustrating in the last iteration.',
        order: 3,
      },
      {
        name: 'Sad',
        description:
          'Things that the team found disappointing in the last iteration.',
        order: 2,
      },
    ],
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: SYSTEM_USER_ID,
  },
  {
    id: '4587287f-2528-4f4b-8454-a78fa97dfa18',
    organisationId: '53eec30c-db79-474a-83cd-5c0ae42cca2b',
    name: 'Blank Retrospective',
    description: 'Create your own retro.',
    descriptionLong:
      'You can create your own retrospective then add your retro columns by own at the beginning of the retrospective',
    boardTemplateSections: [],
    updatedAt: DateTime.now().toMillis(),
    createdAt: DateTime.now().toMillis(),
    createdBy: SYSTEM_USER_ID,
  },
];
