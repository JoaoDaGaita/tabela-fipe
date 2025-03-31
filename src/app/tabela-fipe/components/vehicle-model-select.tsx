"use client"
import { useAppSelector } from "@/features/tabela-fipe/hooks/hooks"
import { TextField, CircularProgress, InputAdornment } from "@mui/material"

interface ModelSelectProps {
  value: string
  onChange: (value: string) => void
  loading: boolean
  initialLoad: boolean
  disabled: boolean
}

export const ModelSelect = ({
  value,
  onChange,
  loading,
  initialLoad,
  disabled,
}: ModelSelectProps) => {
  const { modelList } = useAppSelector((state) => state.models)

  return (
    <TextField
      select
      label="Modelo"
      variant="outlined"
      sx={{ mb: 3 }}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      value={value}
      disabled={disabled || loading}
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
      <option value="">{loading ? "" : disabled ? "" : ""}</option>
      {modelList?.modelos.map((model) => (
        <option key={model.codigo} value={model.codigo}>
          {model.nome}
        </option>
      ))}
    </TextField>
  )
}
