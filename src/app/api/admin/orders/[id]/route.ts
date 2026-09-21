import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const {id}=await params; const {status}=await request.json();
 if(!Object.values(OrderStatus).includes(status))return NextResponse.json({error:"Invalid order status"},{status:400});
 const order=await db.order.update({where:{id},data:{status}});
 return NextResponse.json({order});
}
