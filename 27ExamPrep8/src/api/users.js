import { clearUserData, getUserData, setUserData } from "../utils.js";
import { get, post } from "./api.js";

export async function login(email,password){
    let result = await post(`/users/login`,{email,password});

    let userData={
        email:result.email,
        gender:result.gender,
        accessToken:result.accessToken,
        id:result._id,
        username:result.username
    }
    
    setUserData(userData)

}

export async function register(username,email,password,gender){
    let dataForSubmit={username,email,password,gender}
    let result = await post(`/users/register`,dataForSubmit);

    let userData={
        email:result.email,
        gender:result.gender,
        accessToken:result.accessToken,
        id:result._id,
        username:result.username
    }
    
    setUserData(userData)

}

export function logout(){
    get('/users/logout',getUserData().accessToken)
    clearUserData();
}



