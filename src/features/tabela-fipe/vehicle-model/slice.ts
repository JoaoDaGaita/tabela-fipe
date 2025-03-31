import { FipeVehicleModelClient } from "@/infrastructure/http/clients/fipe/vehicle-model-client"
import type { VehicleModel } from "@/types/fipe.types"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface ModelState {
  modelList: VehicleModel
  modelLoading: boolean
  modelError: string | null
}

const initialState: ModelState = {
  modelList: { modelos: [] },
  modelLoading: false,
  modelError: null,
}

export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (brandCode: string, { rejectWithValue }) => {
    try {
      const vehicleModelClient = await new FipeVehicleModelClient()
      return await vehicleModelClient.getAll(brandCode)
    } catch (modelError) {
      console.error("Erro ao buscar modelos:", modelError)
      return rejectWithValue("Aconteceu um erro inesperado.")
    }
  }
)

const modelSlice = createSlice({
  name: "models",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.modelLoading = true
        state.modelError = null
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.modelLoading = false
        state.modelList = action.payload || []
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.modelLoading = false
        state.modelError = action.error.message || "Falha ao carregar modelos"
        state.modelList = { modelos: [] }
      })
  },
})

export default modelSlice.reducer
