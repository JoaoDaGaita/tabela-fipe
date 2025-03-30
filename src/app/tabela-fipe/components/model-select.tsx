"use client"
import { TextField, CircularProgress } from "@mui/material"
import { useAppSelector } from "@/hooks/hooks"

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
      <option value="">{loading ? "" : disabled ? "" : ""}</option>
      {modelList?.map((model) => (
        <option key={model.codigo} value={model.codigo}>
          {model.nome}
        </option>
      ))}
    </TextField>
  )
}
