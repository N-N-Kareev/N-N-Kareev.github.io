'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';

import css from './cart.module.css';


 const Cart = ()  =>{

    const [cart, setCart]: any = useState([]);
    const searchParams = useSearchParams()
    const stateCart = searchParams.get('cart')
    const router = useRouter()
  
    useEffect(() => {
      const cartString: any = stateCart;
      const savedCart = JSON.parse(decodeURIComponent(cartString) as any) || [];
      setCart(savedCart);
    }, [stateCart]);

  
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
  
    const removeFromCart = (item: any) => {
      const updatedCart = cart.filter((cartItem: any) => cartItem.name !== item.name);
      setCart(updatedCart);
    };
  
    const increaseQuantity = (item: any) => {
      setCart(
        cart.map((cartItem: any) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    };
  
    const decreaseQuantity = (item: any) => {
      const updatedCart = cart.map((cartItem: any) =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCart.filter((cartItem: any) => cartItem.quantity > 0));
    };
  
    const calculateTotal = () => {
      return cart.reduce((total: number, item: any) => {
        const price = parseFloat(item.price.replace(' руб.', ''));
        return total + price * item.quantity;
      }, 0);
    };

    const calculate = (count: any, price: any) => {
      const clearPrice = parseFloat(price.replace(' руб.', ''));
      return clearPrice * count
    };    

    const backToMenu = () => {
      router.back()
    }
  

  return (
    <>
      <button 
        onClick={backToMenu}
        className={css.backBtn}>
          Вернуться к Меню
      </button>
    <section>
        {cart.length === 0 ? (
          <p>Ваша корзина пуста.</p>
        ) : (
          <div className={css.cartSection}>
            {cart.map((item: any, index: number) => (
              <div key={index} className="cart-item">
                <div className='cart-image'>
                <Image className='cart-image' src={item.image} alt={item.name} width={80} height={80} />
                </div>
              <div className='cart-content-wrapper'>
                <div className='cart-title-sum'>
                  <span>
                    {item.name}
                  </span> 
                  <span className='sum'>
                    {calculate(item.quantity, item.price)} Р
                  </span>
                </div>
                <div className={css.quantityControls}>
                  <button className={css.countBtn} onClick={() => decreaseQuantity(item)}>-</button>
                  <span className={css.countField}>{item.quantity}</span>
                  <button className={css.countBtn} onClick={() => increaseQuantity(item)}>+</button>
                </div>
              </div>
              </div>
            ))}
            <div className="total-price">
              Общая стоимость: {calculateTotal()} Р
            </div>
          </div>
        )}
    </section>
    <button className='btn payment'>
    Оформить заказ
  </button>
  </>
  );
}

export default Cart;
