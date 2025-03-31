"use client"

import { useAppSelector } from "@/store/hooks"
import type { VehicleBrand } from "@/types/fipe.types"
import { TextField, CircularProgress, InputAdornment } from "@mui/material"

interface BrandSelectProps {
  value: string
  onChange: (value: string) => void
  initialLoad: boolean
}

export const BrandSelect = ({
  value,
  onChange,
  initialLoad,
}: BrandSelectProps) => {
  const { brandList, brandLoading } = useAppSelector((state) => state.brands)

  return (
    <TextField
      select
      label="Marca"
      variant="outlined"
      fullWidth
      sx={{ mb: 3 }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={brandLoading}
      slotProps={{
        select: {
          native: true,
          displayEmpty: true,
        },
        inputLabel: {
          shrink: initialLoad ? false : undefined,
        },
        input: {
          startAdornment: brandLoading && (
            <InputAdornment position="start">
              <CircularProgress size={20} sx={{ mr: 1 }} />
            </InputAdornment>
          ),
        },
      }}
    >
      <option value="" disabled hidden>
        {brandLoading ? "Carregando marcas..." : ""}
      </option>
      {brandList.map((brand: VehicleBrand) => (
        <option key={brand.codigo} value={brand.codigo}>
          {brand.nome}
        </option>
      ))}
    </TextField>
  )
}
