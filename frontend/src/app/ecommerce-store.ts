import { computed, inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { Product } from './models/product';
import { produce } from 'immer';
import { HotToastService } from '@ngxpert/hot-toast';
import { CartItem } from './models/cart';

export type User = {
  name: string;
  email: string;
}

export type EcommerceState = {
  products: Product[];
  category: string;
  wishlistItems: Product[];
  cartItems: CartItem[];
  currentUser: User | null;
}

export const EcommerceStore = signalStore(
  {
    providedIn: 'root'
  },
  withState<EcommerceState>({
    products: [
      {
        id: '1',
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
        price: 299.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '2',
        name: 'Smart 4K TV',
        description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
        price: 1299.99,
        imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 6,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '3',
        name: 'Professional Camera',
        description: 'Mirrorless digital camera with 4K video capabilities',
        price: 899.99,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'Electronics',
      },
      {
        id: '4',
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with a modern slim fit',
        price: 89.99,
        imageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '5',
        name: 'Running Shoes',
        description: 'Lightweight running shoes with advanced cushioning technology',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&w=400&q=80',
        rating: 4.9,
        reviewCount: 6,
        inStock: true,
        category: 'Clothing',
      },
      {
        id: '6',
        name: 'Leather Handbag',
        description: 'Genuine leather handbag with multiple compartments',
        price: 199.99,
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&w=400&q=80',
        rating: 4.7,
        reviewCount: 6,
        inStock: false,
        category: 'Accessories',
      },
      {
        id: '7',
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking and GPS',
        price: 349.99,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: '8',
        name: 'Wireless Earbuds',
        description: 'True wireless earbuds with premium sound quality',
        price: 179.99,
        imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&w=400&q=80',
        rating: 4.8,
        reviewCount: 6,
        inStock: true,
        category: 'Accessories',
      },
      {
        id: '9',
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with built-in grinder',
        price: 149.99,
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'Home',
      },
      {
        id: '10',
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with alignment lines',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&w=400&q=80',
        rating: 4.4,
        reviewCount: 6,
        inStock: true,
        category: 'Home',
      },
      {
        id: '11',
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature',
        price: 59.99,
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&w=400&q=80',
        rating: 4.3,
        reviewCount: 6,
        inStock: true,
        category: 'Home',
      },
      {
        id: '12',
        name: 'Backpack',
        description: 'Durable backpack with laptop compartment and USB charging port',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'Accessories',
      },
    ],
    category: 'all',
    wishlistItems: [],
    cartItems: [],
    currentUser: null,
  }),
  withComputed(({ category, products, wishlistItems, cartItems }) => ({
    filteredProducts: computed(() => {
      const cat = category();
      if (cat === 'all') return products();
      return products().filter((p: Product) => p.category.toLowerCase() === cat.toLowerCase());
    }),
    wishlistCount: computed(() => wishlistItems().length),
    cartCount: computed(() => cartItems().reduce((acc, item) => acc + item.quantity, 0)),
  })),
  withMethods((store, toaster = inject(HotToastService)) => ({
    setCategory(category: string) {
      patchState(store, { category });
    },
    setCurrentUser(user: User | null) {
      patchState(store, { currentUser: user });
    },
    addToWishlist(product: Product) {
      const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
        if (!draft.find(p => p.id === product.id)) {
          draft.push(product);
        }
      });
      patchState(store, { wishlistItems: updatedWishlistItems });
      toaster.success('Product added to wishlist');
    },
    removeFromWishlist(product: Product) {
      patchState(store, {
        wishlistItems: store.wishlistItems().filter(p => p.id !== product.id)
      });
      toaster.success('Product removed from wishlist');
    },
    clearWishlist() {
      patchState(store, { wishlistItems: [] });
      toaster.success('Wishlist cleared');
    },
    addToCart(product: Product, quantity = 1) {
      const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        if (existingItemIndex !== -1) {
          draft[existingItemIndex].quantity += quantity;
          return;
        }
        draft.push({ product, quantity });
      });
      patchState(store, { cartItems: updatedCartItems });
      toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart');
    },
    removeFromCart(product: Product) {
      patchState(store, {
        cartItems: store.cartItems().filter(i => i.product.id !== product.id)
      });
      toaster.success('Product removed from cart');
    },
    updateQuantity(product: Product, quantity: number) {
      const updatedCartItems = produce(store.cartItems(), (draft) => {
        const item = draft.find(i => i.product.id === product.id);
        if (item) {
          item.quantity = quantity;
        }
      });
      patchState(store, { cartItems: updatedCartItems });
    },
    addAllWishlistToCart() {
      store.wishlistItems().forEach(product => {
        const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += 1;
          } else {
            draft.push({ product, quantity: 1 });
          }
        });
        patchState(store, { cartItems: updatedCartItems });
      });
      toaster.success('All wishlist items added to cart');
    },
    clearCart() {
      patchState(store, { cartItems: [] });
      toaster.success('Order placed successfully!');
    },
  }))
);