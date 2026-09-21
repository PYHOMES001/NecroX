import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/request-user";
export async function DELETE(request:Request,{params}:{params:Promise<{itemId:string}>}){
 const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 const {itemId}=await params; const item=await db.cartItem.findFirst({where:{id:itemId,cart:{userId:user.id}}});
 if(!item)return NextResponse.json({error:"Cart item not found"},{status:404});
 await db.cartItem.delete({where:{id:item.id}}); return NextResponse.json({ok:true});
}
