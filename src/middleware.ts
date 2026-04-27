import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || '67d98d45b57b77aa30e7e9d707fb3092',
});

export const config = {
  matcher: [
    '/admin/((?!login).*)',
  ],
};
