import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";

export async function GET(request: Request) {
  try {
    await connectDb();
    const session = await auth();
    if (!session || !session.user) {
      return Response.json(
        { message: "User is not Unauthorized" },        
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 400 }
      );
    }

    return Response.json(
        user,
        { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: `Get User Error: ${error}` },
      { status: 500 }
    );
  }
}