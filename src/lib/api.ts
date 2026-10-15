const API_URL = "https://dummyjson.com";

export interface ListResponse {
  [key: string]: unknown;
  total: number;
  skip: number;
  limit: number;
}

export async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || `Request failed with ${response.status}`);
  }

  return data;
}

export async function fetchResource(
  resource: string,
  options: {
    limit?: number;
    skip?: number;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  } = {},
) {
  const {
    limit = 12,
    skip = 0,
    search = "",
    sortBy = "",
    order = "asc",
  } = options;

  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set("skip", String(skip));

  if (search.trim()) {
    params.set("q", search.trim());

    return request<ListResponse>(`/${resource}/search?${params.toString()}`);
  }

  if (sortBy) {
    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  return request<ListResponse>(`/${resource}?${params.toString()}`);
}

export function fetchResourceById(resource: string, id: string) {
  return request<Record<string, unknown>>(`/${resource}/${id}`);
}

export function createResource(
  resource: string,
  body: Record<string, unknown>,
) {
  return request<Record<string, unknown>>(`/${resource}/add`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function updateResource(
  resource: string,
  id: string,
  body: Record<string, unknown>,
) {
  return request<Record<string, unknown>>(`/${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export function deleteResource(resource: string, id: string) {
  return request<Record<string, unknown>>(`/${resource}/${id}`, {
    method: "DELETE",
  });
}
