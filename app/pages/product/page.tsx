'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import css from './product.module.css';

const ProductPage = () => {
  const search = useSearchParams();
  const product = JSON.parse(search.get('product') || '{}');
  const [cart, setCart] = useState<any[]>([]);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const stateCart = search.get('cart');
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
  const addToCart = (item: any) => {
    const existingItem = cart.find((cartItem: any) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem: any) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: quantityToAdd }]);
    }
    setQuantityToAdd(1); // Сброс количества после добавления
  };

  const decreaseQuantity = (item: any) => {
    const updatedCart = cart.map((cartItem: any) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCart(updatedCart.filter((cartItem: any) => cartItem.quantity > 0));
  };

  const increaseQuantity = (item: any) => {
    const updatedCart = cart.map((cartItem: any) =>
      cartItem.name === item.name
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCart(updatedCart);
  };

  const goToMenu = () => {
    router.push('/pages/menu');
  };

  const existingItem = cart.find((cartItem: any) => cartItem.name === product.name);

  return (
    <div className={css.productPage}>
      <Image src={product.image} alt={product.name} width={300} height={300} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.weight}</p>
      <p>{product.price}</p>
      {existingItem ? (
        <div>
          <p>Количество в корзине: {existingItem.quantity}</p>
          <div className={css.countWrapper}>
            <button className={css.countBtn} onClick={() => setQuantityToAdd(quantityToAdd - 1)} disabled={quantityToAdd <= 1}>-</button>
            <span className={css.countField}>{quantityToAdd}</span>
            <button className={css.countBtn} onClick={() => setQuantityToAdd(quantityToAdd + 1)}>+</button>
          </div>
          <button onClick={() => { addToCart(product); goToMenu(); }}>Добавить в корзину</button>
        </div>
      ) : (
        <button onClick={() => { addToCart(product); goToMenu(); }}>{product.price}</button>
      )}
      <button onClick={() => router.back()}>Назад</button>
    </div>
  );
};

export default ProductPage;
