import type { AxiosRequestConfig } from "axios"
import { HttpClient } from "../../http-client.base"

import { FIPE_CONFIG } from "../../http-client.base"
import type { ModelYearVariant } from "@/types/fipe.types"

export class FipeModelVehicleYearsClient extends HttpClient {
  constructor(config?: AxiosRequestConfig) {
    super(FIPE_CONFIG.BASE_URL, {
      timeout: FIPE_CONFIG.TIMEOUT,
      ...config,
    })
  }

  public async getAll(
    brandCode: string,
    modelCode: string
  ): Promise<ModelYearVariant[]> {
    const response = await this.instance.get<ModelYearVariant[]>(
      `/marcas/${brandCode}/modelos/${modelCode}/anos`
    )

    return response.data
  }
}
