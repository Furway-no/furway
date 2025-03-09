import type { AccessArgs } from "payload";

import type { User } from "@/payload-types";

type isAdministrator = (args: AccessArgs<User>) => boolean;

export const administrator: isAdministrator = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.role === "developer") return true;
  return false;
};
