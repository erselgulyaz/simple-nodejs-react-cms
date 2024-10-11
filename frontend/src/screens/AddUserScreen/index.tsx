'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams } from 'next/navigation';

import { setNewUser, getSingleUser, updateUser } from 'services/users';

import PageTitle from 'components/page-title';

import styles from './styles.module.css';

const AddUser = () => {
  const params = useParams();
  const { id } = params;
  const selectedUserId = id;
  const [loading, setLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '' };

    if (values.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!emailRegex.test(values.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (values.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await (selectedUserId
        ? updateUser(selectedUserId, values)
        : setNewUser(values));
      console.log(res);
      setLoading(false);
      setIsFormDirty(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const res = await getSingleUser(selectedUserId);
      setValues({
        name: res.name,
        email: res.email,
        password: res.password
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedUserId) {
      getUserData();
    }
  }, [selectedUserId]);

  return (
    <div className={styles.wrapper}>
      <PageTitle title={selectedUserId ? 'Edit User' : 'Add New User'} />
      <form onSubmit={handleSubmit}>
        <div className={styles.formField}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
          />
        </div>
        <div className={styles.formField}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>
        <div className={styles.formField}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            type={selectedUserId ? 'text' : 'password'}
            error={!!errors.password}
            helperText={errors.password}
          />
        </div>
        <div className={styles.formActions}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            Save
          </Button>
          {isFormDirty && (
            <a href="/users">
              <Button variant="contained" color="primary">
                Go To User List
              </Button>
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddUser;
