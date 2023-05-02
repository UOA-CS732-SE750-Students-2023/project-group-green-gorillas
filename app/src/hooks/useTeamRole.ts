import { useEffect, useState } from "react";
import { request } from "../api/request";
import { TEAM_ROLE_BY_ID } from "../api/api";


export const useTeamRole = (id: string) => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [teamRole, setTeamRole] = useState();
    const getTeamRole =async () => {
        setLoading(true);
        try{
            const {data} = await request.get(TEAM_ROLE_BY_ID(id));
            setTeamRole(data);
        }catch(err) {
            console.log(err);
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        (async () => {
            await getTeamRole();
        })();
    }, []);
    return {
        teamRole,
    };
};
