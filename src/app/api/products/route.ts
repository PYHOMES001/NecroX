import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const maxPrice = Number(searchParams.get("maxPrice") || 0);
  const products = await db.product.findMany({
    where: {
      active: true,
      ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] } : {}),
      ...(maxPrice > 0 ? { price: { lte: maxPrice } } : {}),
    },
    include: { category: true, images: { orderBy: { sortOrder: "asc" } }, variants: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}
