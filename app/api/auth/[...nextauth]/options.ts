import { NextAuthOptions, DefaultSession, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// generate secret key in the terminal with the command openssl rand -base64 32

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "change later",
      clientSecret: process.env.GITHUB_SECRET || "change later",
      profile(profile) {
        let userRole = "Github User";

        if (profile?.email == "emre.ozdemir@metu.edu.tr") {
          userRole = "admin";
        }
        
        return {
          ...profile,
          role: userRole,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "change later",
      clientSecret: process.env.GOOGLE_SECRET || "change later",
      profile(profile) {
        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
    }),
  ],
  callbacks:{
    async jwt({token, user, account, profile,trigger, isNewUser,  session}){
      if(user) token.role = user.role;
      
      return token 
    },
    async session({session,token}: {session:Session, token:JWT}){
        if(session?.user) session.user.role = token.role;
        return session
    }
  }
};
