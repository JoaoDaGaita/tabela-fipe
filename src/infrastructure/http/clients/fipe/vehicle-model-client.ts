import type { AxiosRequestConfig } from "axios"
import { HttpClient } from "../../http-client.base"

import { FIPE_CONFIG } from "../../http-client.base"
import type { VehicleModel } from "@/types/fipe.types"

export class FipeVehicleModelClient extends HttpClient {
  constructor(config?: AxiosRequestConfig) {
    super(FIPE_CONFIG.BASE_URL, {
      timeout: FIPE_CONFIG.TIMEOUT,
      ...config,
    })
  }

  public async getAll(brandCode: string): Promise<VehicleModel> {
    const response = await this.instance.get<VehicleModel>(
      `/marcas/${brandCode}/modelos`
    )

    return response.data
  }
}
