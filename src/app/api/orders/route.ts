import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/request-user";
export async function GET(request:Request){
 const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 const orders=await db.order.findMany({where:{userId:user.id},include:{items:true},orderBy:{createdAt:"desc"}});
 return NextResponse.json({orders});
}
export async function POST(request:Request){
 const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 try{
  const order=await db.$transaction(async tx=>{
   const cart=await tx.cart.findUnique({where:{userId:user.id},include:{items:{include:{variant:{include:{product:true}}}}}});
   if(!cart||cart.items.length===0)throw new Error("EMPTY_CART");
   for(const item of cart.items)if(item.variant.stock<item.quantity)throw new Error("OUT_OF_STOCK");
   const total=cart.items.reduce((sum,item)=>sum+item.variant.product.price*item.quantity,0);
   const created=await tx.order.create({data:{userId:user.id,total,items:{create:cart.items.map(item=>({variantId:item.variantId,productName:item.variant.product.name,sku:item.variant.sku,unitPrice:item.variant.product.price,quantity:item.quantity}))}},include:{items:true}});
   for(const item of cart.items)await tx.productVariant.update({where:{id:item.variantId},data:{stock:{decrement:item.quantity}}});
   await tx.cartItem.deleteMany({where:{cartId:cart.id}});
   return created;
  });
  return NextResponse.json({order},{status:201});
 }catch(e){const m=e instanceof Error?e.message:"";return NextResponse.json({error:m==="EMPTY_CART"?"Cart is empty":m==="OUT_OF_STOCK"?"One or more items are out of stock":"Could not create order"},{status:409});}
}
