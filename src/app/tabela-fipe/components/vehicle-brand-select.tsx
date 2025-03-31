"use client"
import { useAppSelector } from "@/features/tabela-fipe/hooks/hooks"
import { TextField, CircularProgress, InputAdornment } from "@mui/material"

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
  const { brandList } = useAppSelector((state) => state.brands)

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
      slotProps={{
        select: {
          native: true,
          displayEmpty: true,
        },
        inputLabel: {
          shrink: initialLoad ? false : undefined,
        },
        input: {
          startAdornment: loading && (
            <InputAdornment position="start">
              <CircularProgress size={20} sx={{ mr: 1 }} />
            </InputAdornment>
          ),
        },
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
