'use client';
// pages/menu.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Menu = () => {
  const router = useRouter()
  const [cart, setCart]: any = useState([]);
  const menuItems = [
    { name: 'Эспрессо', price: '50 руб.', image: '/express.jfif' },
    { name: 'Американо', price: '70 руб.', image: '/americano.jfif' },
    { name: 'Капучино', price: '100 руб.', image: '/capo.jfif' },
    { name: 'Латте', price: '120 руб.', image: '/latte.jfif' },
    { name: 'Мокко', price: '150 руб.', image: '/moco.jfif' },
  ];

  useEffect(() => {
    // Загрузите корзину из localStorage при загрузке страницы
    const savedCart: any = JSON.parse(localStorage.getItem('cart') as any) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    // Сохраните корзину в localStorage при изменении
    router.push(`/pages/menu?cart=${encodeURIComponent(JSON.stringify(cart))}`);
  }, [cart]);

  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem: any) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem: any) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const goToCart = () => {
    const cartString = JSON.stringify(cart);
    router.push(`/pages/cart?cart=${encodeURIComponent(cartString)}`);
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

  return (
    <div>
      <h1>Меню кофейни</h1>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className='img-wrapper'>
            <Image src={item.image} alt={item.name} fill/>
            </div>
            <div className='cont-wrapper'>
              <div>{index + 1}. {item.name} - {item.price} руб.</div>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item)}>-</button>
              <span>{cart.find((cartItem:any) => cartItem.name === item.name)?.quantity || 0}</span>
              <button onClick={() =>  addToCart(item)}>+</button>
            </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={goToCart}>
        Оформить заказ ({calculateTotal()} руб.)
      </button>
    </div>
  );
}

export default Menu;
