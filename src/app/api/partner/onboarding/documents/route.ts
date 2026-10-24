import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import PartnerDocs from "@/models/partnerDocs.model";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
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

    const formData = await req.formData();
    const nID = formData.get("nID") as Blob | null;
    const license = formData.get("license") as Blob | null;

    if (!nID || !license) {
      return Response.json(
        { message: "Missing required Documents" },
        { status: 400 },
      );
    }
    
    const updatePayload:any = {
        status: "pending",
    }

    if (nID){
        const url = await uploadOnCloudinary(nID);
        if(!url) {
            return Response.json(
                { message: "NID uploaded failed" },
                { status: 500 },
            )
        }
        updatePayload.nidImageUrl = url;
    }

    if (license){
        const url = await uploadOnCloudinary(license);
        if(!url) {
            return Response.json(
                { message: "License uploaded failed" },
                { status: 500 },
            )
        }
        updatePayload.drivingLicenseImageUrl = url;
    }

    const partnerDocs = await PartnerDocs.findOneAndUpdate(
        { owner: user._id },
        { $set: updatePayload },
        { upsert: true, new: true },
    );

    if(user.partnerOnBoardingStatus < 2) {
        user.partnerOnBoardingStatus = 2;    
    }

    await user.save();
    return Response.json(partnerDocs, { status: 200 });
    
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `Partner Document Error: ${error}` },
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

    const partnerDocs = await PartnerDocs.findOne({ owner: user._id });
    
    if(partnerDocs){
        return Response.json(partnerDocs, { status: 200 });
    } else {
        return null;
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: `Get Partner Document Error: ${error}` },
      { status: 500 },
    );
  }
}
