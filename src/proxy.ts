import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/students/:path*',
    '/admin/courses/:path*',
  ],
};
