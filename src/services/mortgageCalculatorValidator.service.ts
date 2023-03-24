import { CalculatePaymentPerPaymentScheduleDTO } from '../dtos/calculatePaymentPerPaymentSchedule.dto';
import { PaymentSchedule } from '../enums/paymentSchedule.enum';

export const validateMortgageCalculatorInputsOrFail = (inputs: CalculatePaymentPerPaymentScheduleDTO): void => {
    try {
        isAmortizationPeriodValidOrFail(inputs.amortizationPeriod);
        isAnnualInterestRateValidOrFail(inputs.annualInterestRate);
        isPropertyPriceValidOrFail(inputs.propertyPrice);
        isDownPaymentValidOrFail(inputs.downPayment, inputs.propertyPrice);
        isPaymentScheduleValidOrFail(inputs.paymentSchedule);
        isPrincipleValidOrFail(inputs.propertyPrice, inputs.downPayment);
    } catch (error: any) {
        error.status = 400;
        throw error;
    }
};

export const isAmortizationPeriodValidOrFail = (amortizationPeriod: number): boolean => {
    if (typeof amortizationPeriod !== 'number') throw new Error('Invalid amortization period, must be a number');
    if (amortizationPeriod <= 30 && amortizationPeriod >= 5 && amortizationPeriod % 5 === 0) return true;
    else if (amortizationPeriod > 30)
        throw new Error('Invalid amortization period, amortization period cannot exceed 30 years');
    else if (amortizationPeriod < 5)
        throw new Error('Invalid amortization period, amortization period must be at least 5 years');
    else throw new Error('Invalid amortization period, amortization period must be in increments of 5 years');
};

export const isAnnualInterestRateValidOrFail = (annualInterestRate: number): boolean => {
    if (typeof annualInterestRate !== 'number') throw new Error('Invalid interest rate, must be a number');
    if (annualInterestRate > 0 && annualInterestRate < 1) return true;
    else throw new Error('Invalid interest rate');
};

export const isDownPaymentValidOrFail = (downPayment: number, propertyPrice: number): boolean => {
    if (typeof downPayment !== 'number') throw new Error('Invalid down payment, must be a number');
    if (typeof propertyPrice !== 'number') throw new Error('Invalid property price, must be a number');
    if (downPayment < 0) throw new Error('Invalid down payment');
    if (downPayment < 0.05 * propertyPrice)
        throw new Error('Invalid down payment, must be at least 5% of property value');
    else return true;
};

export const isPaymentScheduleValidOrFail = (paymentSchedule: PaymentSchedule): boolean => {
    if (Object.values(PaymentSchedule).includes(paymentSchedule)) return true;
    else throw new Error('Invalid payment schedule');
};

export const isPrincipleValidOrFail = (propertyPrice: number, downPayment: number): boolean => {
    if (typeof propertyPrice !== 'number') throw new Error('Invalid property price, must be a number');
    if (typeof downPayment !== 'number') throw new Error('Invalid down payment, must be a number');
    if (propertyPrice > downPayment) return true;
    else throw new Error('Invalid principle, down payment is greater than property price');
};

export const isPropertyPriceValidOrFail = (propertyPrice: number): boolean => {
    if (typeof propertyPrice !== 'number') throw new Error('Invalid property price, must be a number');
    if (propertyPrice > 0) return true;
    else throw new Error('Invalid property price');
};
