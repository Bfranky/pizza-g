// components/home/OpenStatus.tsx
import { prisma } from "@/lib/prisma";

async function getStatus() {
  try {
    const settings = await prisma.businessSettings.findFirst();
    return settings;
  } catch {
    return null;
  }
}

export default async function OpenStatus() {
  const settings = await getStatus();
  if (!settings) return null;

  const isOpen = settings.isOpen;

  return (
    <div className={`py-3 text-center text-sm font-semibold tracking-wide ${isOpen ? "bg-green-600" : "bg-gray-700"} text-white`}>
      {isOpen ? (
        <span>✅ We are OPEN today — {settings.openTime} to {settings.closeTime} · Call {" "}
          <a href="tel:08063645052" className="underline hover:no-underline">0806 364 5052</a>
          {" "}to reserve a table
        </span>
      ) : (
        <span>🔴 We are currently CLOSED — We'll be back at {settings.openTime}</span>
      )}
    </div>
  );
}
