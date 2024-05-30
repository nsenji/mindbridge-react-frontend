import localforage from "localforage";
import { jwtDecode } from "jwt-decode";

export default async function isValidToken(){
   const token = await localforage.getItem("currentUserToken");
    const decodedValue = jwtDecode(token);
    const userData = decodedValue.user;
    const timeNow = Math.floor(Date.now()/1000);
    return [decodedValue.exp > timeNow, userData];
}
