import { useEffect, useState } from "react";
import { ACTIONITEMS_BY_ID } from "../api/api";
import { request } from "../api/request";

export const useActionItems = (id: string) => {
    const[isLoading, setLoading] = useState<Boolean>(false);
    const [actionItems, setActionItems] = useState(null);


    const getActionItems = async () => {
        setLoading(true)
        try{
            const {data} = await request.get(ACTIONITEMS_BY_ID(id));
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