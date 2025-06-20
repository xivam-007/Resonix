import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export function getAuthSession() {
  return getServerSession(authOptions);
}
export { authOptions };

