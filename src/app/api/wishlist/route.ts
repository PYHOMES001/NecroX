import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/request-user";
export async function GET(request:Request){
 const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 const wishlist=await db.wishlist.findUnique({where:{userId:user.id},include:{items:{include:{product:{include:{images:true,variants:true}}}}}});
 return NextResponse.json({wishlist:wishlist||{items:[]}});
}
export async function POST(request:Request){
 const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 const {productId}=await request.json(); const product=await db.product.findUnique({where:{id:productId}});
 if(!product)return NextResponse.json({error:"Product not found"},{status:404});
 const wishlist=await db.wishlist.upsert({where:{userId:user.id},update:{},create:{userId:user.id}});
 const item=await db.wishlistItem.upsert({where:{wishlistId_productId:{wishlistId:wishlist.id,productId}},update:{},create:{wishlistId:wishlist.id,productId}});
 return NextResponse.json({item},{status:201});
}
export async function DELETE(request:Request){
 const user=await requireUser(request); if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
 const {productId}=await request.json(); const wishlist=await db.wishlist.findUnique({where:{userId:user.id}});
 if(wishlist)await db.wishlistItem.deleteMany({where:{wishlistId:wishlist.id,productId}});
 return NextResponse.json({ok:true});
}
