// components/Navbar.js
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/pages/menu">Menu</Link>
        </li>
        <li>
          <Link href="/pages/history">Purchase History</Link>
        </li>
        <li>
          <Link href="/pages/profile">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
