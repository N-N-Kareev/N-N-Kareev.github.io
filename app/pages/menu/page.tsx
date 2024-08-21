// pages/menu.js
import React from 'react';
import Image from 'next/image';


const Menu = () => {
  // const placeOrder = () => {
  //   const order = prompt('Введите номер напитка:');
  //   if (order) {
  //     alert(`Вы заказали: ${order}`);
  //     // Здесь можно добавить логику для отправки заказа на сервер или в Telegram
  //   }
  // };

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
          {menuItems.map((item: any, index) => (
            <div key={index} className="menu-item">
              <Image src={item.image} alt={item.name} width={150} height={150} />
              <div>{index + 1}. {item.name} - {item.price}</div>
            </div>
          ))}
        </div>
        {/* <button className="order-button" onClick={() => {}}>Заказать</button> */}
    </div>
  );
}

export default Menu;
