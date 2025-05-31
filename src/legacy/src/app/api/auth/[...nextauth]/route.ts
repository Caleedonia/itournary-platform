import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Simple test user with plain text password for development
const TEST_USER = {
  id: "test-user-1",
  name: "Test User",
  email: "test@example.com",
  password: "password123", // Plain text for simplicity in development only
  role: "member"
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Simple check for test user
          if (credentials?.email === TEST_USER.email && 
              credentials?.password === TEST_USER.password) {
            console.log("Test user login successful");
            return {
              id: TEST_USER.id,
              name: TEST_USER.name,
              email: TEST_USER.email,
              role: TEST_USER.role
            };
          }
          
          // If we reach here, authentication failed
          console.log("Authentication failed");
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/directlogin",
    error: "/directlogin"
  },
  secret: process.env.NEXTAUTH_SECRET || "test-secret-do-not-use-in-production",
  debug: true
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
