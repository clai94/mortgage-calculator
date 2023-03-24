import { PaymentSchedule } from '../enums/paymentSchedule.enum';

export interface CalculatePaymentPerPaymentScheduleDTO {
    amortizationPeriod: number;
    annualInterestRate: number;
    downPayment: number;
    paymentSchedule: PaymentSchedule;
    propertyPrice: number;
}
