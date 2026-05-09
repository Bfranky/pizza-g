// components/ui/AddToCartButton.tsx
"use client";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

interface Props {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export default function AddToCartButton({ item }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      quantity: 1,
    });
    toast.success(`Added ${item.name} to cart!`);
  };

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-1.5 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
    >
      <FiShoppingCart size={14} />
      Add
    </button>
  );
}
