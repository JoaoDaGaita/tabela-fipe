import { FipeModelVehicleYearsClient } from "@/infrastructure/http/clients/fipe/model-vehicle-years-client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Year {
  codigo: number
  nome: string
}

interface YearState {
  yearList: Year[]
  yearLoading: boolean
  yearError: string | null
}

const initialState: YearState = {
  yearList: [],
  yearLoading: false,
  yearError: null,
}

interface YearParams {
  brandCode: string
  modelCode: string
}

export const fetchYears = createAsyncThunk(
  "years/fetchYears",
  async (params: YearParams, { rejectWithValue }) => {
    try {
      const vehicleModelClient = await new FipeModelVehicleYearsClient()
      return await vehicleModelClient.getAll(params.brandCode, params.modelCode)
    } catch (modelError) {
      console.error("Erro ao buscar anos:", modelError)
      return rejectWithValue("Aconteceu um erro inesperado.")
    }
  }
)

const yearSlice = createSlice({
  name: "years",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchYears.pending, (state) => {
        state.yearLoading = true
        state.yearError = null
      })
      .addCase(fetchYears.fulfilled, (state, action) => {
        state.yearLoading = false
        state.yearList = action.payload || []
      })
      .addCase(fetchYears.rejected, (state, action) => {
        state.yearLoading = false
        state.yearError = action.error.message || "Falha ao carregar yearos"
        state.yearList = []
      })
  },
})

export default yearSlice.reducer
