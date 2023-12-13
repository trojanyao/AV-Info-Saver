import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import adapter from 'axios-userscript-adapter'

export function get<T = any, R = AxiosResponse<T>> (url: string, config?: Exclude<Partial<AxiosRequestConfig>, 'adapter'>): Promise<R> {
  return axios.get(url, {
    adapter,
    ...config
  })
}

export function post<T = any, R = AxiosResponse<T>> (url: string, data?: any, config?: Exclude<Partial<AxiosRequestConfig>, 'adapter'>): Promise<R> {
  return axios.post(url, data, {
    adapter,
    ...config
  })
}

// 代码暂停执行
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
