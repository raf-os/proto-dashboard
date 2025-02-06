import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { User } from "@/lib/defs";

export const { handlers, signIn, signOut, auth } = NextAuth ({
    pages: {
        signIn: '/',
    },
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;

                const { USER_LOGIN, USER_PW } = process.env;

                if (!USER_LOGIN || ! USER_PW) {
                    throw new Error("User credentials not set or incorrectly set in environment variables.");
                }

                if (
                    credentials.username == USER_LOGIN &&
                    credentials.password == USER_PW
                ) {
                    user = {
                        id: "1",
                        name: (credentials.username as string),
                        password: (credentials.password as string),
                    } satisfies User;
                    return user;
                }

                return null;
            }
        }),
    ],
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
    },
});