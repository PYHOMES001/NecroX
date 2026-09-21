import {requireUser} from "@/lib/request-user";export async function requireAdmin(request:Request){const user=await requireUser(request);return user?.role==="ADMIN"?user:null;}
