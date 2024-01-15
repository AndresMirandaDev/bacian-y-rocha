import  CredentialsProvider  from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import axios from "axios";
import * as bcrypt from 'bcrypt'
import prisma from "../../../prisma/client";


const authOptions: NextAuthOptions = {
    theme:{
      colorScheme:'light',
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

           const user = await prisma.user.findUnique({
            where: {email : credentials.email }
           })

           if(!user) return null

           const passwordMatch = await bcrypt.compare(credentials.password, user.password)
           
           const {email, id, image, phone,role,name} = user
           const signedUser = {
            id,
            name,
            email,
            image,
            phone,
            role
           }

           return passwordMatch ? signedUser : null

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

   export default authOptions