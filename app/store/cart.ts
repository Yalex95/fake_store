import { defineStore } from "pinia";

interface CartItem {
  id: string;
  price: number;
  title: string;
  image?: string;
  quantity: number;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
  }),
  actions: {
    getCart() {
      const stored = localStorage.getItem("cart");
      if (stored) {
        this.items = JSON.parse(stored);
      }
    },
    addCart(product: Omit<CartItem, "quantity">) {
      const cartItems = this.items.find((item: any) => item.id === product.id);
      console.log(cartItems);
      
    },
  },
  persist: true,//dentro del objeto
});




