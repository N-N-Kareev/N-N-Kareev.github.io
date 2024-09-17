'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import css from './cart.module.css';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const stateCart = searchParams.get('cart');
  const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else if (stateCart) {
      const cartString = stateCart;
      const initialCart = JSON.parse(cartString) || [];
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

  const removeFromCart = (item: any) => {
    const updatedCart = cart.filter((cartItem) => cartItem.name !== item.name);
    setCart(updatedCart);
  };

  const increaseQuantity = (item: any) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decreaseQuantity = (item: any) => {
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

  const clearBin = () => {
    setCart([])
  }

  const goToProductPage = (item: any) => {
    router.push(`/pages/product?product=${encodeURIComponent(JSON.stringify(item))}`);
  };

  return (
    <div>
      {
      !cart.length &&    
      <button onClick={backToMenu} className={css.backBtn}>
        {'<'}
      </button>
      }
      <section className={css.section}>
        {cart.length === 0 ? (
          <div className={css.emtyBin}>
          <Image src={'/bin1.png'} alt='clear bin' height={107} width={107}/>
          <p>У вас пока нет заказов</p>
          </div>
        ) : (
          <>
          <div className={css.btnWrapper}>
          <button onClick={backToMenu} className={css.backBtn}>
            {'<'}
          </button>
          <button className={css.binBtn} onClick={clearBin}>
          Очисттить корзину
          <Image src={'/bin.png'} alt='clear bin' height={24} width={24}/>
          </button>
          </div>
           <div className={css.cartSection}>
            {cart.map((item, index) => (
              <div key={index} className={css.cartItem}>
                <div className={css.cartImageWrapper}>
                  <Image className={css.cartImage} src={item.image} alt={item.name} width={80} height={80} onClick={() => goToProductPage(item)} />
                </div>
                <div className="cart-content-wrapper">
                  <div className={css.cartTitleSum}>
                    <span className={css.cartTitle}>{item.name}</span>
                    <span className={css.sum}>{calculate(item.quantity, item.price) + ' Р'}</span>
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
          <button className="btn payment">Оформить заказ</button>
          </>
        )}
      </section>    
    </div>
  );
};

export default Cart;
