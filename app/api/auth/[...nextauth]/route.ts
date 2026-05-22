import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// --- EXTENSION DE TYPE (MODULE AUGMENTATION) ---
// Au lieu de forcer TypeScript à ignorer l’erreur, nous lui apprenons
// que notre session contient un ID souverain lié à la base de données.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  // 1. DÉFINITION DES FOURNISSEURS D’IDENTITÉ
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // 2. STRATÉGIE DE SESSION (JWT obligatoire pour notre architecture Serverless)
  session: {
    strategy: "jwt",
  },

  // 3. CALLBACKS (Injection de l’ID unique dans la session)
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // TypeScript reconnaît maintenant cette propriété. Plus de "ts-expect-error".
        session.user.id = token.sub;
      }
      return session;
    },
  },

  // 4. SÉCURITÉ CRYPTOGRAPHIQUE GLOBALE
  secret: process.env.NEXTAUTH_SECRET,
});

// Exportation obligatoire pour le routage App Router de Next.js
export { handler as GET, handler as POST };
