import { useEffect, useState } from "react";
import { User } from "../types/user";
import { request } from "../api/request";
import { INPROGRESS_RETRO } from "../api/api";

export type InProgressRetro = {
  id: string;
  teamId: string;
  name: string;
  stage: string;
  createdByUser: User;
  createdAt: string;
};

type InProgressRetroResponse = {
  retro: InProgressRetro;
};

export const useInProgressRetro = (id: string) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [inProgressRetro, setInProgressRetro] =
    useState<InProgressRetro | null>(null);

  const getInProgressRetro = async () => {
    setLoading(true);
    try {
      const { data } = await request.get<InProgressRetroResponse>(
        INPROGRESS_RETRO(id)
      );
      setInProgressRetro(data.retro);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getInProgressRetro();
    })();
  }, [id]);

  return {
    inProgressRetro,
    loading,
  };
};
