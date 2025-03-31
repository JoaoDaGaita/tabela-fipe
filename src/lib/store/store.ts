import { configureStore } from "@reduxjs/toolkit"
import brandReducer from "../tabela-fipe/brand-slice"
import modelReducer from "../tabela-fipe/model-slice"
import yearReducer from "../tabela-fipe/year-slice"
import priceReducer from "../tabela-fipe/vehicle-slice"

export const store = configureStore({
  reducer: {
    brands: brandReducer,
    models: modelReducer,
    years: yearReducer,
    price: priceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
