import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // 1. Définition des fournisseurs d'identité (Ici, uniquement Google)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // 2. Stratégie de session (JWT est obligatoire pour les bases de données Serverless)
  session: {
    strategy: "jwt",
  },

  // 3. Callbacks (Pour récupérer l'ID unique de l'utilisateur pour notre base de données)
  callbacks: {
    async session({ session, token }) {
      // On attache l'ID unique de Google à la session de notre application
      if (session.user && token.sub) {
        // @ts-expect-error - Extension du type session par défaut de NextAuth
        session.user.id = token.sub;
      }
      return session;
    },
  },

  // 4. Clé de cryptage globale
  secret: process.env.NEXTAUTH_SECRET,
});

// Obligatoire pour le fonctionnement avec Next.js App Router
export { handler as GET, handler as POST };
