import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function POST(request:Request){
  if(process.env.NODE_ENV==="production") return NextResponse.json({error:"Disabled in production"},{status:404});
  const body=await request.json();
  const email=String(body.email||"").trim().toLowerCase();
  if(!email) return NextResponse.json({error:"Email is required"},{status:400});
  const user=await db.user.upsert({where:{email},update:{name:body.name||undefined},create:{email,name:body.name||"NecroX Customer"}});
  return NextResponse.json({user,usage:"Send x-necrox-user with this email to authenticated development endpoints."});
}
