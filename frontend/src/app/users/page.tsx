import React from 'react';

import { getAllUsers } from 'services/users';

interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface PageResponse {
    users: User[];
  }

const getUsersData = async () => {
    try {
        const res = await getAllUsers();
        return res;
    } catch (error) {
        console.error(error);
    }
}

import UsersScreen from 'screens/UsersScreen';

const UserList = async () => {
    const users: User[] = await getUsersData();
    const pageResponse: PageResponse = {
        users
    }
  return (
    <UsersScreen pageResponse={pageResponse} />
  );
};

export default UserList;
