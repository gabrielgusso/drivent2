import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const ticketId = req.query.ticketId as string;
  const { userId } = req;

  try {
    const payment = await paymentService.getpayment(ticketId, userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'badRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    const payment = await paymentService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'badRequestError') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
