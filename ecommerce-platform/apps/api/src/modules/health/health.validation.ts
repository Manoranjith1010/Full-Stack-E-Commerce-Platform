import { z } from "zod";

export const healthQuerySchema = z.object({
  details: z.preprocess((value) => {
    if (value === undefined || value === "") {
      return false;
    }

    if (value === "true" || value === true) {
      return true;
    }

    if (value === "false" || value === false) {
      return false;
    }

    return value;
  }, z.boolean()),
});
