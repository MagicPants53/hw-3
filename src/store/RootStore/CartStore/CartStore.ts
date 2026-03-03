import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import { Meta } from '@/shared/utils/meta';
import type { ProductType } from '@/shared/entity/product';
import { apiUrls } from '@/config/apiUrls';
import type UserStore from '../UserStore';

export type CartItem = {
  id?: number;
  originalProductId: number;
  documentId: string;
  quantity: number;
  price: number;
  title: string;
  product?: ProductType;
};

type PrivateFields = '_items' | '_meta' | '_totalPrice' | '_userStore';

class CartStore {
  private _items: CartItem[] = [];
  private _meta: Meta = Meta.initial as Meta;
  private _totalPrice = 0;
  private _productsCache = new Map<number, ProductType>();
  private _userStore: UserStore | null = null;

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      _items: observable,
      _meta: observable,
      _totalPrice: observable,
      _userStore: observable.ref,

      items: computed,
      totalItems: computed,
      totalPrice: computed,
      meta: computed,

      addItem: action,
      removeItem: action,
      updateQuantity: action,
      loadCart: action,
    });

    this.loadGuestCart();
  }

  setUserStore(userStore: UserStore) {
    runInAction(() => {
      this._userStore = userStore;
    });
  }

  get userStore() {
    return this._userStore;
  }

  get items() {
    return this._items;
  }
  get totalItems() {
    return this._items.length;
  }
  get totalPrice() {
    return this._totalPrice;
  }
  get meta() {
    return this._meta;
  }

  private CART_KEY = 'guest_cart';

  private loadGuestCart() {
    const cartJson = localStorage.getItem(this.CART_KEY);
    if (cartJson) {
      runInAction(() => {
        this._items = JSON.parse(cartJson);
        this.calculateTotal();
      });
    }
  }

  private saveGuestCart() {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this._items));
  }

  async loadCart() {
    if (!this.userStore?.isAuth) {
      runInAction(() => {
        this._meta = Meta.success as Meta;
      });
      return;
    }

    runInAction(() => {
      this._meta = Meta.loading as Meta;
    });

    try {
      const { data } = await axios.get(apiUrls.cart.list, {
        headers: {
          Authorization: `Bearer ${this.userStore.token}`,
          'Content-Type': 'application/json',
        },
      });
      runInAction(() => {
        this._items = data.map((item: CartItem) => ({
          id: item.id,
          originalProductId: item.originalProductId,
          documentId: item.documentId,
          quantity: item.quantity,
          price: item.product?.price || 0,
          title: item.product?.title || '',
        }));
        this.calculateTotal();
        this._meta = Meta.success as Meta;
      });
    } catch {
      runInAction(() => {
        this._meta = Meta.error as Meta;
      });
    }
  }

  async addItem(product: ProductType, quantity = 1) {
    const key = product.id;
    this._productsCache.set(key, product);

    if (this.userStore?.isAuth) {
      try {
        await axios.post(
          apiUrls.cart.add,
          {
            product: product.id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${this.userStore.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        await this.loadCart();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) console.log(error.response.data);
      }
    } else {
      const existingIndex = this.items.findIndex((item) => item.originalProductId === key);
      runInAction(() => {
        if (existingIndex >= 0) {
          this._items[existingIndex].quantity += quantity;
        } else {
          this._items.push({
            originalProductId: key,
            documentId: product.documentId,
            quantity,
            price: product.price,
            title: product.title,
          });
        }
        this.calculateTotal();
        this.saveGuestCart();
      });
    }
  }

  async removeItem(documentId: string) {
    if (this.userStore?.isAuth) {
      const item = this._items.find((item) => item.documentId === documentId);
      if (item) {
        await axios.post(
          apiUrls.cart.remove,
          {
            product: item.originalProductId,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${this.userStore.token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        await this.loadCart();
      }
    } else {
      runInAction(() => {
        this._items = this._items.filter((item) => item.documentId !== documentId);
        this.calculateTotal();
        this.saveGuestCart();
      });
    }
  }

  updateQuantity(documentId: string, quantity: number) {
    const item = this._items.find((item) => item.documentId === documentId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.calculateTotal();
      if (!this.userStore?.isAuth) {
        this.saveGuestCart();
      }
    }
  }

  private calculateTotal() {
    this._totalPrice = this._items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

export default CartStore;
