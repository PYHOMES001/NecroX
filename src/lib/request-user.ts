import { db } from "@/lib/db";
export async function requireUser(request:Request){
  const email=request.headers.get("x-necrox-user")?.trim().toLowerCase();
  if(!email) return null;
  return db.user.findUnique({where:{email}});
}
