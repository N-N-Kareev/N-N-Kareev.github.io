// components/Navbar.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import css from './navbar.module.css';

const Navbar = () => {
  return (
   <header className={css.imageWrapper}>
     <Image className={css.headerImage} src={'/header-image.png'} alt='' fill/> 
  </header>
  );
};

export default Navbar;
