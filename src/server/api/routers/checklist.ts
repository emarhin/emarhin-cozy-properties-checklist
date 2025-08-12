/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const checklistRouter = createTRPCRouter({
  checkListItemToggle: publicProcedure
    .input(
      z.object({
        itemId: z.number(),
        roomId: z.number(),
        isPresent: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return;
    }),
});
