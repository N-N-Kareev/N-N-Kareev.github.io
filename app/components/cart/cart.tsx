'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import css from './cart.module.css';

// Определение типов
interface CartItem {
  name: string;
  price: string;
  image: string;
  description: string;
  weight: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const searchParams = useSearchParams();
  const stateCart = searchParams.get('cart');
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else if (stateCart) {
      const cartString = stateCart;
      const initialCart = JSON.parse(decodeURIComponent(cartString)) || [];
      setCart(initialCart);
    }
  }, [stateCart]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const removeFromCart = (item: CartItem) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedCart);
  };

  const increaseQuantity = (item: CartItem) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (item: CartItem) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(' руб.', ''));
      return total + price * item.quantity;
    }, 0);
  };

  const calculate = (count: number, price: string) => {
    const clearPrice = parseFloat(price.replace(' руб.', ''));
    return clearPrice * count;
  };

  const backToMenu = () => {
    router.back();
  };

  const goToProductPage = (item: any) => {
    router.push(`/pages/product?product=${encodeURIComponent(JSON.stringify(item))}`);
  };

  return (
    <>
      <button onClick={backToMenu} className={css.backBtn}>
        Вернуться к Меню
      </button>
      <section>
        {cart.length === 0 ? (
          <p>Ваша корзина пуста.</p>
        ) : (
          <div className={css.cartSection}>
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-image">
                  <Image className="cart-image" src={item.image} alt={item.name} width={80} height={80} onClick={() => goToProductPage(item)} />
                </div>
                <div className="cart-content-wrapper">
                  <div className={css.cartTitleSum}>
                    <span className={css.cartTitle}>{item.name}</span>
                    <span className="sum">{calculate(item.quantity, item.price) + ' Р'}</span>
                  </div>
                  <div className={css.quantityControls}>
                    <button className={css.countBtn} onClick={() => decreaseQuantity(item)}>
                      -
                    </button>
                    <span className={css.countField}>{item.quantity}</span>
                    <button className={css.countBtn} onClick={() => increaseQuantity(item)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="total-price">Общая стоимость: {calculateTotal()} Р</div>
          </div>
        )}
      </section>
      <button className="btn payment">Оформить заказ</button>
    </>
  );
};

export default Cart;
