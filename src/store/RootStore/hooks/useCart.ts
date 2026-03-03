import rootStore from '../instance';

export const useCart = () => {
  const cartStore = rootStore.cartStore;
  return {
    items: cartStore.items,
    totalItems: cartStore.totalItems,
    totalPrice: cartStore.totalPrice,
    addToCart: cartStore.addItem.bind(cartStore),
    removeFromCart: cartStore.removeItem.bind(cartStore),
  };
};
