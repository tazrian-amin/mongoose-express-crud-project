import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Mongoose-Express CRUD project!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "This route doesn't exist",
  });
});

export default app;
