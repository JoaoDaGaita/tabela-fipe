"use client"
import { Button } from "@mui/material"

interface ConsultButtonProps {
  disabled: boolean
  onClick: () => void
}

export const ConsultButton = ({ disabled, onClick }: ConsultButtonProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "blue",
        color: "white",
        padding: "10px",
        mb: 2,
        "&:hover": {
          backgroundColor: "blue",
        },
      }}
      disabled={disabled}
      onClick={onClick}
    >
      Consultar preço
    </Button>
  )
}
