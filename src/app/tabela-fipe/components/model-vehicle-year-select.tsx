"use client"

import { useAppSelector } from "@/store/hooks"
import type { ModelYearVariant } from "@/types/fipe.types"
import { TextField, CircularProgress, InputAdornment } from "@mui/material"

interface YearSelectProps {
  value: string
  onChange: (value: string) => void
  initialLoad: boolean
  disabled: boolean
}

export const YearSelect = ({
  value,
  onChange,
  initialLoad,
  disabled,
}: YearSelectProps) => {
  const { yearList, yearLoading } = useAppSelector((state) => state.years)

  return (
    <TextField
      select
      label="Ano"
      variant="outlined"
      value={value}
      sx={{ mb: 6 }}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      disabled={disabled || yearLoading}
      slotProps={{
        select: {
          native: true,
          displayEmpty: true,
        },
        inputLabel: {
          shrink: initialLoad ? false : undefined,
        },
        input: {
          startAdornment: yearLoading && (
            <InputAdornment position="start">
              <CircularProgress size={20} sx={{ mr: 1 }} />
            </InputAdornment>
          ),
        },
      }}
    >
      <option value="">{yearLoading ? "" : disabled ? "" : ""}</option>

      {yearList.length > 0
        ? yearList.map((year: ModelYearVariant) => (
            <option key={year.codigo} value={year.codigo}>
              {year.nome}
            </option>
          ))
        : !yearLoading &&
          !disabled && (
            <option value="" disabled>
              Nenhum ano encontrado para este modelo
            </option>
          )}
    </TextField>
  )
}
