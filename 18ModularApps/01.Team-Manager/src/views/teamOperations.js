import { deleteDataFromServer, editDataToServer, endPoints, errorHandler,getDataFromServer } from "../data/api.js";

export async function removeMember(ctx){
    let token = endPoints.token();
    try{
        console.log(ctx.params.userId);
        
        let id=await findMemershipEntryId(ctx.params.teamId,ctx.params.userId);
        let delteMembershipResponse=await deleteDataFromServer(id,endPoints.memberStatus,token);
        ctx.page.redirect(`/browse/${ctx.params.teamId}`);
    }catch(error){
        ctx.renderNonFormError(error)
        errorHandler(error);
    }
    
    //
} 

async function findMemershipEntryId(teamId,userId){
    let allTeamMembers=await getDataFromServer(`data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
    let memBershipEntry=allTeamMembers.find((entry)=>entry._ownerId===userId);
    return memBershipEntry._id
}

export async function approveMember(ctx){
    let token = endPoints.token();
    try{
        console.log(ctx.params.userId);
        
        let id=await findMemershipEntryId(ctx.params.teamId,ctx.params.userId);
        let approveMembershipResponse=await editDataToServer({status:'member'},endPoints.memberStatus,id,token)
        let allTeamMembers=await getDataFromServer(`data/members?where=teamId%3D%22${ctx.params.teamId}%22&load=user%3D_ownerId%3Ausers`);
        
        ctx.page.redirect(`/browse/${ctx.params.teamId}`);
    }catch(error){
        ctx.renderNonFormError(error);
        errorHandler(error);
    }
    
    //
} 