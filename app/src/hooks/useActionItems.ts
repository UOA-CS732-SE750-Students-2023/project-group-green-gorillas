import { useEffect, useState } from "react";
import { ACTIONITEMS_BY_ID, UPDATE_ACTIONITEMS_BY_ID } from "../api/api";
import { request } from "../api/request";
// import { ActionItem, Status } from "../types/actionItems";
import {User} from '../types/user';
import { typeOf } from "react-is";


export enum ActionItemStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export type ActionItem = {
  id: string,
  note: string,
  status: ActionItemStatus,
  createdAt: string,
  assignees: User[],
};


export const useActionItems = (id: string) => {
    const[isLoading, setLoading] = useState<Boolean>(false);
    const [actionItems, setActionItems] = useState<ActionItem[] | null>(null);

    // get action items from backend
    const getActionItems = async () => {
        setLoading(true)
        try{
            const {data} = await request.get<ActionItem[]>(ACTIONITEMS_BY_ID(id));
            setActionItems(data);
        }catch (error) {
            console.log(error); 
        }finally {
            setLoading(false);
        }
    };

    // update action items to backend
    const updateActionItems = async (actionItem: ActionItem) => {
        setLoading(true);
        const updatedActionItem = {
            ...actionItem,
            status: ActionItemStatus.COMPLETED,
        };
        setActionItems(actionItems?.map((a) => {
            return a.id === actionItem.id ? updatedActionItem : a;
        }) ?? null);

        // const updatedActionItem.status: keyof typeof ActionItemStatus = 'COMPLETED';
        try{
            console.log(updatedActionItem.status);
            
            await request.patch(UPDATE_ACTIONITEMS_BY_ID, {actionItemId: updatedActionItem.id, status: updatedActionItem.status} );
        }catch(err){
            console.log(err);
        }finally{
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
        updateActionItems,
        actionItems,
        isLoading,
    };
};