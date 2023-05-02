import { useMemo } from "react";
import * as _ from "lodash";

enum BoardNoteType {
  NORMAL = "NORMAL",
  GROUP = "GROUP",
}

export const useAggregateRetro = (retro: any) => {
  return useMemo(() => {
    const clonedRetro = _.cloneDeep(retro);

    clonedRetro.boardSections.forEach((boardSection: any) => {
      const normalNotes = boardSection.boardNotes.filter(
        (boardNote: any) =>
          boardNote.type === BoardNoteType.NORMAL && !boardNote.parentId
      );

      const groups = boardSection.boardNotes
        .filter((boardNote: any) => boardNote.type === BoardNoteType.GROUP)
        .reduce((acc: any, note: any) => {
          acc[note.id] = {
            ...note,
            items: [],
          };
          return acc;
        }, {});

      boardSection.boardNotes
        .filter(
          (boardNote: any) =>
            boardNote.type === BoardNoteType.NORMAL && !!boardNote.parentId
        )
        .forEach((note: any) => {
          groups[note.parentId]?.items?.push(note);
        });

      boardSection.groups = Object.values(groups).filter(
        (group: any) => group.items.length !== 0
      );
      boardSection.boardNotes = normalNotes;
    });

    return clonedRetro;
  }, [retro]);
};
