import  CredentialsProvider  from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import axios from "axios";


const authOptions: NextAuthOptions = {
    theme:{
      colorScheme:'light',
      logo:'../../../../../public/assets/images/generic-logo.png'
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

           const response = await axios.post(`https://backendabq.onrender.com/api/user/signin`, credentials)

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

   export default authOptions