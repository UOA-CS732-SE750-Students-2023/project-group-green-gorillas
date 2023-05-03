import { io } from "socket.io-client";
import { baseUrl, GET_RETRO } from "../api/api";
import { tokenService, TokenType } from "../services/tokenService";
import { useEffect, useMemo, useState } from "react";
import { MainScreenPath } from "../components/screens/Main";
import { request } from "../api/request";
import * as _ from "lodash";
import { useCurrentUser } from "./useCurrentUser";
import { authService } from "../services/authService";

enum ClientSocketMessageEvent {
  AUTHENTICATION = "authentication",
  JOIN_RETRO_ROOM = "join-retro-room",
  RETRO_ROOM_USERS = "retro-room-users",
  BOARD = "board",
  BOARD_SECTION = "board-section",
  BOARD_NOTE = "board-note",
  BOARD_ACTION_ITEM = "board-action-item",
  BOARD_VOTE_NOTE = "board-vote-note",
}

enum ServerSocketMessageEvent {
  JOIN_RETRO_ROOM = "join-retro-room",
  LEAVE_RETRO_ROOM = "leave-retro-room",
}

const socket = io(baseUrl, {
  forceNew: true,
  autoConnect: false,
  auth: (cb) => {
    cb({ token: tokenService.getToken(TokenType.ACCESS_TOKEN) });
  },
});

export const useRetro = (boardId: string, teamId: string) => {
  const [hasSocketConnected, setHasSocketConnected] = useState<boolean>(false);
  const [hasJoinedRoom, setHasJoinedRoom] = useState<boolean>(false);
  const [retro, setRetro] = useState<any>(null);
  const [isLoadingRetroData, setIsLoadingRetroData] = useState<boolean>(true);
  const [retroUsers, setRetroUsers] = useState<any[]>([]);

  const { user } = useCurrentUser();

  const redirectToTeamDashboard = () => {
    window.location.href = `${MainScreenPath.TEAM}/${teamId}/dashboard`;
  };

  const isLoading = useMemo(() => {
    return (
      !hasSocketConnected || !hasJoinedRoom || !retro || isLoadingRetroData
    );
  }, [hasSocketConnected, hasJoinedRoom, retro]);

  // start event handlers --------------------------------------
  const handleNoteCreate = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const cloneRetro = _.cloneDeep(retro);

      const boardSection = cloneRetro.boardSections.find(
        (section: any) => section.id === data.boardSectionId
      );

      if (!boardSection) return cloneRetro;

      const boardSectionNote = boardSection.boardNotes.find(
        (note: any) => note.id === data.id
      );

      if (!boardSectionNote) {
        boardSection.boardNotes.push(data);
      }

      return cloneRetro;
    });
  };

  const handleNoteDelete = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const cloneRetro = _.cloneDeep(retro);

      const boardSection = cloneRetro.boardSections.find(
        (section: any) => section.id === data.boardSectionId
      );

      if (!boardSection) return cloneRetro;

      boardSection.boardNotes = boardSection.boardNotes.filter(
        (note: any) => note.id !== data.id
      );

      return cloneRetro;
    });
  };

  const findBoardSectionByBoardNoteId = (retro: any, boardNoteId: string) => {
    let result = null;
    retro.boardSections.forEach((boardSection: any) => {
      boardSection.boardNotes.forEach((boardNote: any) => {
        if (boardNote.id === boardNoteId) {
          result = boardNote.boardSectionId;
        }
      });
    });

    return result;
  };

  const handleNoteUpdate = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const cloneRetro = _.cloneDeep(retro);

      const existingBoardNoteBoardSectionId = findBoardSectionByBoardNoteId(
        retro,
        data.id
      );

      if (
        existingBoardNoteBoardSectionId &&
        data.boardSectionId !== existingBoardNoteBoardSectionId
      ) {
        const foundSection = cloneRetro.boardSections.find(
          (section: any) => section.id === existingBoardNoteBoardSectionId
        );

        foundSection.boardNotes = foundSection.boardNotes.filter(
          (s: any) => s.id !== data.id
        );

        const boardSection = cloneRetro.boardSections.find(
          (section: any) => section.id === data.boardSectionId
        );

        if (!boardSection) return cloneRetro;

        boardSection.boardNotes.push(data);

        return cloneRetro;
      }

      const boardSection = cloneRetro.boardSections.find(
        (section: any) => section.id === data.boardSectionId
      );

      if (!boardSection) return cloneRetro;

      const boardSectionNoteIndex = boardSection.boardNotes.findIndex(
        (note: any) => note.id === data.id
      );

      if (
        boardSectionNoteIndex !== -1 &&
        (user?.id !== data.createdBy ||
          boardSection.boardNotes[boardSectionNoteIndex].parentId !==
            data.parentId)
      ) {
        boardSection.boardNotes[boardSectionNoteIndex] = data;
      }

      return cloneRetro;
    });
  };

  const handleNoteEvent = (eventData: any) => {
    switch (eventData.type) {
      case "CREATE":
        handleNoteCreate(eventData.data);
        return;
      case "DELETE":
        handleNoteDelete(eventData.data);
      case "UPDATE":
        handleNoteUpdate(eventData.data);
    }
  };

  const handleNoteVoteCreate = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const cloneRetro = _.cloneDeep(retro);

      for (let boardSection of cloneRetro.boardSections) {
        for (let boardNote of boardSection.boardNotes) {
          if (
            boardNote.id === data.boardNoteId &&
            !boardNote.boardNoteVotes.find((vote: any) => vote.id === data.id)
          ) {
            boardNote.boardNoteVotes.push(data);
            break;
          }
        }
      }

      return cloneRetro;
    });
  };

  const handleNoteVoteDelete = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const cloneRetro = _.cloneDeep(retro);

      for (let boardSection of cloneRetro.boardSections) {
        for (let boardNote of boardSection.boardNotes) {
          if (boardNote.id === data.boardNoteId) {
            boardNote.boardNoteVotes = boardNote.boardNoteVotes.filter(
              (vote: any) => vote.id !== data.id
            );
            break;
          }
        }
      }

      return cloneRetro;
    });
  };

  const handleBoardNoteVote = (eventData: any) => {
    switch (eventData.type) {
      case "CREATE":
        handleNoteVoteCreate(eventData.data);
        return;
      case "DELETE":
        handleNoteVoteDelete(eventData.data);
        return;
    }
  };

  const handleActionItemCreate = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const clonedRetro = _.cloneDeep(retro);

      const actionItem = clonedRetro.actionItems.find(
        (item: any) => item.id === data.id
      );

      if (actionItem) return retro;

      clonedRetro.actionItems.push(data);

      return clonedRetro;
    });
  };

  const handleActionItemDelete = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const clonedRetro = _.cloneDeep(retro);

      clonedRetro.actionItems = clonedRetro.actionItems.filter(
        (item: any) => item.id !== data.id
      );

      return clonedRetro;
    });
  };

  const handleActionItemUpdate = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const clonedRetro = _.cloneDeep(retro);

      const actionItemIndex = clonedRetro.actionItems.findIndex(
        (item: any) => item.id === data.id
      );

      if (actionItemIndex !== -1 && data.updatedBy !== user?.id) {
        clonedRetro.actionItems[actionItemIndex] = data;
        return clonedRetro;
      }

      return retro;
    });
  };

  const handleActionItem = (eventData: any) => {
    switch (eventData.type) {
      case "CREATE":
        handleActionItemCreate(eventData.data);
        return;
      case "DELETE":
        handleActionItemDelete(eventData.data);
        return;
      case "UPDATE":
        handleActionItemUpdate(eventData.data);
        return;
    }
  };

  const handleBoardCreateEvent = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      return {
        ...retro,
        ...data,
      };
    });
  };

  const handleBoardDeleteEvent = (_: any) => {
    redirectToTeamDashboard();
  };

  const handleBoardEvent = (eventData: any) => {
    switch (eventData.type) {
      case "UPDATE":
        handleBoardCreateEvent(eventData.data);
        return;
      case "DELETE":
        handleBoardDeleteEvent(eventData.data);
        return;
    }
  };

  //end ------------------------------------------

  useEffect(() => {
    socket.on(ClientSocketMessageEvent.AUTHENTICATION, (payload: string) => {
      const { success } = JSON.parse(payload);

      setHasSocketConnected(success);
    });

    socket.on(ClientSocketMessageEvent.JOIN_RETRO_ROOM, (payload: string) => {
      const { success } = JSON.parse(payload);

      if (success) {
        setHasJoinedRoom(success);
        return;
      }

      redirectToTeamDashboard();
    });

    socket.on(ClientSocketMessageEvent.RETRO_ROOM_USERS, (payload: string) => {
      const data = JSON.parse(payload);
      setRetroUsers(data.users);
    });

    socket.on(ClientSocketMessageEvent.BOARD, (payload: string) => {
      const data = JSON.parse(payload);

      handleBoardEvent(data);
    });

    socket.on(ClientSocketMessageEvent.BOARD_SECTION, (payload: string) => {
      const data = JSON.parse(payload);

      // TODO: philip to do
    });

    socket.on(ClientSocketMessageEvent.BOARD_NOTE, (payload: string) => {
      const data = JSON.parse(payload);

      handleNoteEvent(data);
    });

    socket.on(ClientSocketMessageEvent.BOARD_VOTE_NOTE, (payload: string) => {
      const data = JSON.parse(payload);

      handleBoardNoteVote(data);
    });

    socket.on(ClientSocketMessageEvent.BOARD_ACTION_ITEM, (payload: string) => {
      const data = JSON.parse(payload);

      handleActionItem(data);
    });

    socket.on("disconnect", () => {
      setHasSocketConnected(false);
      setHasJoinedRoom(false);
      setRetro(null);
    });
  }, []);

  useEffect(() => {
    if (hasSocketConnected) {
      socket.emit(
        ServerSocketMessageEvent.JOIN_RETRO_ROOM,
        JSON.stringify({
          boardId,
          teamId,
        })
      );
    }
  }, [hasSocketConnected]);

  const getRetro = async () => {
    setIsLoadingRetroData(true);
    request
      .get(GET_RETRO(boardId, teamId))
      .then((result) => {
        setRetro(result.data);
        setIsLoadingRetroData(false);
      })
      .catch((_) => {
        redirectToTeamDashboard();
      });
  };

  useEffect(() => {
    if (hasJoinedRoom) {
      getRetro();
    }
  }, [hasJoinedRoom]);

  useEffect(() => {
    getRetro();
  }, [retro?.stage]);

  useEffect(() => {
    return () => {
      socket.emit(ServerSocketMessageEvent.LEAVE_RETRO_ROOM, boardId);
      socket.offAny();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await authService.refreshToken().catch(() => {
        // ignore refresh failure
      });
      socket.connect();
    })();
  }, []);

  return {
    isLoading,
    retroUsers,
    retro,
  };
};
