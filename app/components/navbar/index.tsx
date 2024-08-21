// components/Navbar.js
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/purchase-history">Purchase History</Link>
        </li>
        <li>
          <Link href="/account">Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
