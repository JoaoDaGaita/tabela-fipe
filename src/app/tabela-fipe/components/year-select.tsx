"use client"
import { TextField, CircularProgress } from "@mui/material"
import { useAppSelector } from "@/hooks/hooks"

interface YearSelectProps {
  value: string
  onChange: (value: string) => void
  loading: boolean
  initialLoad: boolean
  disabled: boolean
}

export const YearSelect = ({
  value,
  onChange,
  loading,
  initialLoad,
  disabled,
}: YearSelectProps) => {
  const { yearList } = useAppSelector((state) => state.years)

  return (
    <TextField
      select
      label="Ano"
      variant="outlined"
      value={value}
      sx={{ mb: 6 }}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
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
      {yearList?.map((year) => (
        <option key={year.codigo} value={year.codigo}>
          {year.nome}
        </option>
      ))}
    </TextField>
  )
}
