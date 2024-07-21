
// import NextAuth from 'next-auth/next'
// import GoogleProvider from 'next-auth/providers/google'
// // import NextAuth from 'next-auth/next'

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   // other configurations like callbacks, pages, etc.
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// const handler = NextAuth({
//   providers:[
//     GoogleProvider({
//             clientId: process.env.GOOGLE_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//           }),
//         ],
//         secret: process.env.NEXTAUTH_SECRET,
// })

// export { handler as GET , handler as POST }

// import { NextAuthOptions } from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from 'next-auth/next';
import { authOptions } from './authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
