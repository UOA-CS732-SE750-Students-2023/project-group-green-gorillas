import { useEffect, useState } from "react";
import { request } from "../api/request";
import { TEAM_BY_ID } from "../api/api";
import { Team } from "../types/team";
import { User } from "../types/user";

type TeamWithMembers = Team & {
  teamMembers: User[];
};

export const useTeam = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [team, setTeam] = useState<TeamWithMembers | null>(null);

  const getTeam = async () => {
    setLoading(true);
    try {
      const { data } = await request.get<TeamWithMembers>(TEAM_BY_ID(id));
      setTeam(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   (async () => {
      await getTeam();
    })();
  }, []);

  return {
    getTeam,
    team,
    loading,
  };
};
