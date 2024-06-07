import localforage from "localforage";
import { jwtDecode } from "jwt-decode";

export default async function isValidToken() {
  const token = await localforage.getItem("currentUserToken");
  if (token == null) {
    return [false, {}];
  }
  const decodedValue = jwtDecode(token);
  const userData = decodedValue.user;
  const timeNow = Math.floor(Date.now() / 1000);
  return [decodedValue.exp > timeNow, userData];
}
