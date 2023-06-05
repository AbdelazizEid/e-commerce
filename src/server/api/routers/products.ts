import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  //
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        price: z.string(),
        image: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          image: input.image,
          userId: input.userId,
        },
      });
    }),
  getProductsByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.product.findMany({
        where: {
          userId: input.userId,
        },
      })
    ),
  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
