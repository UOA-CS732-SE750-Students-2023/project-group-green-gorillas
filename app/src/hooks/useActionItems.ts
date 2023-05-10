import { useEffect, useState } from "react";
import { ACTIONITEMS_LIST_BY_ID, UPDATE_ACTIONITEMS_BY_ID, DELETE_ACTIONITEMS_BY_ID } from "../api/api";
import { request } from "../api/request";
import {User} from '../types/user';


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
    const[isLoading, setLoading] = useState<boolean>(false);
    const [actionItems, setActionItems] = useState<ActionItem[] | null>(null);

    // get action items from backend
    const getActionItems = async () => {
        setLoading(true)
        try{
            const {data} = await request.get<ActionItem[]>(ACTIONITEMS_LIST_BY_ID(id));
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
        try{
            await request.patch(UPDATE_ACTIONITEMS_BY_ID, {actionItemId: updatedActionItem.id, status: updatedActionItem.status} );
            // console.log('succes patch');

            await getActionItems();
   
            // const updatedActionItems = actionItems?.filter(a => a.id !== actionItem.id) ?? null;
            // console.log(updatedActionItems);
            
            // setActionItems(updatedActionItems);
            
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    };

    // delete action items 
    const deleteActionItems = async(actionItem: ActionItem) => {
        setLoading(true);
        try{
            await request.delete(DELETE_ACTIONITEMS_BY_ID(actionItem.id) );
            await getActionItems();

        }catch(err){
            console.log(err);
            
        }finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        (async () => {
            await getActionItems();
        })();
    },[id]);

    return {
        getActionItems,
        updateActionItems,
        deleteActionItems,
        actionItems,
        isLoading,
    };
};