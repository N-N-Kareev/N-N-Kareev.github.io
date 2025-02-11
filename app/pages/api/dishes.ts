import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const auth = Buffer.from(`xc188:vavkez-tyvzok`).toString("base64"); // Замените на свои данные

	try {
		const response = await fetch("https://api.quickresto.ru/your-endpoint", {
			method: "GET",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Ошибка API: ${response.status}`);
		}

		const data = await response.json();
		res.status(200).json(data);
	} catch (error) {
		console.error("Ошибка при запросе к QuickResto:", error);
		res.status(500).json({ error: "Ошибка при запросе к QuickResto" });
	}
}
