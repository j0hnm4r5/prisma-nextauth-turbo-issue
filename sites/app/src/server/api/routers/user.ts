import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
	// ========= CREATE =========

	// user creation is handled by the next-auth automatically

	// ========= READ =========

	// get the user object for the current user
	me: protectedProcedure.query(({ ctx }) =>
		ctx.prisma.user.findUnique({
			where: {
				id: ctx.session.user.id,
			},
		})
	),

	// get the sessions for the current user
	mySessions: protectedProcedure.query(({ ctx }) =>
		ctx.prisma.session.findMany({ where: { userId: ctx.session.user.id } })
	),

	// ========= UPDATE =========

	// update current user
	updateMe: protectedProcedure
		.input(z.object({ name: z.string().optional(), image: z.string().nullish() }))
		.mutation(({ ctx, input }) => {
			const { ...data } = input;
			return ctx.prisma.user.update({
				where: {
					id: ctx.session.user.id,
				},
				data,
			});
		}),

	// ========= DELETE =========

	// delete current user
	deleteMe: protectedProcedure.mutation(({ ctx }) =>
		ctx.prisma.user.delete({
			where: {
				id: ctx.session.user.id,
			},
		})
	),
});
