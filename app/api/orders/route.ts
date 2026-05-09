// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const isAdmin = (session.user as any).role === "ADMIN";
    const userId = (session.user as any).id;

    const orders = await prisma.order.findMany({
      where: isAdmin ? {} : { userId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { items, totalAmount, orderType, customerName, phone, address } = body;

    if (!items || !totalAmount || !orderType || !customerName || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reference = `PG-${nanoid(10).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        ...(session ? { userId: (session.user as any).id } : {}),
        items,
        totalAmount,
        orderType,
        customerName,
        phone,
        address,
        reference,
        status: "PENDING",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
