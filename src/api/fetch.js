export async function get(url, options = null) {
  return sendRequest(url, { ...options, method: "GET" });
}

export async function post(url, body, options = null) {
  const headers = new Headers(options?.headers);
  if (!options?.isFormData) headers.set("content-type", "application/json");
  return sendRequest(url, {
    ...options,
    headers,
    body: options?.isFormData ? body : JSON.stringify(body),
    method: "POST",
  });
}

export async function sendRequest(url, options = null) {
  const headers = new Headers(options?.headers);

  return fetch(url, { ...options, headers }).then(async (response) => {
    if (response.status >= 400) {
      const url = response.url;
      const preview = await response.text();
      return Promise.reject(
        new Error(
          `Response with code ${response.status}: ${response.statusText}, url: ${url}, Details: ${preview}`
        )
      );
    }
    return options?.isPlainText ? await response.text() : await response.json();
  });
}
