import { Request, Response, NextFunction } from 'express';
import * as mortgageCalculatorService from '../services/mortgageCalculator.service';
import { validateMortgageCalculatorInputsOrFail } from '../services/mortgageCalculatorValidator.service';

export const calculatePaymentPerPaymentSchedule = (req: Request, res: Response, next: NextFunction): void => {
    try {
        validateMortgageCalculatorInputsOrFail(req.body);
        res.json({ paymentPerMonthlySchedule: mortgageCalculatorService.calculatePaymentPerPaymentSchedule(req.body) });
    } catch (err: any) {
        console.error('Error calculating payment per payment schedule', err.message);
        res.status(err.status ?? 500).json({ error: err.message ?? 'Error calculating payment per payment schedule' });
    }
};
