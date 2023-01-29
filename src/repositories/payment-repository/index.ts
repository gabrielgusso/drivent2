import { prisma } from '@/config';

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
    },
  });
}

const paymentRepository = {
  findPayment,
};

export default paymentRepository;
