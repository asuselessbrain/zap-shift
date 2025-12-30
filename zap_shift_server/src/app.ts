import express from 'express';
import cors from 'cors';
import { ParcelRouter } from './app/modules/parcel/parcel.route';
import { userRoutes } from './app/modules/user/user.route';
import { riderRoutes } from './app/modules/rider/rider.route';

const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.use('/api/v1/parcels', ParcelRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/riders', riderRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Zap Shift Server!'

  })
});

export default app;