import { MockUser } from '../interfaces';

export const urls = {
  users: '/users',
  error404: '/404',
  error500: '/error500',
  editUser: '/users/4',
};

export const errorMessages = {
  error404: 'Request failed with status code 404',
  error500: 'Request failed with status code 500',
};

export const mockUsers: MockUser[] = [
  {
    id: 1,
    createdAt: '12/12/2012',
    updatedAt: '12/12/2012',
    name: 'Leanne Graham',
    username: 'Bret',
  },
  {
    id: 2,
    createdAt: '12/12/2012',
    updatedAt: '12/12/2012',
    name: 'Ervin Howell',
    username: 'Antonette',
  },
  {
    id: 3,
    createdAt: '12/12/2012',
    updatedAt: '12/12/2012',
    name: 'Clementine Bauch',
    username: 'Samantha',
  },
];
