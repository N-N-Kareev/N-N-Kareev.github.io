'use client';
// pages/menu.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const Menu = () => {
  const router = useRouter()
  const [cart, setCart]: any = useState([]);

  useEffect(() => {
    // Загрузите корзину из localStorage при загрузке страницы
    const savedCart: any = [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    // Сохраните корзину в localStorage при изменении
    localStorage.setItem('cart', JSON.stringify(cart));
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

  const menuItems = [
    { name: 'Эспрессо', price: '50 руб.', image: '/express.jfif' },
    { name: 'Американо', price: '70 руб.', image: '/americano.jfif' },
    { name: 'Капучино', price: '100 руб.', image: '/capo.jfif' },
    { name: 'Латте', price: '120 руб.', image: '/latte.jfif' },
    { name: 'Мокко', price: '150 руб.', image: '/moco.jfif' },
  ];

  return (
    <div>
    <h1>Меню кофейни</h1>
    <div className="menu">
          {menuItems.map((item, index) => (
            <div key={index} className="menu-item">
              <img src={item.image} alt={item.name} width={150} height={150} />
              <div>{index + 1}. {item.name} - {item.price} руб.</div>
              <button onClick={() => addToCart(item)}>Добавить в корзину</button>
            </div>
          ))}
        </div>
        {/* <link href="/pages/cart"> */}
        <button type="button" onClick={() => router.push('/pages/cart')}>
      Перейти в корзину
    </button>
        {/* </link> */}
    </div>
  );
}

export default Menu;
