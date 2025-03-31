"use client"

import type { VehicleDetailsModel } from "@/features/tabela-fipe/vehicle-details-slice"
import { Card, CardContent, Typography, Box } from "@mui/material"

interface VehicleDetailsProps {
  vehicleDetails: VehicleDetailsModel
}

export const VehicleDetails = ({ vehicleDetails }: VehicleDetailsProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "lightgreen",
        margin: "0 auto",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: "bold",
            color: "#333",
            marginBottom: 1,
          }}
        >
          Tabela Fipe: Preço {vehicleDetails.Modelo} {vehicleDetails.AnoModelo}
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 1,
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            R$ {vehicleDetails.Valor}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: "italic" }}
        >
          Este é o preço de compra do veículo
        </Typography>
      </CardContent>
    </Card>
  )
}
