import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { db } from "./firebase";
import { ProductProps } from "../../type";

interface CartProduct extends ProductProps {
  quantity: number;
}

interface UserType {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  id: string;
}

interface StoreType {
  // user
  currentUser: UserType | null;
  isLoading: boolean;
  getUserInfo: (uid: any) => Promise<void>;
  // cart
  cartProduct: CartProduct[];
  addToCart: (product: ProductProps) => Promise<void>;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  resetCart: () => void;
  // // favorite
  favoriteProduct: CartProduct[];
  addToFavorite: (product: ProductProps) => Promise<void>;
  removeFromFavorite: (productId: number) => void;
  resetFavorite: () => void;
}

const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};
export const store = create<StoreType>()(
  persist(
    (set) => ({
      currentUser: null,
      isLoading: true,
      cartProduct: [],
      favoriteProduct: [],

      getUserInfo: async (uid: any) => {
        if (!uid) return set({ currentUser: null, isLoading: false });

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        try {
          if (docSnap.exists()) {
            set({ currentUser: docSnap.data() as UserType, isLoading: false });
          }
        } catch (error) {
          console.log("getUserInfo error", error);
          set({ currentUser: null, isLoading: false });
        }
      },
      addToCart: (product: ProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const existingProduct = state.cartProduct.find(
              (p) => p._id === product._id
            );

            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: (p.quantity || 0) + 1 }
                    : p
                ),
              };
            } else {
              return {
                cartProduct: [
                  ...state.cartProduct,
                  { ...product, quantity: 1 },
                ],
              };
            }
          });
          resolve();
        });
      },
      decreaseQuantity: (productId: number) => {
        set((state: StoreType) => {
          const existingProduct = state.cartProduct.find(
            (p) => p._id === productId
          );

          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p._id === productId
                  ? { ...p, quantity: Math.max(p.quantity - 1, 1) }
                  : p
              ),
            };
          } else {
            return state;
          }
        });
      },
      removeFromCart: (productId: number) => {
        set((state: StoreType) => ({
          cartProduct: state.cartProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },
      resetCart: () => {
        set({ cartProduct: [] });
      },
      addToFavorite: (product: ProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id
                  )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },

      removeFromFavorite: (productId: number) => {
        set((state: StoreType) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item._id !== productId
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    {
      name: "supergear-storage",
      storage: customStorage,
    }
  )
);
