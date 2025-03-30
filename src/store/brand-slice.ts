import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
  try {
    const response = await axios.get(
      "https://parallelum.com.br/fipe/api/v1/carros/marcas"
    )
    return response.data
  } catch (error) {
    console.error("Erro ao buscar marcas:", error)
    throw error
  }
})

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
