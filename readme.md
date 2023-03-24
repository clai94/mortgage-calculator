# Mortgage Calculator

A BC mortgage calculator API that calculates payment per payment schedule.

## Getting started

1. run `npm i`
2. run `npm run build`
3. run `npm run start`

By default the dev server will run on port 3000.

The payment per payment schedule can be calculated by sending a `POST` request to `localhost:3000/mortgage-calculator` with the following request body:

```{
    amortizationPeriod: number;
    annualInterestRate: number;
    downPayment: number;
    paymentSchedule: PaymentSchedule;
    propertyPrice: number;
}```

## Tests

Tests can be run by running:

`npm run test`