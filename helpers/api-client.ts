import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { apiUrl } from '../env'

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
}

type Error = {
  status: StatusCode
}

class Http {
  private instance: AxiosInstance | null = null

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp()
  }

  initHttp() {
    const http = axios.create({
      baseURL: apiUrl,
      headers,
    })

    http.interceptors.response.use(
      response => response,
      error => {
        const { response } = error
        return this.handleError(response)
      },
    )

    this.instance = http
    return http
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config)
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config)
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.post<T, R>(url, data, config)
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.put<T, R>(url, data, config)
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config)
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code

  private handleError(error: Error) {
    const { status } = error

    switch (status) {
      case StatusCode.InternalServerError: {
        break
      }
      case StatusCode.Forbidden: {
        break
      }
      case StatusCode.Unauthorized: {
        break
      }
      case StatusCode.TooManyRequests: {
        break
      }
    }

    return Promise.reject(error)
  }
}

export const http = new Http()
