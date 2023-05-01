import { io } from "socket.io-client";
import { baseUrl, GET_RETRO } from "../api/api";
import { tokenService, TokenType } from "../services/tokenService";
import { useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { MainScreenPath } from "../components/screens/Main";
import { request } from "../api/request";
import * as _ from "lodash";

enum ClientSocketMessageEvent {
  AUTHENTICATION = "authentication",
  JOIN_RETRO_ROOM = "join-retro-room",
  RETRO_ROOM_USERS = "retro-room-users",
  BOARD = "board",
  BOARD_SECTION = "board-section",
  BOARD_NOTE = "board-note",
  BOARD_ACTION_ITEM = "board-action-item",
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
  const [retroUsers, setRetroUsers] = useState<any[]>([]);

  const errorRedirect = () => {
    window.location.href = `${MainScreenPath.TEAM}/${teamId}`;
  };

  const isLoading = useMemo(() => {
    return !hasSocketConnected || !hasJoinedRoom || !retro;
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

  const handleNoteUpdate = (data: any) => {
    setRetro((retro: any) => {
      if (!retro) return retro;

      const cloneRetro = _.cloneDeep(retro);

      const boardSection = cloneRetro.boardSections.find(
        (section: any) => section.id === data.boardSectionId
      );

      if (!boardSection) return cloneRetro;

      const boardSectionNoteIndex = boardSection.boardNotes.findIndex(
        (note: any) => note.id === data.id
      );

      if (boardSectionNoteIndex !== -1) {
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

      errorRedirect();
    });

    socket.on(ClientSocketMessageEvent.RETRO_ROOM_USERS, (payload: string) => {
      const data = JSON.parse(payload);
      setRetroUsers(data.users);
    });

    socket.on(ClientSocketMessageEvent.BOARD, (payload: string) => {
      const data = JSON.parse(payload);

      // TODO: philip to do
    });

    socket.on(ClientSocketMessageEvent.BOARD_SECTION, (payload: string) => {
      const data = JSON.parse(payload);

      // TODO: philip to do
    });

    socket.on(ClientSocketMessageEvent.BOARD_NOTE, (payload: string) => {
      const data = JSON.parse(payload);

      handleNoteEvent(data);
    });

    socket.on(ClientSocketMessageEvent.BOARD_ACTION_ITEM, (payload: string) => {
      const data = JSON.parse(payload);

      // TODO: philip to do
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

  useEffect(() => {
    if (hasJoinedRoom) {
      request
        .get(GET_RETRO(boardId, teamId))
        .then((result) => {
          setRetro(result.data);
        })
        .catch((_) => {
          errorRedirect();
        });
    }
  }, [hasJoinedRoom]);

  useEffect(() => {
    return () => {
      socket.emit(ServerSocketMessageEvent.LEAVE_RETRO_ROOM, boardId);
      socket.offAny();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      await authService.refreshToken();
      socket.connect();
    })();
  }, []);

  return {
    isLoading,
    retroUsers,
    retro,
  };
};
