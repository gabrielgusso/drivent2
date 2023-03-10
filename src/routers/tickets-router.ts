import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes, getTicketByUser, postTicket } from "@/controllers/tickets-controller";

const ticketsRouter = Router()

ticketsRouter
    .all("/*", authenticateToken)
    .get("/types", getTicketsTypes)
    .get("/", getTicketByUser)
    .post("/", postTicket);

export { ticketsRouter };
