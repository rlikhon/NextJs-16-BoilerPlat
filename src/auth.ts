import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {
                    type: "email",
                    label: "Email",
                    placeholder: "johndoe@gmail.com",
                },
                password: {
                    type: "password",
                    label: "Password",
                    placeholder: "*****",
                },
            },
            authorize: async (credentials, req) => {
                let user = null
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials")
                }
                await connectDb();
                user = await User.findOne({email: credentials.email});
                            
                if (!user) {
                    throw new Error("User does not exist");
                }
                const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password");
                }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })        
    ],
    callbacks: {
        signIn: async ({ user, account }) => {
            if(account?.provider === "google") {
                await connectDb();
                const existingUser = await User.findOne({email: user.email});
                if(!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        password: "",
                        role: "user"
                    })
                }

                user.id = existingUser._id;                
                user.role = existingUser.role;
            }
            
            if (user) {
                return true
            }
            return false
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.role = user.role
            }
            return token
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.name
                session.user.email = token.email as string
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET
})