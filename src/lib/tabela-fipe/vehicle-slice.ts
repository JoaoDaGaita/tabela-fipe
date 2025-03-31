import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface PriceParams {
  brandCode: string
  modelCode: string
  yearCode: string
}

export interface VehiclePrice {
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
  price: VehiclePrice
  priceLoading: boolean
  priceError: string | null
}

const initialState: PriceState = {
  price: {} as VehiclePrice,
  priceLoading: false,
  priceError: null,
}

export const fetchPrice = createAsyncThunk(
  "price/fetchPrice",
  async (
    { brandCode, modelCode, yearCode }: PriceParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`
      )

      return response.data
    } catch (priceError) {
      console.error("Erro ao buscar preço:", priceError)
      return rejectWithValue("Aconteceu um erro inesperado.")
    }
  }
)

const priceSlice = createSlice({
  name: "price",
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
        state.price = action.payload || {}
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.priceLoading = false
        state.priceError = action.error.message || "Falha ao carregar priceos"
        state.price = {} as VehiclePrice
      })
  },
})

export default priceSlice.reducer
