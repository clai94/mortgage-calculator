import { PaymentSchedule } from '../enums/paymentSchedule.enum';
import {
    isAmortizationPeriodValidOrFail,
    isAnnualInterestRateValidOrFail,
    isDownPaymentValidOrFail,
    isPaymentScheduleValidOrFail,
    isPrincipleValidOrFail,
    isPropertyPriceValidOrFail,
} from './mortgageCalculatorValidator.service';

describe('mortgageCalculatorValidator', () => {
    describe('isAmortizationPeriodValidOrFail', () => {
        it('should fail if the amortization period is not a number', () => {
            try {
                const amortizationPeriod = '31a' as unknown as number;
                isAmortizationPeriodValidOrFail(amortizationPeriod);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid amortization period, must be a number'));
            }
        });

        it('should fail if the amortization period is greater than 30 years', () => {
            try {
                const amortizationPeriod = 31;
                isAmortizationPeriodValidOrFail(amortizationPeriod);
            } catch (err) {
                expect(err).toStrictEqual(
                    new Error('Invalid amortization period, amortization period cannot exceed 30 years')
                );
            }
        });

        it('should fail if the amortization period is less than 5 years', () => {
            try {
                const amortizationPeriod = 0;
                isAmortizationPeriodValidOrFail(amortizationPeriod);
            } catch (err) {
                expect(err).toStrictEqual(
                    new Error('Invalid amortization period, amortization period must be at least 5 years')
                );
            }
        });

        it('should fail if the amortization period is not an increment of 5', () => {
            try {
                const amortizationPeriod = 21;
                isAmortizationPeriodValidOrFail(amortizationPeriod);
            } catch (err) {
                expect(err).toStrictEqual(
                    new Error('Invalid amortization period, amortization period must be in increments of 5 years')
                );
            }
        });

        it('should return true if the amortization period is between 5 and 30 and is an increment of 5', () => {
            const amortizationPeriod = 25;
            const actual = isAmortizationPeriodValidOrFail(amortizationPeriod);
            expect(actual).toBe(true);
        });
    });

    describe('isAnnualInterestRateValidOrFail', () => {
        it('should fail if the annual interest rate is not a number', () => {
            try {
                const annualInterestRate = '0aaa';
                isAnnualInterestRateValidOrFail(annualInterestRate as unknown as number);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid interest rate, must be a number'));
            }
        });

        it('should fail if the annual interest rate is 0%', () => {
            try {
                const annualInterestRate = 0;
                isAnnualInterestRateValidOrFail(annualInterestRate);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid interest rate'));
            }
        });

        it('should fail if the annual interest rate is 100%', () => {
            try {
                const annualInterestRate = 1;
                isAnnualInterestRateValidOrFail(annualInterestRate);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid interest rate'));
            }
        });

        it('should return true if the annual interest rate is between 100% and 0%', () => {
            const annualInterestRate = 0.2;
            const actual = isAnnualInterestRateValidOrFail(annualInterestRate);
            expect(actual).toBe(true);
        });
    });

    describe('isDownPaymentValidOrFail', () => {
        it('should fail if the downpayment is not a number', () => {
            try {
                const downPayment = '-5';
                const propertyPrice = 500000;
                isDownPaymentValidOrFail(downPayment as unknown as number, propertyPrice);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid down payment, must be a number'));
            }
        });

        it('should fail if the property price is not a number', () => {
            try {
                const downPayment = 40000;
                const propertyPrice = '500000asdf';
                isDownPaymentValidOrFail(downPayment, propertyPrice as unknown as number);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid property price, must be a number'));
            }
        });

        it('should fail if the downpayment is less than 0', () => {
            try {
                const downPayment = -5;
                const propertyPrice = 500000;
                isDownPaymentValidOrFail(downPayment, propertyPrice);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid down payment'));
            }
        });

        it('should fail if down payment is less than 5% of the property price', () => {
            try {
                const downPayment = 1;
                const propertyPrice = 500000;
                isDownPaymentValidOrFail(downPayment, propertyPrice);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid down payment, must be at least 5% of property value'));
            }
        });

        it('should return true if down payment is 5% of more of the property value', () => {
            const downPayment = 10000;
            const propertyPrice = 100000;
            const actual = isDownPaymentValidOrFail(downPayment, propertyPrice);
            expect(actual).toBe(true);
        });
    });

    describe('isPaymentScheduleValidOrFail', () => {
        it('should return true if payment schedule is an enum value', () => {
            const paymentSchedule = PaymentSchedule.AcceleratedBiWeekly;
            const actual = isPaymentScheduleValidOrFail(paymentSchedule);
            expect(actual).toBe(true);
        });

        it('should return true if payment schedule is an enum value', () => {
            const paymentSchedule = PaymentSchedule.BiWeekly;
            const actual = isPaymentScheduleValidOrFail(paymentSchedule);
            expect(actual).toBe(true);
        });

        it('should return true if payment schedule is an enum value', () => {
            const paymentSchedule = PaymentSchedule.Monthly;
            const actual = isPaymentScheduleValidOrFail(paymentSchedule);
            expect(actual).toBe(true);
        });

        it('should fail if payment schedule is not enum value', () => {
            try {
                const paymentSchedule = 'hehe' as PaymentSchedule;
                const actual = isPaymentScheduleValidOrFail(paymentSchedule);
                expect(actual).toBe(true);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid payment schedule'));
            }
        });
    });

    describe('isPrincipleValidOrFail', () => {
        it('should fail if the downpayment is not a number', () => {
            try {
                const downPayment = '-5';
                const propertyPrice = 500000;
                isPrincipleValidOrFail(propertyPrice, downPayment as unknown as number);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid down payment, must be a number'));
            }
        });

        it('should fail if the property price is not a number', () => {
            try {
                const downPayment = 40000;
                const propertyPrice = '500000asdf';
                isPrincipleValidOrFail(propertyPrice as unknown as number, downPayment);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid property price, must be a number'));
            }
        });

        it('should fail if the down payment is greater than the property price', () => {
            try {
                const downPayment = 100000;
                const propertyPrice = 50;
                isPrincipleValidOrFail(propertyPrice, downPayment);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid principle, down payment is greater than property price'));
            }
        });

        it('should return true if the property value is greater than the down payment', () => {
            const propertyPrice = 100000;
            const downPayment = 50;
            const actual = isPrincipleValidOrFail(propertyPrice, downPayment);
            expect(actual).toBe(true);
        });
    });

    describe('isPropertyPriceValidOrFail', () => {
        it('should fail if the property value is not a number', () => {
            try {
                const propertyPrice = 'asdf';
                isPropertyPriceValidOrFail(propertyPrice as unknown as number);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid property price, must be a number'));
            }
        });

        it('should fail if the property value is 0 or negative', () => {
            try {
                const propertyPrice = 0;
                isPropertyPriceValidOrFail(propertyPrice);
            } catch (err) {
                expect(err).toStrictEqual(new Error('Invalid property price'));
            }
        });

        it('should return true if the property value is greater than 0', () => {
            const propertyPrice = 100;
            const actual = isPropertyPriceValidOrFail(propertyPrice);
            expect(actual).toBe(true);
        });
    });
});
