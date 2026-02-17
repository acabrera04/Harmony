import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { API_CONFIG } from "./constants";

type AuthChangeHandler = () => void;

/**
 * API Client for Harmony backend
 * Client-only — must not be imported in Server Components.
 * Auth tokens are read from cookies (httpOnly preferred) by the server;
 * on the client side, credentials are sent via cookies automatically.
 */
class ApiClient {
  private client: AxiosInstance;
  private onUnauthorized: AuthChangeHandler | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
      // Send cookies automatically so httpOnly auth cookies are included
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  /**
   * Register a callback for 401 responses instead of hard-redirecting.
   * The app shell can use this to redirect or show a login modal.
   */
  setOnUnauthorized(handler: AuthChangeHandler) {
    this.onUnauthorized = handler;
  }

  private setupInterceptors() {
    // Response interceptor - handle errors globally
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (this.onUnauthorized) {
            this.onUnauthorized();
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

/**
 * Lazily-created singleton — only instantiated on first access.
 * Throws if accidentally imported during SSR.
 */
let _instance: ApiClient | null = null;

export function getApiClient(): ApiClient {
  if (typeof window === "undefined") {
    throw new Error(
      "apiClient must not be used on the server. " +
      "Use fetch() with cookies from the request instead."
    );
  }
  if (!_instance) {
    _instance = new ApiClient();
  }
  return _instance;
}
