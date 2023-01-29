import { prisma } from '@/config';
import { TicketType, Ticket } from '@/protocols';

async function findManyTicketsTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function findTicket(id: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId: id,
    },
  });
}

async function findTicketById(id: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

async function findicketType(ticketTypeId: number): Promise<TicketType> {
  return await prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
  });
}

async function updateTicketStatus(ticketId: number) {
  return await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
}

const ticketsRepository = {
  findManyTicketsTypes,
  findTicket,
  findicketType,
  createTicket,
  findTicketById,
  updateTicketStatus,
};

export default ticketsRepository;
