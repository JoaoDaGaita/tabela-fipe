"use client"
import { TextField, CircularProgress } from "@mui/material"
import { useAppSelector } from "@/hooks/hooks"

interface BrandSelectProps {
  value: string
  onChange: (value: string) => void
  loading: boolean
  initialLoad: boolean
}

export const BrandSelect = ({
  value,
  onChange,
  loading,
  initialLoad,
}: BrandSelectProps) => {
  const { brandList = [] } = useAppSelector((state) => state.brands)

  return (
    <TextField
      select
      label="Marca"
      variant="outlined"
      fullWidth
      sx={{ mb: 3 }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={loading}
      SelectProps={{
        native: true,
        displayEmpty: true,
      }}
      InputLabelProps={{
        shrink: initialLoad ? false : undefined,
      }}
      InputProps={{
        startAdornment: loading && (
          <CircularProgress size={20} sx={{ mr: 1 }} />
        ),
      }}
    >
      <option value="" disabled hidden>
        {loading ? "Carregando marcas..." : ""}
      </option>
      {brandList.map((brand) => (
        <option key={brand.codigo} value={brand.codigo}>
          {brand.nome}
        </option>
      ))}
    </TextField>
  )
}
