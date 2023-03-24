import express from 'express';
import * as mortgageCalculatorController from '../controllers/mortgageCalculator.controller';

export const mortgageCalculatorRouter = express.Router();

mortgageCalculatorRouter.post('/', mortgageCalculatorController.calculatePaymentPerPaymentSchedule);
