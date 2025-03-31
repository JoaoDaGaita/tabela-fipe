"use client"
import { useAppSelector } from "@/features/tabela-fipe/hooks/hooks"
import { TextField, CircularProgress, InputAdornment } from "@mui/material"

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
      {/* arrumar caso não haja um ano valido */}
      {yearList?.map((year) => (
        <option key={year.codigo} value={year.codigo}>
          {year.nome}
        </option>
      ))}
    </TextField>
  )
}
