import paymentRepository from '@/repositories/payment-repository';
import { notFoundError, badRequestError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { Payment } from '@/protocols';

export async function getpayment(ticketId: string, userId: number): Promise<Payment> {
  if (!ticketId) throw badRequestError();
  const isNum = /^\d+$/.test(ticketId);
  if (!isNum) throw badRequestError();
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw notFoundError();
  const ticket = await ticketsRepository.findTicketById(Number(ticketId));
  if (!ticket) throw notFoundError();
  const ticketByEnrollment = await ticketsRepository.findTicket(enrollment.id);
  if (!ticketByEnrollment) throw unauthorizedError();
  const payment = await paymentRepository.findPayment(Number(ticketId));
  if (!payment) throw notFoundError();
  return payment;
}

export async function createTicket(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) throw badRequestError();
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw notFoundError();
}

const paymentService = {
  getpayment,
  createTicket,
};

export default paymentService;
