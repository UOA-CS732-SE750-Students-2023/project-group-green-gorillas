import { useEffect, useState } from "react";
import { ACTIONITEMS_BY_ID } from "../api/api";
import { request } from "../api/request";
import { ActionItems } from "../types/actionItems";

export const useActionItems = (id: string) => {
    const[isLoading, setLoading] = useState<Boolean>(false);
    const [actionItems, setActionItems] = useState<ActionItems | null>(null);


    const getActionItems = async () => {
        setLoading(true)
        try{
            const {data} = await request.get<ActionItems>(ACTIONITEMS_BY_ID(id));
            setActionItems(data);
        }catch (error) {
            console.log(error); 
        }finally {
            setLoading(false);
        }
        
    };

    useEffect(()=>{
        (async () => {
            await getActionItems();
        })();
    },[]);

    return {
        getActionItems,
        actionItems,
        isLoading,
    };
};