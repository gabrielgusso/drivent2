import { Router } from "express";
import { getPayments, postPayment } from "@/controllers/payment-controller";
import { authenticateToken } from "@/middlewares";

const paymentRouter = Router()

paymentRouter
    .all("/*", authenticateToken)
    .get("/", getPayments)
    .post("/process", postPayment);

export { paymentRouter };
