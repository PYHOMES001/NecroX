import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const {id}=await params; const b=await request.json();
 if(b.stock!==undefined&&(!Number.isInteger(b.stock)||b.stock<0))return NextResponse.json({error:"Stock must be a non-negative integer"},{status:400});
 const variant=await db.productVariant.update({where:{id},data:{stock:b.stock,color:b.color,size:b.size}});
 return NextResponse.json({variant});
}
