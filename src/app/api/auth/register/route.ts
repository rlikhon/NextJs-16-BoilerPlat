// 📁 src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import sendMail from "@/lib/sendMail";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

// ✨ AUTO-IMPORT: Pull in your brand new modular helper methods
import { isValidEmail, generateOtp, calculateOtpExpiry } from "@/utils/Helper";

export async function POST(request: NextRequest) {
    let user = null;
    try {
        await connectDb();
        const { name, email, password } = await request.json();
        
        // 1. Core input sweep
        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // 2. ✨ CLEAN UTILITY USE: Super clean format check rule
        if (!isValidEmail(email)) {
            return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isEmailVerified) {
            return NextResponse.json({ message: "Verified User already exists." }, { status: 400 });
        }
        
        if (password.length < 6) {
            return NextResponse.json({ message: "Password should be at least 6 characters" }, { status: 400 });
        }

        // 3. ✨ CLEAN UTILITY USE: Generate data structures natively from helpers
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp();
        const otpExpiresAt = calculateOtpExpiry(10); // 10 minutes duration configuration
                
        if (existingUser && !existingUser.isEmailVerified) {            
            existingUser.otp = otp;
            existingUser.otpExpiresAt = otpExpiresAt;
            existingUser.password = hashedPassword;
            user = await existingUser.save();
        } else {
            user = await User.create({ name, email, password: hashedPassword, otp, otpExpiresAt });            
        }

        await sendMail(
            email,
            "Your OTP for DriveFlow Registration email verification",
            `<h2>Your Email verification OTP is <strong>${otp}</strong></h2>`
        );
        
        return NextResponse.json({ data: user, message: "User created" }, { status: 201 });  

    } catch (error: any) {
        console.error("Critical registration backend crash:", error);
        return NextResponse.json({ message: `Register went wrong => ${error.message || error}` }, { status: 500 });
    }
}
