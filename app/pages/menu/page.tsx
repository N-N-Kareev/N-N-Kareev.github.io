'use client';
// pages/menu.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import Header from '@/app/components/header';

const Menu = () => {
  const router = useRouter();
  const search = useSearchParams();
  const [cart, setCart]: any = useState([]);
  const [categories, setCategories]: any = useState([]);
  const menuItems = [
    {
      name: 'Эспрессо',
      price: '50 руб.',
      image: '/express.jfif',
      description: 'Крепкий кофе, приготовленный под высоким давлением. Идеально для любителей насыщенного вкуса.',
      category: 'Горячие напитки'
    },
    {
      name: 'Американо',
      price: '70 руб.',
      image: '/americano.jfif',
      description: 'Эспрессо, разбавленный горячей водой. Легкий и освежающий напиток.',
      category: 'Горячие напитки'
    },
    {
      name: 'Капучино',
      price: '100 руб.',
      image: '/capo.jfif',
      description: 'Эспрессо с добавлением вспененного молока. Нежный и кремовый вкус.',
      category: 'Горячие напитки'
    },
    {
      name: 'Латте',
      price: '120 руб.',
      image: '/latte.jfif',
      description: 'Эспрессо с добавлением горячего молока и небольшим количеством молочной пены. Мягкий и сливочный вкус.',
      category: 'Горячие напитки'
    },
    {
      name: 'Мокко',
      price: '150 руб.',
      image: '/moco.jfif',
      description: 'Эспрессо с добавлением горячего шоколада и вспененного молока. Сладкий и насыщенный вкус.',
      category: 'Горячие напитки'
    },
    {
      name: 'Лимонад',
      price: '80 руб.',
      image: '/lemonade.jpg',
      description: 'Освежающий напиток с лимонным вкусом.',
      category: 'Прохладительные напитки'
    },
    {
      name: 'Кола',
      price: '60 руб.',
      image: '/cola.jpg',
      description: 'Газированный напиток с освежающим вкусом.',
      category: 'Прохладительные напитки'
    },
    {
      name: 'Сок',
      price: '70 руб.',
      image: '/juice.jfif',
      description: 'Натуральный фруктовый сок.',
      category: 'Прохладительные напитки'
    },
    {
      name: 'Смузи',
      price: '100 руб.',
      image: '/smoothie.jpg',
      description: 'Густой напиток из фруктов и овощей.',
      category: 'Прохладительные напитки'
    },
    {
      name: 'Морс',
      price: '90 руб.',
      image: '/mors.jpeg',
      description: 'Напиток из ягод с освежающим вкусом.',
      category: 'Прохладительные напитки'
    }
  ];

  const getUniqueCategories = (items: any) => {
    const categoriesSet = items.reduce((set: any, item: any) => {
      set.add(item.category);
      return set;
    }, new Set());
      console.log(Array.from(categoriesSet));
    return Array.from(categoriesSet);
  };

  const [currentCategory, setCurrentCategory] = useState(getUniqueCategories(menuItems)[0] || '')

  useEffect(() => {
    menuItems.sort((item: any) => {return item.category})
    const savedCart: any = JSON.parse(localStorage.getItem('cart') as any) || [];
    setCart(savedCart);
    cart
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(search.toString())
    params.set('cart',encodeURIComponent(JSON.stringify(cart)));
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
    <section>
      <Header linList={getUniqueCategories(menuItems)} currentLink={currentCategory}/>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <div className='img-wrapper'>
            <Image className={'img'} src={item.image} alt={item.name} fill/>
            </div>
            <div className='cont-wrapper'>
              <div className='card-title'>{item.name}.</div>
              <div className='cart-description'>{item.description}</div>
            <div className="quantity-controls">
              {!cart.find((cartItem:any) => cartItem.name === item.name)?.quantity ? 
                <button onClick={() =>  addToCart(item)}>{item.price}</button> : 
              <div className='cout-wrapper'>
                <button onClick={() => decreaseQuantity(item)}>-</button>
                <span className='count-field'>{cart.find((cartItem:any) => cartItem.name === item.name)?.quantity}</span>
                <button onClick={() =>  addToCart(item)}>+</button>
              </div>
              }
            </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className='btn payment' onClick={goToCart}>
        Оформить заказ {calculateTotal()} руб.
      </button>
    </section>
  );
}

export default Menu;
