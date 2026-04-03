export type Category = "Best Coffee Menu's" | "Newest Coffee Menu's" | "Other Menu's";
export type Currency = "PHP" | "USD" | "EUR" | "GBP";

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: Currency;
  temperature: "Hot" | "Cold";
  cupSizes: string[]; // e.g., ["12oz", "16oz", "20oz"]
  sugarLevel: string;
  otherDetails: string;
  category: Category;
  imageUrl: string;
  createdAt: number;
}

export type OrderStatus = "On Que" | "Complete" | "Delivering" | "Delivered";

export interface Order {
  id: string;
  orderNumber: number; // 1-50
  orderId: string; // 10001-10050
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber: string;
  cupSize: string;
  sugarLvl: string;
  additionalMessage: string;
  productId: string;
  productName: string;
  totalPrice: number;
  currency: Currency;
  type: "Delivery" | "Order in Area";
  status: OrderStatus;
  createdAt: number;
}

export interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  createdAt: number;
}
