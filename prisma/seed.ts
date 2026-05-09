// prisma/seed.ts
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@pizzagarden.ng" },
    update: {},
    create: {
      name: "Pizza Garden Admin",
      email: "admin@pizzagarden.ng",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // Business settings
  await prisma.businessSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      isOpen: true,
      openTime: "10:00",
      closeTime: "20:00",
    },
  });

  // Menu items
  const menuItems = [
    // Pizzas
    { name: "Margherita Classic", description: "Fresh tomato sauce, mozzarella, basil on our hand-tossed dough", price: 4500, category: "pizza", imageUrl: "/images/margherita.jpg", featured: true },
    { name: "Pepperoni Feast", description: "Loaded with premium pepperoni, mozzarella, and rich tomato sauce", price: 5500, category: "pizza", imageUrl: "/images/pepperoni.jpg", featured: true },
    { name: "Suya Chicken Pizza", description: "Nigerian suya-spiced grilled chicken, onions, bell peppers, mozzarella", price: 5800, category: "pizza", imageUrl: "/images/suya-chicken.jpg", featured: true },
    { name: "BBQ Beef", description: "Smoky BBQ sauce, seasoned beef, red onions, cheddar blend", price: 6200, category: "pizza", imageUrl: "/images/bbq-beef.jpg" },
    { name: "Veggie Supreme", description: "Bell peppers, mushrooms, olives, onions, spinach, mozzarella", price: 4800, category: "pizza", imageUrl: "/images/veggie.jpg" },
    { name: "Four Cheese", description: "Mozzarella, cheddar, parmesan, gouda — the ultimate cheese lover's pizza", price: 6500, category: "pizza", imageUrl: "/images/four-cheese.jpg" },
    // Drinks
    { name: "Chapman", description: "Classic Nigerian Chapman with grenadine, Angostura bitters, Fanta", price: 1200, category: "drinks", imageUrl: "/images/chapman.jpg" },
    { name: "Zobo Cooler", description: "House-made hibiscus drink with ginger and pineapple", price: 800, category: "drinks", imageUrl: "/images/zobo.jpg" },
    { name: "Soft Drinks", description: "Coke, Fanta, Sprite, 7Up — chilled to perfection", price: 500, category: "drinks", imageUrl: "/images/soft-drinks.jpg" },
    { name: "Fresh Juice", description: "Orange, Watermelon, or Pineapple — freshly blended", price: 1000, category: "drinks", imageUrl: "/images/juice.jpg" },
    // Bar
    { name: "Beer (Bottle)", description: "Star, Heineken, Gulder — your choice, ice cold", price: 1500, category: "bar", imageUrl: "/images/beer.jpg" },
    { name: "Wine Glass", description: "Red or white wine, served by the glass", price: 3000, category: "bar", imageUrl: "/images/wine.jpg" },
    { name: "Cocktail of the Day", description: "Ask your server for today's special cocktail creation", price: 3500, category: "bar", imageUrl: "/images/cocktail.jpg" },
    // Sides
    { name: "Garlic Bread", description: "Toasted ciabatta with garlic herb butter", price: 1500, category: "sides", imageUrl: "/images/garlic-bread.jpg" },
    { name: "Chicken Wings", description: "6 crispy wings with your choice of sauce — BBQ or hot", price: 3500, category: "sides", imageUrl: "/images/wings.jpg" },
    { name: "Caesar Salad", description: "Romaine, croutons, parmesan, house Caesar dressing", price: 2500, category: "sides", imageUrl: "/images/salad.jpg" },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.create({ data: item });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
