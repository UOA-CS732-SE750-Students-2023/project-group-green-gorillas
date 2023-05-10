import { useEffect, useState } from "react";
import { Rate } from "../types/rate";
import { request } from "../api/request";
import { RATE_BY_ID } from "../api/api";

export const useRate = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [rate, setRate] = useState<Rate | null>(null);

  const getRate = async () => {
    setLoading(true);
    try {
      const { data } = await request.get(RATE_BY_ID(id));
      setRate(data);
    //   console.log('retro rates',data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getRate();
    })();
  }, [id]);
  return {
    rate,
  };
};
