import connectDb from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: Request) {
    try {
        // 1. FIXED: Read the streaming body exactly ONCE at the very top
        const { email, otp } = await req.json();
        
        console.log("Incoming Verification Payload:", { email, otp });

        // 2. FIXED: Changed condition to || since BOTH are required to function
        if (!email || !otp) {
            return Response.json(
                { message: "Email and OTP are required." },
                { status: 400 }
            );
        }

        await connectDb();

        // 3. Search for the target shopper account context
        const user = await User.findOne({ email });
        if (!user) {
            return Response.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        // 4. Validate current confirmation status configurations
        if (user.isEmailVerified) {
            return Response.json(
                { message: "User is already verified." },
                { status: 400 }
            );
        }

        // 5. Evaluate token timestamp parameters
        if (!user.otpExpiresAt || user.otpExpiresAt < Date.now()) {
            return Response.json(
                { message: "OTP has expired." },
                { status: 400 }
            );
        }

        // 6. Match token strings securely
        if (!user.otp || user.otp !== otp) {
            return Response.json(
                { message: "Invalid OTP." },
                { status: 400 }
            );
        }

        // 7. Success logic: upgrade status and clear temporary credentials tokens
        user.isEmailVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        return Response.json(
            { message: "Email is verified successfully." },
            { status: 200 }
        );
        
    } catch (error: any) {
        console.error("OTP Processing Error Caught:", error);
        return Response.json(
            { message: `Error verifying Email: ${error.message || error}` },
            { status: 500 }
        );
    }
}
