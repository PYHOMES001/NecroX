import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
export async function GET(request:Request){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const orders=await db.order.findMany({include:{user:{select:{id:true,name:true,email:true}},items:true},orderBy:{createdAt:"desc"}});
 return NextResponse.json({orders});
}
