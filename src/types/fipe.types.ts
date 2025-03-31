export interface VehicleBrand {
  codigo: string
  nome: string
}

export interface Model {
  codigo: string
  nome: string
}

export interface VehicleModel {
  modelos: Model[]
  anos?: Model[]
}

export interface ModelYearVariant {
  codigo: number
  nome: string
}

export interface VehicleDetails {
  TipoVeiculo: number
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  MesReferencia: string
  SiglaCombustivel: string
}
