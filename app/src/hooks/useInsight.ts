import { useEffect, useState } from "react";
import { request } from "../api/request";
import { INSIGHT_BY_ID } from "../api/api";
import { Insight } from "../types/insights";

export const useInsight = (id: string) => {
    const [insightLoading, setInsightLoading] = useState<boolean>(false);
    const [insight, setInsight] = useState<Insight | null>(null);

    const getInsight = async () => {
        setInsightLoading(true);
        try{
            const { data} = await request.get<Insight>(INSIGHT_BY_ID(id));
            setInsight(data);
        }catch(error) {
            console.log(error);
        }finally {
            setInsightLoading(false);
        }
    };
    useEffect(() => {
        (async () => {
            await getInsight();
        })();
    }, []);

    return {
        getInsight,
        insight,
        insightLoading,
    };
};