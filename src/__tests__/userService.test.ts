import { UserService } from '../services/userService';
import { User } from '../types/types';

describe('UserService', () => {
  const mockUsers: User[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'male',
      hair: { color: 'Black', type: 'Strands' },
      address: { postalCode: '12345', /* other address fields */ },
      company: { department: 'IT', /* other company fields */ },
      // ... other required fields
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      age: 25,
      gender: 'female',
      hair: { color: 'Brown', type: 'Strands' },
      address: { postalCode: '67890', /* other address fields */ },
      company: { department: 'IT', /* other company fields */ },
      // ... other required fields
    }
  ] as User[];

  it('should correctly group users by department', () => {
    const result = UserService.groupByDepartment(mockUsers);
    
    expect(result).toHaveProperty('IT');
    expect(result.IT.male).toBe(1);
    expect(result.IT.female).toBe(1);
    expect(result.IT.ageRange).toBe('25-30');
    expect(result.IT.hair).toEqual({ Black: 1, Brown: 1 });
    expect(result.IT.addressUser).toEqual({
      JohnDoe: '12345',
      JaneSmith: '67890'
    });
  });
});