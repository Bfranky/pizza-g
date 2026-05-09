// app/api/orders/[id]/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { reference } = await req.json();

    // Verify with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await verifyRes.json();

    if (!data.status || data.data.status !== "success") {
      return NextResponse.json({ error: "Payment not successful" }, { status: 400 });
    }

    // Update order status
    const order = await prisma.order.update({
      where: { id },
      data: { status: "PREPARING", reference },
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
