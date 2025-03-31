import type { AxiosRequestConfig } from "axios"
import { HttpClient } from "../../http-client.base"

import { FIPE_CONFIG } from "../../http-client.base"
import type { VehicleDetails } from "@/types/fipe.types"

export class FipeVehicleDetailsClient extends HttpClient {
  constructor(config?: AxiosRequestConfig) {
    super(FIPE_CONFIG.BASE_URL, {
      timeout: FIPE_CONFIG.TIMEOUT,
      ...config,
    })
  }

  public async getAll(
    brandCode: string,
    modelCode: string,
    yearCode: string
  ): Promise<VehicleDetails> {
    const response = await this.instance.get<VehicleDetails>(
      `/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
    )

    return response.data
  }
}
