import type { AxiosRequestConfig } from "axios"
import { HttpClient } from "../../http-client.base"
import type { VehicleBrand } from "@/types/fipe.types"
import { FIPE_CONFIG } from "../../http-client.base"

export class FipeVehicleBrandClient extends HttpClient {
  constructor(config?: AxiosRequestConfig) {
    super(FIPE_CONFIG.BASE_URL, {
      timeout: FIPE_CONFIG.TIMEOUT,
      ...config,
    })
  }

  public async getAll(): Promise<VehicleBrand[]> {
    const response = await this.instance.get<VehicleBrand[]>("/marcas")
    return response.data
  }
}
