import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const {id}=await params; const b=await request.json();
 const product=await db.product.update({where:{id},data:{name:b.name,description:b.description,price:b.price,active:b.active,categoryId:b.categoryId,modelUrl:b.modelUrl},include:{variants:true,images:true}});
 return NextResponse.json({product});
}
export async function DELETE(request:Request,{params}:{params:Promise<{id:string}>}){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const {id}=await params; await db.product.update({where:{id},data:{active:false}});
 return NextResponse.json({ok:true});
}
