import React, { useMemo, useState } from "react";
import stageStyles from "../styles/stage.module.css";

import { DragDropContext } from "react-beautiful-dnd";

import GroupColumn from "./GroupColumn";
import { Box } from "@mui/material";
import { request } from "../../../../../api/request";
import {
  ADD_RETRO_NOTE,
  UPDATE_RETRO_NOTE_GROUP,
} from "../../../../../api/api";
import * as _ from "lodash";

enum BoardNoteType {
  NORMAL = "NORMAL",
  GROUP = "GROUP",
}

function Group({ retro }: any) {
  const retroWithGroupNotes = useMemo(() => {
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

      boardSection.groups = Object.values(groups);
      boardSection.boardNotes = normalNotes;
    });

    return clonedRetro;
  }, [retro]);

  const createNoteGroup = async (result: any) => {
    return request.post(ADD_RETRO_NOTE, {
      boardId: retro.id,
      boardSectionId: result.combine.droppableId,
      teamId: retro.teamId,
      boardNoteType: BoardNoteType.GROUP,
      boardNoteColor: "blue",
      note: "Group Note",
    });
  };

  const updateNoteParent = async (result: any, groupId: string) => {
    await Promise.all([
      request.patch(UPDATE_RETRO_NOTE_GROUP, {
        boardNoteId: result.combine.draggableId,
        parentNoteId: groupId,
        boardSectionId: result.combine.droppableId,
      }),
      request.patch(UPDATE_RETRO_NOTE_GROUP, {
        boardNoteId: result.draggableId,
        parentNoteId: groupId,
        boardSectionId: result.combine.droppableId,
      }),
    ]);
  };

  const destinationNoteGroup = (droppableId: string) => {
    let boardNoteGroup: any = null;

    retro.boardSections.forEach((boardSection: any) => {
      boardSection.boardNotes.forEach((boardNote: any) => {
        if (
          boardNote.id === droppableId &&
          boardNote.type === BoardNoteType.GROUP
        ) {
          boardNoteGroup = boardNote;
        }
      });
    });

    return boardNoteGroup;
  };

  const onDragEnd = async (result: any) => {
    if (result.combine) {
      const { data } = await createNoteGroup(result);
      return updateNoteParent(result, data.id);
    }

    if (result.destination) {
      const boardNoteGroup = destinationNoteGroup(
        result.destination.droppableId
      );
      if (boardNoteGroup) {
        return request.patch(UPDATE_RETRO_NOTE_GROUP, {
          boardNoteId: result.draggableId,
          parentNoteId: boardNoteGroup.id,
          boardSectionId: boardNoteGroup.boardSectionId,
        });
      }

      // TODO: re-order and move to different column
    }
  };

  return (
    <Box className={stageStyles.columns__wrapper} component="div">
      <DragDropContext onDragEnd={onDragEnd}>
        {retroWithGroupNotes.boardSections.map((section: any) => {
          return (
            <GroupColumn id={section.id} column={section} key={section.id} />
          );
        })}
      </DragDropContext>
    </Box>
  );
}

export default Group;
