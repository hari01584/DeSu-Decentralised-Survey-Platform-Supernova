import { getAuthenticatedDeSu  } from "./ii";

export async function getUser() {
    let actor = getAuthenticatedDeSu();
    let userdemographic = await actor.fetchDemographicRecord();
    return userdemographic;
}

const UNDEFINED_USER = {
    id : "undefined",
    name : "undefined",
    country : "undefined",
    age: parseInt(1),
    username : "undefined",
    email : "admin@admin.com",
    role : "COORDINATOR"
  };

export function demoToUser(res){
    if(!res){
        return UNDEFINED_USER;      
    }
    let user = {
        id : String(res.user),
        name : res.data["name"],
        country : res.data["country"],
        age: parseInt(res.data["age"]),
        username : res.data["name"],
        email : "admin@admin.com",
        role : "COORDINATOR"
      };
    return user;  
}