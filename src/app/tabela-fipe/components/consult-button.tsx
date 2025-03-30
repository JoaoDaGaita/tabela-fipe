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
        padding: "20px",
        mb: 5,
        "&:hover": {
          backgroundColor: "#6a1b9a",
        },
      }}
      disabled={disabled}
      onClick={onClick}
    >
      Consultar preço
    </Button>
  )
}
