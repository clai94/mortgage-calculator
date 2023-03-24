import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { mortgageCalculatorRouter } from './src/routes/mortgageCalculator.route';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Produce8 coding exercise to determine monthly payments.');
});

app.use('/mortgage-calculator', mortgageCalculatorRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
