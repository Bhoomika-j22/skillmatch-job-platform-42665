/**
 * Minimal API client for Talenvia frontend.
 * Uses REACT_APP_API_BASE or REACT_APP_BACKEND_URL as base URL when provided.
 */

const API_BASE =
  process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || "";

/**
 * PUBLIC_INTERFACE
 * Perform a JSON API request with sensible defaults.
 * @param {string} path relative API path, e.g. "/jobs"
 * @param {RequestInit & { json?: any }} options fetch options, optionally `json` payload
 * @returns {Promise<any>} parsed response JSON (or text if non-JSON), throws on HTTP error
 */
export async function apiRequest(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const headers = new Headers(options.headers || {});

  let body = options.body;
  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.json);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    body,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const payload = isJson
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "");

  if (!res.ok) {
    const message =
      (payload && payload.message) ||
      (typeof payload === "string" && payload) ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return payload;
}
