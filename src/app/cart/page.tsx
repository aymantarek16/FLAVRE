import { CartView } from "@/components/cart/cart-view";

export default function CartPage() {
  return (
    <div className="space-y-8 pb-16">
      <header className="container-page">
        <h1 className="text-4xl font-black md:text-6xl">السلة</h1>
      </header>
      <CartView />
    </div>
  );
}
