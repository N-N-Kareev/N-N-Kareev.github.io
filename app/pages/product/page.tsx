"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import css from "./product.module.css";

interface SizeOption {
	size: string;
	price: number;
}

interface Product {
	name: string;
	description?: string;
	image?: string;
	sizes: SizeOption[];
}

interface CartItem extends Product {
	quantity: number;
	selectedSize: string;
	price: number;
}

const ProductPage: React.FC = () => {
	const search = useSearchParams();
	const product: Product = JSON.parse(search.get("product") || "{}");
	const [cart, setCart] = useState<CartItem[]>([]);
	const [quantityToAdd, setQuantityToAdd] = useState(1);
	const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
		product.sizes?.[0] || null
	);
	const stateCart = search.get("cart");
	const router = useRouter();

	// Загрузка корзины из localStorage или URL
	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		} else if (stateCart) {
			const cartString = stateCart;
			const initialCart = JSON.parse(decodeURIComponent(cartString)) || [];
			setCart(initialCart);
		}
	}, [stateCart]);

	// Сохранение корзины в localStorage
	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem("cart", JSON.stringify(cart));
		} else {
			localStorage.removeItem("cart");
		}
	}, [cart]);

	// Добавление товара в корзину
	const addToCart = (item: Product, selectedSize: SizeOption) => {
		const existingItem = cart.find(
			(cartItem) =>
				cartItem.name === item.name &&
				cartItem.selectedSize === selectedSize.size
		);
		if (existingItem) {
			setCart(
				cart.map((cartItem) =>
					cartItem.name === item.name &&
					cartItem.selectedSize === selectedSize.size
						? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
						: cartItem
				)
			);
		} else {
			setCart([
				...cart,
				{
					...item,
					quantity: quantityToAdd,
					selectedSize: selectedSize.size,
					price: selectedSize.price,
				},
			]);
		}
		setQuantityToAdd(1); // Сброс количества после добавления
	};

	// Переход в меню
	const goToMenu = () => {
		router.push("/pages/menu");
	};

	// Поиск товара в корзине
	const existingItem = cart.find(
		(cartItem) =>
			cartItem.name === product.name &&
			cartItem.selectedSize === selectedSize?.size
	);

	return (
		<div className={css.productPage}>
			<button className={css.backBtn} onClick={() => router.back()}>
				{"<"}
			</button>
			<div>
				<div className={css.imageWrapper}>
					<Image
						className={css.image}
						src={
							product.image && product.image.startsWith("http")
								? product.image
								: "/smoothie.jpg"
						}
						alt={product.name}
						fill
					/>
				</div>
				<div className={css.content}>
					<div className={css.productText}>
						<p className={css.name}>{product.name}</p>
						<p className={css.cartDescription}>
							{product.description || "Описание отсутствует"}
						</p>
					</div>

					{/* Выбор размера */}
					<div className={css.sizes}>
						<p>Выберите размер:</p>
						<div className={css.sizeOptions}>
							{product.sizes?.map((size) => (
								<button
									key={size.size}
									className={`${css.sizeButton} ${
										selectedSize?.size === size.size ? css.active : ""
									}`}
									onClick={() => setSelectedSize(size)}
								>
									{size.size} ({size.price} Р)
								</button>
							))}
						</div>
					</div>
				</div>
				{existingItem && (
					<div className={css.quantity}>
						<p className={css.quantityDescription}>В корзине</p>
						<p className={css.quantityItem}>
							{existingItem.name} - {existingItem.selectedSize} (
							{existingItem.quantity} шт)
						</p>
					</div>
				)}
			</div>
			<div className={css.quantityControls}>
				<div className={css.countWrapper}>
					<button
						className={css.countBtn}
						onClick={() => setQuantityToAdd((prev) => Math.max(1, prev - 1))}
						disabled={quantityToAdd <= 1}
					>
						-
					</button>
					<span className={css.countField}>{quantityToAdd}</span>
					<button
						className={css.countBtn}
						onClick={() => setQuantityToAdd((prev) => prev + 1)}
					>
						+
					</button>
				</div>
				<button
					className={css.priceBtn}
					onClick={() => {
						if (selectedSize) {
							addToCart(product, selectedSize);
							goToMenu();
						}
					}}
					disabled={!selectedSize}
				>
					{"Добавить " +
						(selectedSize ? selectedSize.price * quantityToAdd : 0) +
						" Р"}
				</button>
			</div>
		</div>
	);
};

export default ProductPage;

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import css from "./product.module.css";

// interface Product {
// 	name: string;
// 	description: string;
// 	weight: string;
// 	image: string;
// 	price: string;
// }

// interface CartItem extends Product {
// 	quantity: number;
// }

// const ProductPage: React.FC = () => {
// 	const search = useSearchParams();
// 	const product: Product = JSON.parse(search.get("product") || "{}");
// 	const [cart, setCart] = useState<CartItem[]>([]);
// 	const [quantityToAdd, setQuantityToAdd] = useState(1);
// 	const stateCart = search.get("cart");
// 	const router = useRouter();

// 	// Загрузка корзины из localStorage или URL
// 	useEffect(() => {
// 		const savedCart = localStorage.getItem("cart");
// 		if (savedCart) {
// 			setCart(JSON.parse(savedCart));
// 		} else if (stateCart) {
// 			const cartString = stateCart;
// 			const initialCart = JSON.parse(decodeURIComponent(cartString)) || [];
// 			setCart(initialCart);
// 		}
// 	}, [stateCart]);

// 	// Сохранение корзины в localStorage
// 	useEffect(() => {
// 		if (cart.length > 0) {
// 			localStorage.setItem("cart", JSON.stringify(cart));
// 		} else {
// 			localStorage.removeItem("cart");
// 		}
// 	}, [cart]);

// 	// Добавление товара в корзину
// 	const addToCart = (item: Product) => {
// 		const existingItem = cart.find((cartItem) => cartItem.name === item.name);
// 		if (existingItem) {
// 			setCart(
// 				cart.map((cartItem) =>
// 					cartItem.name === item.name
// 						? { ...cartItem, quantity: cartItem.quantity + quantityToAdd }
// 						: cartItem
// 				)
// 			);
// 		} else {
// 			setCart([...cart, { ...item, quantity: quantityToAdd }]);
// 		}
// 		setQuantityToAdd(1); // Сброс количества после добавления
// 	};

// 	// Переход в меню
// 	const goToMenu = () => {
// 		router.push("/pages/menu");
// 	};

// 	// Расчет стоимости
// 	const calculate = (count: number, price: string | undefined): number => {
// 		if (!price || typeof price !== "string") {
// 			console.error("Цена не указана или имеет неверный формат");
// 			return 0; // Возвращаем 0, если цена не указана или не является строкой
// 		}

// 		const clearPrice = parseFloat(price.replace(" руб.", ""));
// 		if (isNaN(clearPrice)) {
// 			console.error("Не удалось преобразовать цену в число");
// 			return 0; // Возвращаем 0, если преобразование не удалось
// 		}

// 		return clearPrice * count;
// 	};
// 	// Поиск товара в корзине
// 	const existingItem = cart.find((cartItem) => cartItem.name === product.name);

// 	return (
// 		<div className={css.productPage}>
// 			<button className={css.backBtn} onClick={() => router.back()}>
// 				{"<"}
// 			</button>
// 			<div>
// 				<div className={css.imageWrapper}>
// 					<Image
// 						className={css.image}
// 						src={
// 							product.image && product.image.startsWith("http")
// 								? product.image
// 								: "/smoothie.jpg" // Абсолютный путь к изображению в папке public
// 						}
// 						alt={product.name}
// 						fill
// 					/>
// 				</div>
// 				<div className={css.content}>
// 					<div className={css.productText}>
// 						<p className={css.name}>{product.name}</p>
// 						<p className={css.cartDescription}>{product.description}</p>
// 						{/* <p className={css.cartDescription}>{product.sizes[0]}</p> */}
// 					</div>
// 				</div>
// 				{existingItem && (
// 					<div className={css.quantity}>
// 						<p className={css.quantityDescription}>В корзине</p>
// 						<p className={css.quantityItem}>
// 							<p>{existingItem.name}</p>
// 							<p>{existingItem.quantity} шт</p>
// 						</p>
// 					</div>
// 				)}
// 			</div>
// 			<div className={css.quantityControls}>
// 				<div className={css.countWrapper}>
// 					<button
// 						className={css.countBtn}
// 						onClick={() => setQuantityToAdd((prev) => Math.max(1, prev - 1))}
// 						disabled={quantityToAdd <= 1}
// 					>
// 						-
// 					</button>
// 					<span className={css.countField}>{quantityToAdd}</span>
// 					<button
// 						className={css.countBtn}
// 						onClick={() => setQuantityToAdd((prev) => prev + 1)}
// 					>
// 						+
// 					</button>
// 				</div>
// 				<button
// 					className={css.priceBtn}
// 					onClick={() => {
// 						addToCart(product);
// 						goToMenu();
// 					}}
// 				>
// 					{"Добавить " + calculate(quantityToAdd, product.price) + " Р"}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default ProductPage;
