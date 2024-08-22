'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'


 const Cart = ()  =>{

    const [cart, setCart]: any = useState([]);
    const searchParams = useSearchParams()
    const stateCart = searchParams.get('cart')
    const router = useRouter()


  
    useEffect(() => {
      const cartString: any = stateCart;
      const savedCart = JSON.parse(decodeURIComponent(cartString) as any) || [];
      setCart(savedCart);
    }, []);
  
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

    const backToMenu = () => {
      router.back()
    }
  

  return (
    <div>
        <h1>Корзина</h1>
        <button onClick={backToMenu} className='btn'>
              Вернуться к Меню
            </button>
        {cart.length === 0 ? (
          <p>Ваша корзина пуста.</p>
        ) : (
          <div>
            {cart.map((item: any, index: number) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} width={100} height={100} />
                <div>{item.name} - {item.price} руб.</div>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item)}>Удалить</button>
              </div>
            ))}
            <div className="total-price">
              Общая стоимость: {calculateTotal()} руб.
            </div>
            <button className='btn'>
              Добавить деталей к заказу 
            </button>
          </div>
        )}
    </div>
  );
}

export default Cart;
