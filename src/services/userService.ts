import axios from 'axios';
import { User, DepartmentSummary } from '../types/types';

export class UserService {
  private static API_URL = 'https://dummyjson.com/users';

  public static async fetchUsers(): Promise<User[]> {
    try {
      const response = await axios.get(this.API_URL);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  public static groupByDepartment(users: User[]): DepartmentSummary {
    const departments: DepartmentSummary = {};

    users.forEach(user => {
      const department = user.company.department;
      
      if (!departments[department]) {
        departments[department] = {
          male: 0,
          female: 0,
          ageRange: '',
          hair: {},
          addressUser: {}
        };
      }

      // Count gender
      if (user.gender === 'male') {
        departments[department].male++;
      } else {
        departments[department].female++;
      }

      // Update hair color count
      const hairColor = user.hair.color;
      departments[department].hair[hairColor] = (departments[department].hair[hairColor] || 0) + 1;

      // Add user address
      departments[department].addressUser[`${user.firstName}${user.lastName}`] = user.address.postalCode;
    });

    // Calculate age range for each department
    Object.keys(departments).forEach(dept => {
      const deptUsers = users.filter(user => user.company.department === dept);
      const ages = deptUsers.map(user => user.age);
      const minAge = Math.min(...ages);
      const maxAge = Math.max(...ages);
      departments[dept].ageRange = `${minAge}-${maxAge}`;
    });

    return departments;
  }
}