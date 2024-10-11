import React from 'react';

import CustomersScreen from 'screens/CustomersScreen';

import { getAllCustomers } from 'services/customers';

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
  }
  
  interface PageResponse {
    customers: Customer[];
  }

const getCustomersData = async () => {
    try {
        const res = await getAllCustomers();
        return res;
    } catch (error) {
        console.error(error);
    }
}

const UserList = async () => {
    const customers: Customer[] = await getCustomersData();
    const pageResponse: PageResponse = {
        customers
    }
  return (
    <CustomersScreen pageResponse={pageResponse} />
  );
};

export default UserList;
