import { useEffect, useState } from "react";
import { request } from "../api/request";
import { RETROLIST_BY_ID } from "../api/api";
import { User } from "../types/user";

export type RetroList = {
  id: string;
  name: string;
  createdAt: string;
  assignees: User[];
};

export const useRetroHistory = (id: string) => {
  const [loading, setLoadingg] = useState<Boolean>(false);
  const [retroList, setRetroList] = useState<RetroList[] | null>(null);

  const getRetroList = async () => {
    setLoadingg(true);
    try {
      const { data } = await request.get<RetroList[] | null>(
        RETROLIST_BY_ID(id)
      );
      // console.log('retro history', data);

      setRetroList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingg(false);
    }
  };
  useEffect(() => {
    (async () => {
      if (id) {
        await getRetroList();
      }
    })();
  }, [id]);

  return {
    retroList,
    getRetroList,
  };
};
