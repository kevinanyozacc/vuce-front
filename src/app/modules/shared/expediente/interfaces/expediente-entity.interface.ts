export interface ExpedienteEntityInterface {
  id: string;
  personId: string;
  personName: string;
  date: string;
  stdCodId: string;
  serviceId: string;
  serviceName: string;
  procedureId: string;
  procedureName: string;
  areaName: string;
  sedeId: string;
  sedeName: string;
  requestId: string;
  ucmId: string;
  ordenVuce: string;
  channel: string;
  numberRegArc: string | null;
}
