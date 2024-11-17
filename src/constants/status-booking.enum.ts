export enum StatusBookings {
  Pendiente = 'pendiente',
  Completada = 'completada',
  Cancelada = 'cancelada',
}

export function validateStatus(status: string): StatusBookings {
  if (Object.values(StatusBookings).includes(status as StatusBookings)) {
    return status as StatusBookings;
  }
  throw new Error('Estado no válido');
}