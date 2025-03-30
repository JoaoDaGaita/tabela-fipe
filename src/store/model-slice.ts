import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface Model {
  codigo: number
  nome: string
}

interface ModelState {
  modelList: Model[]
  modelLoading: boolean
  modelError: string | null
}

const initialState: ModelState = {
  modelList: [],
  modelLoading: false,
  modelError: null,
}

export const fetchModels = createAsyncThunk(
  "models/fetchModels",
  async (brandCode: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandCode}/modelos`
      )

      return response.data.modelos
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
        state.modelList = []
      })
  },
})

export default modelSlice.reducer
