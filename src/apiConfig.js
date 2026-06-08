export const PROXY_URL = import.meta.env.VITE_PROXY_URL;
export const PROXY_KEY = import.meta.env.VITE_PROXY_KEY;

if (!PROXY_URL || !PROXY_KEY) {
	console.warn("Missing VITE_PROXY_URL or VITE_PROXY_KEY in environment variables.");
}

// export const TAROT_IMG_URL = "https://github.com/krates98/tarotcardapi";
