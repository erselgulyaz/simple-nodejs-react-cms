'use client';
import React, { FC, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';

import { deleteUser } from 'services/users';

import PageTitle from 'components/page-title';

import styles from './styles.module.css';

interface User {
  id: number;
  name: string;
  email: string;
}

interface PageResponse {
  users: User[];
}

interface UsersScreenProps {
  pageResponse: PageResponse;
}

const ActionsCell = (params: any) => {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleteProcess, setIsDeleteProcess] = useState(false);

  const handleEditClick = () => {
    router.push(`/users/edit/${params.row._id}`);
  };

  const handleDeleteClick = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
    } else {
      setIsDeleteProcess(true);
      try {
        const res = await deleteUser(params.row._id);
        console.log(res);
        setIsDeleteProcess(false);
        setConfirmDelete(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" size="small" onClick={handleEditClick}>
        Edit
      </Button>
      <Tooltip
        title={confirmDelete ? 'Are you sure?' : ''}
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        disableFocusListener
        disableHoverListener
        disableTouchListener
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 8 }}
          onClick={handleDeleteClick}
          disabled={isDeleteProcess}
        >
          {confirmDelete ? 'Confirm' : 'Delete'}
        </Button>
      </Tooltip>
    </>
  );
};

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 90, flex: 1 },
  { field: 'name', headerName: 'Name', width: 150, flex: 2 },
  { field: 'email', headerName: 'Email', width: 200, flex: 3 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => <ActionsCell {...params} />,
    flex: 4,
  },
];

const UsersScreen: React.FC<UsersScreenProps> = ({ pageResponse }) => {
  const router = useRouter();

  const handleAddNewUser = () => {
    router.push('/users/add');
  }

  return (
    <div>
      <PageTitle title="Users List" />
      <div className={styles.buttonWrap}>
        <Button variant="contained" color="primary" onClick={handleAddNewUser}>Add New User</Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={pageResponse.users} columns={columns} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection getRowId={(row) => row._id} />
      </div>
    </div>
  );
};

export default UsersScreen;
