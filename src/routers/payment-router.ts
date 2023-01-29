import { Router } from "express";
import { getPayments } from "@/controllers/payment-controller";
import { authenticateToken } from "@/middlewares";

const paymentRouter = Router()

paymentRouter
    .all("/*", authenticateToken)
    .get("/", getPayments)
    .post("/process", );

export { paymentRouter };
