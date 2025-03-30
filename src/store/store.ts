import { configureStore } from "@reduxjs/toolkit"
import brandReducer from "./brand-slice"
import modelReducer from "./model-slice"
import yearReducer from "./year-slice"
import priceReducer from "./vehicle-slice"

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
