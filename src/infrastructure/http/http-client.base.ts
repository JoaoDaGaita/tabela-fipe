import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"

export const FIPE_CONFIG = {
  BASE_URL: "https://parallelum.com.br/fipe/api/v1/carros",
  TIMEOUT: 10000,
}

export class HttpClient {
  protected readonly instance: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL: "https://parallelum.com.br/fipe/api/v1/carros",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    })
  }
}
