import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";
const prisma = new PrismaClient();

const catalog = [
  { name:"VOID X1", slug:"void-x1", description:"A sculpted everyday performance sneaker built for responsive city movement.", price:799900, variants:[["Black","UK 7",12],["Black","UK 8",8],["Black","UK 9",4],["Graphite","UK 8",6]] },
  { name:"OBSIDIAN 02", slug:"obsidian-02", description:"A technical street runner with an aggressive low-profile silhouette.", price:949900, variants:[["Black","UK 7",7],["Black","UK 8",10],["Black","UK 9",5]] },
  { name:"PHANTOM R", slug:"phantom-r", description:"Future-focused cushioning and a monochrome upper for all-day wear.", price:1199900, variants:[["Bone","UK 7",4],["Bone","UK 8",8],["Black","UK 9",6]] }
];

async function main(){
  if(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length>=8){const email=process.env.ADMIN_EMAIL.toLowerCase();await prisma.user.upsert({where:{email},update:{role:"ADMIN",passwordHash:hashPassword(process.env.ADMIN_PASSWORD)},create:{email,name:"NecroX Admin",role:"ADMIN",passwordHash:hashPassword(process.env.ADMIN_PASSWORD)}});}

  const category=await prisma.category.upsert({where:{slug:"sneakers"},update:{},create:{name:"Sneakers",slug:"sneakers"}});
  for(const item of catalog){
    const product=await prisma.product.upsert({where:{slug:item.slug},update:{name:item.name,description:item.description,price:item.price,categoryId:category.id},create:{name:item.name,slug:item.slug,description:item.description,price:item.price,categoryId:category.id}});
    for(const [color,size,stock] of item.variants){
      const sku=`NX-${item.slug.toUpperCase()}-${String(color).toUpperCase()}-${String(size).replace(" ","")}`;
      await prisma.productVariant.upsert({where:{sku},update:{stock:Number(stock)},create:{sku,color:String(color),size:String(size),stock:Number(stock),productId:product.id}});
    }
  }
}
main().finally(()=>prisma.$disconnect());
