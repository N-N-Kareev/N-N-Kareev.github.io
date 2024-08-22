'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'
import Cart from '@/app/components/cart/cart';


 const CartPage = ()  =>{
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cart/>
  </Suspense>


  );
}

export default CartPage;
