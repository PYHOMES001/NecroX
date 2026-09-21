import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/request-user";
export async function GET(request:Request){
  const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const cart=await db.cart.findUnique({where:{userId:user.id},include:{items:{include:{variant:{include:{product:{include:{images:true}}}}}}}});
  return NextResponse.json({cart:cart||{items:[]}});
}
export async function POST(request:Request){
  const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {variantId,quantity=1}=await request.json(); const qty=Math.max(1,Number(quantity));
  const variant=await db.productVariant.findUnique({where:{id:variantId}});
  if(!variant||variant.stock<qty)return NextResponse.json({error:"Variant unavailable or insufficient stock"},{status:409});
  const cart=await db.cart.upsert({where:{userId:user.id},update:{},create:{userId:user.id}});
  const item=await db.cartItem.upsert({where:{cartId_variantId:{cartId:cart.id,variantId}},update:{quantity:{increment:qty}},create:{cartId:cart.id,variantId,quantity:qty}});
  return NextResponse.json({item},{status:201});
}
