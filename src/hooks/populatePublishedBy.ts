import type { CollectionBeforeChangeHook } from "payload";

export const populatePublishedBy: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === "create" || operation === "update") {
    if (req.user) {
      data.publishedBy = req.user.id;
      return data;
    }
  }

  return data;
};
