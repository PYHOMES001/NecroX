import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug, active: true },
    include: { category: true, images: { orderBy: { sortOrder: "asc" } }, variants: true, reviews: { include: { user: { select: { name: true } } } } },
  });
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ product });
}
