"use client"
import { useEffect, useState } from "react"
import { Box, Container, Typography, Alert } from "@mui/material"

import { fetchModels } from "@/features/tabela-fipe/vehicle-model-slice"

import { fetchPrice } from "@/features/tabela-fipe/vehicle-details-slice"
import { BrandSelect } from "./vehicle-brand-select"
import { ConsultButton } from "./consult-button"
import { ModelSelect } from "./vehicle-model-select"

import { YearSelect } from "./model-vehicle-year-select"
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/tabela-fipe/hooks/hooks"
import { VehicleDetails } from "./vehicle-details"
import { fetchBrands } from "@/features/tabela-fipe/vehicle-brand-slice"
import { fetchYears } from "@/features/tabela-fipe/vehicle-model-years-slice"

export const FipeTable = () => {
  const dispatch = useAppDispatch()
  const { brandError, brandLoading } = useAppSelector((state) => state.brands)
  const { modelLoading } = useAppSelector((state) => state.models)
  const { yearLoading } = useAppSelector((state) => state.years)
  const { vehicleDetails } = useAppSelector((state) => state.vehicleDetail)

  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [showVehiclePrice, setShowVehiclePrice] = useState(false)
  const [isInitialLoadBrand, setIsInitialLoadBrand] = useState(true)
  const [isInitialLoadModel, setIsInitialLoadModel] = useState(true)
  const [isInitialLoadYear, setIsInitialLoadYear] = useState(true)

  useEffect(() => {
    dispatch(fetchBrands()).finally(() => setIsInitialLoadBrand(false))
    setSelectedModel("")
    setSelectedYear("")
  }, [dispatch, selectedBrand])

  useEffect(() => {
    if (selectedBrand) {
      dispatch(fetchModels(selectedBrand)).finally(() =>
        setIsInitialLoadModel(false)
      )
    } else {
      setSelectedModel("")
      setSelectedYear("")
    }
  }, [selectedBrand])

  useEffect(() => {
    if (selectedModel) {
      dispatch(
        fetchYears({ brandCode: selectedBrand, modelCode: selectedModel })
      ).finally(() => setIsInitialLoadYear(false))
    } else {
      setSelectedYear("")
    }
  }, [selectedModel])

  const checkVehiclePrice = async () => {
    dispatch(
      fetchPrice({
        brandCode: selectedBrand,
        modelCode: selectedModel,
        yearCode: selectedYear,
      })
    )
    setSelectedBrand("")
    setSelectedModel("")
    setSelectedYear("")
    setShowVehiclePrice(true)
  }

  if (brandError) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {brandError}
          <button
            onClick={() => dispatch(fetchBrands())}
            style={{ marginLeft: "10px" }}
          >
            Tentar novamente
          </button>
        </Alert>
      </Container>
    )
  }

  return (
    <Container
      maxWidth="md"
      sx={{ textAlign: "center", mt: 4, boxShadow: 3, padding: 10 }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "2.5rem", fontWeight: "bold", mb: 2 }}
      >
        Tabela Fipe
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Consulte o valor de um veículo de forma gratuita
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
        }}
      >
        <BrandSelect
          value={selectedBrand}
          onChange={setSelectedBrand}
          loading={brandLoading}
          initialLoad={isInitialLoadBrand}
        />

        <ModelSelect
          value={selectedModel}
          onChange={setSelectedModel}
          loading={modelLoading}
          initialLoad={isInitialLoadModel}
          disabled={!selectedBrand}
        />

        <YearSelect
          value={selectedYear}
          onChange={setSelectedYear}
          loading={yearLoading}
          initialLoad={isInitialLoadYear}
          disabled={!selectedModel}
        />

        <ConsultButton disabled={!selectedYear} onClick={checkVehiclePrice} />

        {vehicleDetails && showVehiclePrice && (
          <VehicleDetails vehicleDetails={vehicleDetails} />
        )}
      </Box>
    </Container>
  )
}
