import connectDb from "@/lib/db";
import sendMail from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    let user = null;
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
        
        // Email Already Exists and OTP verified
        if(existingUser && existingUser.isEmailVerified) {
            return NextResponse.json({
                message: "Verified User already exists.",
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
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
                
        // Email Already Exists But not OTP verified
        if(existingUser && !existingUser.isEmailVerified) {            
            existingUser.otp = otp;
            existingUser.otpExpiresAt = otpExpiresAt;

            user = await existingUser.save();
        } else {
            // Create User
            user = await User.create({
                name, 
                email, 
                password: hashedPassword,
                otp,
                otpExpiresAt
            });            
        }

        await sendMail(
            email,
            "Your OTP for DriveFlow Registration email verification",
            `<h2>Your Email varification OTP is <strong>${otp}</strong></h2>`
        );
        
        console.log("Created User => ", user);
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