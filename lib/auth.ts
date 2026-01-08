import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.BASE_API_URL}/users/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (!data.status) {
          throw new Error(data.message);
        }

        const user = {
          ...data.data,
          accessToken: data.data.token,
          name: data.data.full_name,
        };
        return user;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      if (!isLoggedIn && request.nextUrl.pathname.startsWith("/dashboard")) {
        const loginUrl = new URL("/login", request.nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.href); // ✅ important
        return Response.redirect(loginUrl);
      }
      return true;
    },

    async jwt({ token, user }) {
      // On first login, merge user data into token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.accessToken = user.accessToken; // 👈 save to JWT
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name;
        session.user.accessToken = token.accessToken as string; // 👈 expose to session
      }
      return session;
    },

    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        if (
          profile &&
          typeof profile.email === "string" &&
          typeof profile.email_verified !== "undefined" &&
          profile.email_verified
        ) {
          try {
            const res = await fetch(
              `${process.env.BASE_API_URL}/users/social-login`,
              {
                method: "POST",
                body: JSON.stringify({
                  social_id: account.providerAccountId,
                  email: profile.email,
                  full_name: profile.name,
                }),
                headers: { "Content-Type": "application/json" },
              }
            );

            if (!res.ok) {
              throw new Error(res.statusText);
            }

            const data = await res.json();
            user.accessToken = data.data.token;
            user.role = data.data.role;
            return true;
          } catch (error) {
            console.log(error);
            return false;
          }
        }
        return false; // Reject if profile or email is missing
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },

  // session: { strategy: "jwt", maxAge: 86400 },

  pages: {
    signIn: "/login",
  },
});
