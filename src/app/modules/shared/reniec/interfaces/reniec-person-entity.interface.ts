export interface ReniecPersonEntityInterface {
  apellidoMaterno: string;
  apellidoPaterno: string;
  centroPoblado: string;
  correoElectronico: string;
  direccion: string;
  documentoNumero: string;
  documentoTipo: string;
  estadoJuridico: string;
  estadoNatural: string | null;
  fechaAlta: string;
  fechaBaja: string;
  fechaNacimiento: string;
  nombreComercial: string;
  nombreRazonSocial: string;
  nombres: string;
  pais: string | null;
  personaTipo: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  departamento: string;
  provincia: string;
  distrito: string;
  referenciaDireccion: string;
  ruc: string | null;
  telefono: string;
  telefonoMovil: string;
}
