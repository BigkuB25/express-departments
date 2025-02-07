import express from 'express';
import { UserController } from './controllers/userController';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/departments', UserController.getDepartmentSummary);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});