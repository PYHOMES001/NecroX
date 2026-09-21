import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
export async function GET(request:Request){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 return NextResponse.json({categories:await db.category.findMany({orderBy:{name:"asc"}})});
}
export async function POST(request:Request){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const {name,slug}=await request.json(); if(!name||!slug)return NextResponse.json({error:"name and slug required"},{status:400});
 return NextResponse.json({category:await db.category.create({data:{name,slug}})},{status:201});
}
