export const API_URL = process.env.REACT_APP_BACKEND_API_URL

export interface BaseApiResponse<Data = undefined> {
  message: string
  data?: Data
}

export interface Signature {
  payloadMessage: string
  signature: string
  publicKey: string
}

export interface Payload {
  timestamp: Date
}