'use client';

import { Suspense } from 'react';
import Cart from '@/app/components/cart/cart';


 const CartPage = ()  =>{
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cart/>
  </Suspense>


  );
}

export default CartPage;
