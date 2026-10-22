import connectDb from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDb();
    const session = await auth();
    if(!session){
        return Response.json(
            { message:"Unauthorized" }
            , { status:400 }
        )
    }

    const user = await User.findOne({email:session.user.email})
    if (!user) {
        return Response.json(
            { message: "User Not Found"}
            ,{ status: 400 }
        )
    }

    const { type, number, vehicleModel } = await req.json();
    if (!type || !number || !vehicleModel) {
        return Response.json(
            { message: "Missing required detels" }
            ,{ status: 400 }
        )
    }
  } catch (error) {
    console.log(error)
  }
}
