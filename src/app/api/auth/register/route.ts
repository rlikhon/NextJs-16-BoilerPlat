import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectDb();
        const {name, email, password} = await request.json();
        const existingUser = await User.findOne({email});
        
        // Input Validation
        if(!name || !email || !password) {
            return NextResponse.json({
                message: "All fields are required",
                status: 400
            });
        }

        // Email regex format check 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return NextResponse.json({
                message: "Invalid email format",
                status: 400
            });
        }
        // Email Already Exists
        if(existingUser) {
            return NextResponse.json({
                message: "User already exists",
                status: 400
            });
        }
        // Password Length Check
        if(password.length < 6) {
            return NextResponse.json({
                message: "Password should be at least 6 characters",
                status: 400
            });
        }
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create User
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword
        });
        console.log(user);

        return NextResponse.json({
            data: user,
            message: "User created",
            status: 201
        });        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: `Register went wrong => ${error}`,
            status: 500
        });
    }
}