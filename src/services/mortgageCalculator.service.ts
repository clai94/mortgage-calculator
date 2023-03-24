import { CalculatePaymentPerPaymentScheduleDTO } from '../dtos/calculatePaymentPerPaymentSchedule.dto';
import { PaymentSchedule } from '../enums/paymentSchedule.enum';

/**
 * Payments per payment scheduled calculated using the following formula:
 * M = P (r(1 + r)^n / (1 + r)^n - 1))
 */
export const calculatePaymentPerPaymentSchedule = (inputs: CalculatePaymentPerPaymentScheduleDTO): string => {
    const principle = inputs.propertyPrice - inputs.downPayment;
    const paymentsPerPaymentSchedule = getPaymentsPerPaymentSchedule(inputs.paymentSchedule);

    if (!paymentsPerPaymentSchedule) throw new Error('Invalid payment schedule');

    const totalNumberOfPayments = inputs.amortizationPeriod * paymentsPerPaymentSchedule;
    const perPaymentScheduleInterestRate = inputs.annualInterestRate / paymentsPerPaymentSchedule;

    const totalPerPaymentScheduleInterestRate = Math.pow(1 + perPaymentScheduleInterestRate, totalNumberOfPayments);

    const numerator = perPaymentScheduleInterestRate * totalPerPaymentScheduleInterestRate;
    const denominator = totalPerPaymentScheduleInterestRate - 1;

    const paymentPerPaymentSchedule = principle * (numerator / denominator);

    return paymentPerPaymentSchedule.toFixed(2);
};

export const getPaymentsPerPaymentSchedule = (paymentSchedule: PaymentSchedule): number => {
    if (paymentSchedule === PaymentSchedule.AcceleratedBiWeekly) return 26;
    else if (paymentSchedule === PaymentSchedule.BiWeekly) return 24;
    else if (paymentSchedule === PaymentSchedule.Monthly) return 12;
    else return 0;
};
