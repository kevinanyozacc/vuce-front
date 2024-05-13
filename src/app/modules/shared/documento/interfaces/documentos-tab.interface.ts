export enum TuparDocumentosResolutivosTabIdEnum {
    EXPEDIENTE = 'EXPEDIENTE',
    OBSERVACIONES = 'OBSERVACIONES',
    DERIVACION = 'DERIVACION',
    TRAZABILIDAD = 'TRAZABILIDAD',
    
  }
  
  export interface TupaDocumentosResolutivosTabInterface {
    id: TuparDocumentosResolutivosTabIdEnum;
    name: string;
    active: boolean;
  }
  