import { configureStore } from "@reduxjs/toolkit"
import vehicleBrandReducer from "@/features/tabela-fipe/vehicle-brand-slice"
import vehicleModelReducer from "@/features/tabela-fipe/vehicle-model-slice"
import modelVehicleYearReducer from "@/features/tabela-fipe/vehicle-model-years-slice"
import vehicleDetailReducer from "@/features/tabela-fipe/vehicle-details-slice"

export const store = configureStore({
  reducer: {
    brands: vehicleBrandReducer,
    models: vehicleModelReducer,
    years: modelVehicleYearReducer,
    vehicleDetail: vehicleDetailReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
