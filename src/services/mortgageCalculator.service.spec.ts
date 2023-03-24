import { CalculatePaymentPerPaymentScheduleDTO } from '../dtos/calculatePaymentPerPaymentSchedule.dto';
import { PaymentSchedule } from '../enums/paymentSchedule.enum';
import { calculatePaymentPerPaymentSchedule, getPaymentsPerPaymentSchedule } from './mortgageCalculator.service';

describe('mortgageCalculator', () => {
    describe('calculatePaymentPerPaymentSchedule', () => {
        it('should fail given an invalid payment schedule', () => {
            try {
                const inputs: CalculatePaymentPerPaymentScheduleDTO = {
                    amortizationPeriod: 5,
                    annualInterestRate: 0.05,
                    downPayment: 100000,
                    paymentSchedule: 'abc' as PaymentSchedule,
                    propertyPrice: 500000,
                };

                calculatePaymentPerPaymentSchedule(inputs);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid payment schedule'));
            }
        });

        it('should return 1780.33 given the following inputs', () => {
            const inputs: CalculatePaymentPerPaymentScheduleDTO = {
                amortizationPeriod: 20,
                annualInterestRate: 0.1,
                downPayment: 100000,
                paymentSchedule: PaymentSchedule.AcceleratedBiWeekly,
                propertyPrice: 500000,
            };

            const actual = calculatePaymentPerPaymentSchedule(inputs);

            expect(actual).toEqual('1780.33');
        });

        it('should return 2225.41 given the following inputs', () => {
            const inputs: CalculatePaymentPerPaymentScheduleDTO = {
                amortizationPeriod: 20,
                annualInterestRate: 0.1,
                downPayment: 100000,
                paymentSchedule: PaymentSchedule.AcceleratedBiWeekly,
                propertyPrice: 600000,
            };

            const actual = calculatePaymentPerPaymentSchedule(inputs);

            expect(actual).toEqual('2225.41');
        });

        it('should return 2410.98 given the following inputs', () => {
            const inputs: CalculatePaymentPerPaymentScheduleDTO = {
                amortizationPeriod: 20,
                annualInterestRate: 0.1,
                downPayment: 100000,
                paymentSchedule: PaymentSchedule.BiWeekly,
                propertyPrice: 600000,
            };

            const actual = calculatePaymentPerPaymentSchedule(inputs);

            expect(actual).toEqual('2410.98');
        });

        it('should return 4825.11 given the following inputs', () => {
            const inputs: CalculatePaymentPerPaymentScheduleDTO = {
                amortizationPeriod: 20,
                annualInterestRate: 0.1,
                downPayment: 100000,
                paymentSchedule: PaymentSchedule.Monthly,
                propertyPrice: 600000,
            };

            const actual = calculatePaymentPerPaymentSchedule(inputs);

            expect(actual).toEqual('4825.11');
        });
    });

    describe('getPaymentsPerPaymentSchedule', () => {
        it('should return 26 given "accelerated bi-weekly"', () => {
            const paymentSchedule = PaymentSchedule.AcceleratedBiWeekly;
            const actual = getPaymentsPerPaymentSchedule(paymentSchedule);
            expect(actual).toEqual(26);
        });

        it('should return 24 given "bi-weekly"', () => {
            const paymentSchedule = PaymentSchedule.BiWeekly;
            const actual = getPaymentsPerPaymentSchedule(paymentSchedule);
            expect(actual).toEqual(24);
        });

        it('should return 12 given "monthly"', () => {
            const paymentSchedule = PaymentSchedule.Monthly;
            const actual = getPaymentsPerPaymentSchedule(paymentSchedule);
            expect(actual).toEqual(12);
        });

        it('should return 0 given a non enum value', () => {
            const paymentSchedule = 'abc' as PaymentSchedule;
            const actual = getPaymentsPerPaymentSchedule(paymentSchedule);
            expect(actual).toEqual(0);
        });
    });
});
