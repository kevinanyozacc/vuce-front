export interface DetalleCreateInterface {
  type: 'IMP' | 'EXP' | 'TIN';
  numberPSI?: string;
  countrySourceId?: string;
  countryTargetId?: string;
  place?: string;
}
