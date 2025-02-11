"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import css from "./cart.module.css";

interface CartItem {
	articul: string;
	category: {
		name: string;
		description: string;
		icon: string;
	};
	categoryDiscription: string;
	discription: string;
	image: string;
	name: string;
	place: string;
	price: number;
	sizes: { size: string; price: number }[];
	quantity: number;
	selectedSize?: string;
}

const Cart: React.FC = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const searchParams = useSearchParams();
	const stateCart = searchParams.get("cart");
	const router = useRouter();

	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		} else if (stateCart) {
			const cartString = stateCart;
			const initialCart = JSON.parse(cartString) || [];
			setCart(initialCart);
		}
	}, [stateCart]);

	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem("cart", JSON.stringify(cart));
		} else {
			localStorage.removeItem("cart");
		}
	}, [cart]);

	const removeFromCart = (item: CartItem) => {
		const updatedCart = cart.filter(
			(cartItem) => cartItem.articul !== item.articul
		);
		setCart(updatedCart);
	};

	const increaseQuantity = (item: CartItem) => {
		setCart(
			cart.map((cartItem) =>
				cartItem.articul === item.articul
					? { ...cartItem, quantity: cartItem.quantity + 1 }
					: cartItem
			)
		);
	};

	const decreaseQuantity = (item: CartItem) => {
		const updatedCart = cart.map((cartItem) =>
			cartItem.articul === item.articul
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
		setCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
	};

	const calculateTotal = () => {
		return cart.reduce((total, item) => {
			const selectedSizePrice =
				item.sizes.find((size) => size.size === item.selectedSize)?.price ||
				item.price;
			return total + selectedSizePrice * item.quantity;
		}, 0);
	};

	const calculate = (count: number, item: CartItem) => {
		const selectedSizePrice =
			item.sizes.find((size) => size.size === item.selectedSize)?.price ||
			item.price;
		return selectedSizePrice * count;
	};

	const backToMenu = () => {
		router.back();
	};

	const clearBin = () => {
		setCart([]);
	};

	const goToProductPage = (item: CartItem) => {
		router.push(
			`/pages/product?product=${encodeURIComponent(JSON.stringify(item))}`
		);
	};

	const handleSizeChange = (item: CartItem, size: string) => {
		setCart(
			cart.map((cartItem) =>
				cartItem.articul === item.articul
					? { ...cartItem, selectedSize: size }
					: cartItem
			)
		);
	};

	return (
		<div>
			{!cart.length && (
				<button onClick={backToMenu} className={css.backBtn}>
					{"<"}
				</button>
			)}
			<section className={css.section}>
				{cart.length === 0 ? (
					<div className={css.emtyBin}>
						<Image src={"/bin1.png"} alt="clear bin" height={107} width={107} />
						<p>У вас пока нет заказов</p>
					</div>
				) : (
					<>
						<div className={css.btnWrapper}>
							<button onClick={backToMenu} className={css.backBtn}>
								{"<"}
							</button>
							<button className={css.binBtn} onClick={clearBin}>
								Очистить корзину
								<Image
									src={"/bin.png"}
									alt="clear bin"
									height={24}
									width={24}
								/>
							</button>
						</div>
						<div className={css.cartSection}>
							{cart.map((item, index) => (
								<div key={index} className={css.cartItem}>
									<div className={css.cartImageWrapper}>
										<Image
											className={css.cartImage}
											src={
												item.image && item.image.startsWith("http")
													? item.image
													: "/smoothie.jpg"
											}
											alt={item.name}
											fill
											onClick={() => goToProductPage(item)}
										/>
									</div>
									<div className="cart-content-wrapper">
										<div className={css.cartTitleSum}>
											<span className={css.cartTitle}>{item.name}</span>
											<span className={css.sum}>
												{calculate(item.quantity, item) + " Р"}
											</span>
										</div>
										<div className={css.quantityControls}>
											<button
												className={css.countBtn}
												onClick={() => decreaseQuantity(item)}
											>
												-
											</button>
											<span className={css.countField}>{item.quantity}</span>
											<button
												className={css.countBtn}
												onClick={() => increaseQuantity(item)}
											>
												+
											</button>
										</div>
										<div className={css.sizeControls}>
											<select
												value={item.selectedSize || ""}
												onChange={(e) => handleSizeChange(item, e.target.value)}
											>
												{item.sizes.map((size, idx) => (
													<option key={idx} value={size.size}>
														{size.size} ({size.price} Р)
													</option>
												))}
											</select>
										</div>
									</div>
								</div>
							))}
							<div className="total-price">
								Общая стоимость: {calculateTotal()} Р
							</div>
						</div>
						<button className="btn payment">Оформить заказ</button>
					</>
				)}
			</section>
		</div>
	);
};

export default Cart;
