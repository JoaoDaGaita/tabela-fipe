import { FipeVehicleBrandClient } from "@/infrastructure/http/clients/fipe/vehicle-brand-client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Brand {
  codigo: string
  nome: string
}

interface BrandState {
  brandList: Brand[]
  brandLoading: boolean
  brandError: string | null
}

const initialState: BrandState = {
  brandList: [],
  brandLoading: false,
  brandError: null,
}

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const vehicleBrandClient = new FipeVehicleBrandClient()
      return vehicleBrandClient.getAll()
    } catch (error) {
      console.error("Erro ao buscar marcas:", error)
      return rejectWithValue("Aconteceu um erro inesperado.")
    }
  }
)

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandLoading = true
        state.brandError = null
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandLoading = false
        state.brandList = action.payload || []
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.brandLoading = false
        state.brandError = action.error.message || "Falha ao carregar marcas"
        state.brandList = []
      })
  },
})

export default brandSlice.reducer
