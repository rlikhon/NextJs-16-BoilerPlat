import { auth } from "@/auth";
import connectDb from "@/lib/db";
import PartnerBank from "@/models/partnerBank.model";
import User from "@/models/user.model";
import type { NextRequest } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User Not Found" }, { status: 400 });
    }

    const {
      bankName,
      branchName,
      accountNumber,
      accountHolderName,
      routingNumber,
      mobile,
    } = await req.json();
    if (
      !bankName ||
      !branchName ||
      !accountNumber ||
      !accountHolderName ||
      !routingNumber ||
      !mobile
    ) {
      return Response.json(
        { message: "Missing required Bank details" },
        { status: 400 },
      );
    }

    const partnerBank = await PartnerBank.findOneAndUpdate(
      { owner: user._id },
      {
        $set: {
          bankName,
          branchName,
          accountNumber,
          accountHolderName,
          routingNumber,
          mobileNUmber: mobile,
          status: "added",
        },
      },
      { upsert: true, new: true },
    );

    user.mobileNumber = mobile;
    if (user.partnerOnBoardingSteps < 3) {
      user.partnerOnBoardingSteps = 3;
    }
    await user.save();

    return Response.json(partnerBank, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `Partner Bank Error: ${error}` },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 400 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User Not Found" }, { status: 400 });
    }

    const partnerBank = await PartnerBank.findOne({ owner: user._id });
    if(partnerBank){
        return Response.json(partnerBank, { status: 200 });
    } else {
        return null;
    }
    
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `Get Partner Bank Error: ${error}` },
      { status: 500 },
    );
  }
}
