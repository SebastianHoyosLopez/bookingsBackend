import { StatusBookings } from "src/constants/status-booking.enum";

export function validateStatus(status: string): StatusBookings {
    if (Object.values(StatusBookings).includes(status as StatusBookings)) {
      return status as StatusBookings;
    }
    throw new Error('Estado no válido');
  }

export function validateStatusTransition(currentStatus: StatusBookings, newStatus: StatusBookings): boolean {
  const allowedTransitions = {
    [StatusBookings.Pendiente]: [StatusBookings.Completada, StatusBookings.Cancelada],
    [StatusBookings.Completada]: [],
    [StatusBookings.Cancelada]: [],
  };
  return allowedTransitions[currentStatus]?.includes(newStatus) ?? false;
}