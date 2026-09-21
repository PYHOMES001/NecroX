import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin";
export async function GET(request:Request){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const products=await db.product.findMany({include:{category:true,images:true,variants:true},orderBy:{createdAt:"desc"}});
 return NextResponse.json({products});
}
export async function POST(request:Request){
 if(!await requireAdmin(request))return NextResponse.json({error:"Forbidden"},{status:403});
 const b=await request.json();
 if(!b.name||!b.slug||!b.description||!Number.isInteger(b.price)||!b.categoryId)return NextResponse.json({error:"name, slug, description, price in paise, and categoryId are required"},{status:400});
 const product=await db.product.create({data:{name:b.name,slug:b.slug,description:b.description,price:b.price,categoryId:b.categoryId,modelUrl:b.modelUrl||null,active:b.active??true,images:{create:(b.images||[]).map((x:any,i:number)=>({url:x.url,alt:x.alt||b.name,sortOrder:i}))},variants:{create:(b.variants||[]).map((v:any)=>({sku:v.sku,color:v.color,size:v.size,stock:Number(v.stock)||0}))}},include:{images:true,variants:true}});
 return NextResponse.json({product},{status:201});
}
