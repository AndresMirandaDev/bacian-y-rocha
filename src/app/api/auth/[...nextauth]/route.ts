import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import axios from "axios";




export const authOptions: NextAuthOptions = {
    theme:{
      colorScheme:'light',
      logo:'../../../../../public/assets/images/cropped-logo-simelec-con-slogan.png'
    },
    providers:[
      CredentialsProvider({
        name:'Credentials',
        credentials:{
          email: { label:'Email', type:'email', placeholder: 'Email'},
          password: { label:'Password', type:'password', placeholder: 'Contraseña'},

        },

        async authorize (credentials, req) {

          if(!credentials?.email || !credentials.password) 
            return null;

           const response = await axios.post(`http://localhost:3005/api/user/login`, credentials)

          if(!response.data.accessToken)
            return null;

          return response.data.user  

        } 
      }),
    ],
    pages:{
      signIn:'/signin',

    },
    session:{
      strategy: 'jwt'
    },
    
   }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}