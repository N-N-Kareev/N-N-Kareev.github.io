"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/components/header";

import css from "./menu.module.css";

interface Product {
	articul: string;
	category: {
		name: string;
		description: string;
		icon: string;
	};
	categoryDiscription: string;
	description: string;
	image: string | undefined;
	name: string;
	place: string;
	price: number;
	sizes: Array<{ size: string; price: number }>;
}

const Menu = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const stateCart = searchParams.get("cart");
	const [menuItems, setMenuItems] = useState<Product[]>([]);
	const [cart, setCart] = useState<
		{ name: string; price: string; quantity: number }[]
	>([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:3001/app/menu", {
					headers: {
						"User-Agent": "Custom-UA-Bypass",
						"ngrok-skip-browser-warning": "true",
					},
				});
				const data = await response.json();
				setMenuItems(data);
			} catch (error) {
				console.error("Ошибка загрузки товаров:", error);
			}
		};
		fetchProducts();
	}, []);

	const getUniqueCategories = (products: Product[]) => {
		if (!products || products.length === 0) return [];
		const categorySet = new Set();
		const uniqueCategories: any = [];

		products.forEach((product: any) => {
			const categoryName = product.category?.name;
			if (categoryName && !categorySet.has(categoryName)) {
				categorySet.add(categoryName);
				uniqueCategories.push(product.category);
			}
		});

		return uniqueCategories;
	};
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

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
		const params = new URLSearchParams(searchParams.toString());
		params.set("cart", encodeURIComponent(JSON.stringify(cart)));
	}, [cart]);

	useEffect(() => {
		if (cart.length > 0) {
			localStorage.setItem("cart", JSON.stringify(cart));
		} else {
			localStorage.removeItem("cart");
		}
	}, [cart]);

	const addToCart = (item: any) => {
		const existingItem = cart.find(
			(cartItem: any) => cartItem.name === item.name
		);
		if (existingItem) {
			setCart(
				cart.map((cartItem: any) =>
					cartItem.name === item.name
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			setCart([...cart, { ...item, price: item.price + " руб.", quantity: 1 }]);
		}
	};

	const goToCart = () => {
		const cartString = JSON.stringify(cart);
		router.push(`/pages/cart`);
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
			const price =
				typeof item.price === "string"
					? parseFloat(item.price.replace(" руб.", ""))
					: item.price; // Если price уже число, используем его как есть
			return total + price * item.quantity;
		}, 0);
	};
	const goToProductPage = (item: any) => {
		const cartString = JSON.stringify(cart);
		router.push(
			`/pages/product?product=${encodeURIComponent(
				JSON.stringify(item)
			)}&cart=${encodeURIComponent(cartString)}`
		);
	};

	return (
		<>
			<Header
				linList={getUniqueCategories(menuItems)}
				currentLink={getUniqueCategories(menuItems)[0]?.name || ""}
			/>
			<section>
				{menuItems.length === 0 ? (
					<p>Нет товаров для отображения</p>
				) : (
					getUniqueCategories(menuItems || []).map(
						(category: any, index: number) => {
							return (
								<div className={css.content} id={category.name} key={index}>
									<p className={css.categoryName}>{category.name}</p>
									<p className={css.categoryDescription}>
										{category.description}
									</p>
									<div className={css.menu}>
										{menuItems.map((item, index) => {
											if (category.name !== item.category.name) {
												return null;
											}
											return (
												<div
													key={index}
													className={
														!cart.find(
															(cartItem: any) => cartItem.name === item.name
														)
															? css.menuItem
															: css.selectItem
													}
												>
													<div className={css.imgWrapper}>
														<Image
															className={css.itemImage}
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
													<div className={css.contentWrapper}>
														<div className={css.cartTitle}>{item.name}</div>
														<div className={css.cartDescription}>
															{item.description}
														</div>
													</div>
													<div className={css.quantityControls}>
														{!cart.find(
															(cartItem: any) => cartItem.name === item.name
														)?.quantity ? (
															<button
																className={css.priceBtn}
																onClick={() => addToCart(item)}
															>
																{item.price} руб.
															</button>
														) : (
															<div className={css.countWrapper}>
																<button
																	className={css.countBtn}
																	onClick={() => decreaseQuantity(item)}
																>
																	-
																</button>
																<span className={css.countField}>
																	{
																		cart.find(
																			(cartItem: any) =>
																				cartItem.name === item.name
																		)?.quantity
																	}
																</span>
																<button
																	className={css.countBtn}
																	onClick={() => addToCart(item)}
																>
																	+
																</button>
															</div>
														)}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							);
						}
					)
				)}
			</section>
			<button type="button" className="btn payment" onClick={goToCart}>
				Корзина {calculateTotal() === 0 ? "" : calculateTotal() + " P"}
			</button>
		</>
	);
};

export default Menu;
