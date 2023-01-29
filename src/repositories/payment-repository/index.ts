import { prisma } from '@/config';
import { Payment, PaymentBody } from '@/protocols';

async function findPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(payment: PaymentBody, value: number): Promise<Payment> {
  return prisma.payment.create({
    data: {
      ticketId: payment.ticketId,
      value,
      cardIssuer: payment.cardData.issuer,
      cardLastDigits: payment.cardData.number.toString().slice(-4),
    }
  });
}

const paymentRepository = {
  findPayment,
  createPayment
};

export default paymentRepository;
