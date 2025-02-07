import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  public static async getDepartmentSummary(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.fetchUsers();
      const summary = UserService.groupByDepartment(users);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}