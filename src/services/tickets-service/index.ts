import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError, badRequestError } from '@/errors';
import { TicketType, TicketWithType } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';

export async function getTicketsTypes(): Promise<TicketType[]> {
  const ticketsTypes = await ticketsRepository.findManyTicketsTypes();
  if (!ticketsTypes) throw notFoundError();
  return ticketsTypes;
}

export async function getTickets(userId: number): Promise<TicketWithType> {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw notFoundError();
  const tickets = await ticketsRepository.findTicket(enrollment.id);
  if (!tickets) throw notFoundError();
  const ticketsTypes = await ticketsRepository.findicketType(tickets.ticketTypeId);
  return { ...tickets, TicketType: ticketsTypes };
}

export async function createTicket(userId: number, ticketTypeId: number): Promise<TicketWithType> {
  if (!ticketTypeId) throw badRequestError();
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.createTicket(enrollment.id, ticketTypeId);
  const ticketsTypes = await ticketsRepository.findicketType(ticket.ticketTypeId);
  return { ...ticket, TicketType: ticketsTypes };
}

const ticketsService = {
  getTicketsTypes,
  getTickets,
  createTicket,
};

export default ticketsService;
