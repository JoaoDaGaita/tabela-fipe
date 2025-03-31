import { configureStore } from "@reduxjs/toolkit"
import vehicleBrandReducer from "@/store/slices/vehicle-brand/slice"
import vehicleModelReducer from "@/store/slices/vehicle-model/slice"
import modelVehicleYearReducer from "@/store/slices/vehicle-model-years/slice"
import vehicleDetailReducer from "@/store/slices/vehicle-details/slice"

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
