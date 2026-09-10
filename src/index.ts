/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		// Get /api/users
		if (request.method === "GET" && url.pathname === "/api/users") {
			return Response.json([
				{id: 1, name: "John" },
				{id: 2, name: "Jane" },
			]);
		}

		// Get /api/users/:id
		if (request.method === "GET" && url.pathname.startsWith("/api/users/")) {
			const id = url.pathname.split("/").pop();
			return Response.json({ 
				id,
				name: "John",
			});
		}
		// POST /api/users
		if (request.method === "POST" && url.pathname === "/api/users") {
			const body = await request.json();
			return Response.json(
				{ 
					message: "User Created",
					user: body, 
				},
				{status: 201}
			);
		}
		return Response.json(
			{ error: "Route Not Found" },
			{ status: 404 }
		);
	},
};