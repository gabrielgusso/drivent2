import { prisma } from '@/config';
import { TicketType, Ticket } from '@/protocols';

async function findManyTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicket(id: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: id,
    },
  });
}

async function findicketType(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number){
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: "RESERVED" 
    }
  })
}

const ticketsRepository = {
  findManyTicketsTypes,
  findTicket,
  findicketType,
  createTicket
};

export default ticketsRepository;
