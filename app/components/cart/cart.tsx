'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image';


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
    <section>
        <button onClick={backToMenu} className='btn'>
              Вернуться к Меню
            </button>
        {cart.length === 0 ? (
          <p>Ваша корзина пуста.</p>
        ) : (
          <div className='cart-section'>
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
                    {calculate(item.quantity, item.price)} руб.
                  </span>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <span className='count-field'>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
              </div>
              </div>
            ))}
            <div className="total-price">
              Общая стоимость: {calculateTotal()} руб.
            </div>
          </div>
        )}
    </section>
    <button className='btn payment'>
    Добавить деталей к заказу 
  </button>
  </>
  );
}

export default Cart;
