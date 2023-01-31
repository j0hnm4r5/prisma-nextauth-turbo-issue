// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "database";

import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}

			return session;
		},
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prismaClient),
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: "Username", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
	
				if (user) {
					return user
				} else {
					return null
				}
			}
		})
	],
	events: {
		createUser: async (message) => {
			// create a personal workspace for the user
			const workspace = await prismaClient.workspace.create({
				data: {
					name: `${message.user.name}'s Workspace`,
					type: "PERSONAL",
				},
			});

			// connect the user to the workspace
			await prismaClient.user_X_Workspace.create({
				data: {
					user_id: message.user.id,
					workspace_id: workspace.id,
				},
			});
		},
	},
};

export default NextAuth(authOptions);
