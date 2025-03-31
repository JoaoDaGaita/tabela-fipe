import { FipeVehicleDetailsClient } from "@/infrastructure/http/clients/fipe/vehicle-details-client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface PriceParams {
  brandCode: string
  modelCode: string
  yearCode: string
}

export interface VehicleDetailsModel {
  TipoVeiculo: number
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  MesReferencia: string
  SiglaCombustivel: string
}

interface PriceState {
  vehicleDetails: VehicleDetailsModel
  priceLoading: boolean
  priceError: string | null
}

const initialState: PriceState = {
  vehicleDetails: {} as VehicleDetailsModel,
  priceLoading: false,
  priceError: null,
}

export const fetchPrice = createAsyncThunk(
  "vehicleDetails/fetchPrice",
  async (
    { brandCode, modelCode, yearCode }: PriceParams,
    { rejectWithValue }
  ) => {
    try {
      const vehicleDetails = new FipeVehicleDetailsClient()
      return vehicleDetails.getAll(brandCode, modelCode, yearCode)
    } catch (priceError) {
      console.error("Erro ao buscar preço:", priceError)
      return rejectWithValue("Aconteceu um erro inesperado.")
    }
  }
)

const vehicleDetailsSlice = createSlice({
  name: "vehicleDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.priceLoading = true
        state.priceError = null
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.priceLoading = false
        //state.price = action.payload
        state.vehicleDetails = action.payload
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.priceLoading = false
        state.priceError = action.error.message || "Falha ao carregar priceos"
        state.vehicleDetails = {} as VehicleDetailsModel
      })
  },
})

export default vehicleDetailsSlice.reducer
