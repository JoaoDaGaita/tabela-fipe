"use client"
import { useEffect, useState } from "react"
import { Box, Container, Typography, Alert } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { fetchBrands } from "@/store/brand-slice"
import { fetchModels } from "@/store/model-slice"
import { fetchYears } from "@/store/year-slice"
import { fetchPrice } from "@/store/vehicle-slice"
import { BrandSelect } from "./brand-select"
import { ConsultButton } from "./consult-button"
import { ModelSelect } from "./model-select"
import { PriceResult } from "./price-result"
import { YearSelect } from "./year-select"

export const FipeTable = () => {
  const dispatch = useAppDispatch()
  const { brandError, brandLoading } = useAppSelector((state) => state.brands)
  const { modelLoading, modelList } = useAppSelector((state) => state.models)
  const { yearLoading, yearList } = useAppSelector((state) => state.years)
  const { price } = useAppSelector((state) => state.price)

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

      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Consulte o valor de um veículo de forma gratuita
      </Typography>

      <Box
        sx={{
          backgroundColor: "white",
          padding: "50px",
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

        {price && showVehiclePrice && <PriceResult price={price} />}
      </Box>
    </Container>
  )
}
