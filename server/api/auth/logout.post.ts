import { deleteCookie } from "h3";

export default defineEventHandler((event) => {
  deleteCookie(event, "auth_token", { path: "/" });
  return { message: "Logged out successfully" };
});
