// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { FiShoppingBag, FiList, FiStar, FiDollarSign } from "react-icons/fi";

async function getStats() {
  try {
    const [totalOrders, pendingOrders, totalRevenue, menuItems, pendingReviews] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.aggregate({ _sum: { totalAmount: true }, where: { status: { not: "CANCELLED" } } }),
      prisma.menuItem.count(),
      prisma.review.count({ where: { approved: false } }),
    ]);

    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { user: { select: { name: true } } },
    });

    return {
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue._sum.totalAmount ?? 0,
      menuItems,
      pendingReviews,
      recentOrders,
    };
  } catch {
    return { totalOrders: 0, pendingOrders: 0, totalRevenue: 0, menuItems: 0, pendingReviews: 0, recentOrders: [] };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Orders", value: stats.totalOrders, icon: FiList, color: "bg-blue-500", sub: `${stats.pendingOrders} pending` },
    { label: "Total Revenue", value: formatPrice(stats.totalRevenue), icon: FiDollarSign, color: "bg-green-500", sub: "All time" },
    { label: "Menu Items", value: stats.menuItems, icon: FiShoppingBag, color: "bg-brand-red", sub: "Active items" },
    { label: "Pending Reviews", value: stats.pendingReviews, icon: FiStar, color: "bg-yellow-500", sub: "Awaiting approval" },
  ];

  const STATUS_COLORS: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    PREPARING: "bg-blue-100 text-blue-700",
    READY: "bg-green-100 text-green-700",
    DELIVERED: "bg-gray-100 text-gray-600",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-charcoal">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon size={20} className="text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-brand-charcoal mb-1">{card.value}</div>
            <div className="text-sm font-semibold text-gray-500">{card.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-display text-lg font-bold text-brand-charcoal">Recent Orders</h2>
          <a href="/admin/orders" className="text-brand-red text-sm font-semibold hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
              <tr>
                {["Order ID", "Customer", "Type", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recentOrders.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-400 text-sm">No orders yet</td></tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-gray-500">#{order.id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-brand-charcoal">
                      {order.customerName ?? order.user?.name ?? "Guest"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {order.orderType.replace("_", "-").toLowerCase()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-brand-charcoal">{formatPrice(order.totalAmount)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${STATUS_COLORS[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-NG")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-dynamic';
