import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { account_show } from '../../../../api';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: '503224493558-a4a14sn8oqtun95qp8d4t9mnh95nuqa0.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // if (user && user.email && user.email.split('@')[1] === 'g.skku.edu')
      return true;
      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      let role = null;
      let registered = false;

      try {
        if (!token.email) throw new Error('No email');
        const res = await account_show(token?.email);
        // console.log(res);
        const result = await res.json();
        // console.log(result);

        registered = true;

        if (result.admin === 'T' || result.admin === 'T') role = 'admin';
        else role = 'student';

        return { ...session, role, registered, student_id: result.student_id };
      } catch {
        return { ...session, role, registered };
      }
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
  secret: 'secret',
};

export default NextAuth(authOptions);
