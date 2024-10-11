'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams } from 'next/navigation';

import { setNewCustomer, getSingleCustomer, updateCustomer } from 'services/customers';

import PageTitle from 'components/page-title';

import styles from './styles.module.css';

const AddCustomerScreen = () => {
  const params = useParams();
  const { id } = params;
  const selectedCustomerId = id;
  const [loading, setLoading] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', phone: '' };

    if (values.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!emailRegex.test(values.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (values.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
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
      const res = await (selectedCustomerId
        ? updateCustomer(selectedCustomerId, values)
        : setNewCustomer(values));
      console.log(res);
      setLoading(false);
      setIsFormDirty(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getCustomerData = async () => {
    try {
      const res = await getSingleCustomer(selectedCustomerId);
      setValues({
        name: res.name,
        email: res.email,
        phone: res.phone
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedCustomerId) {
      getCustomerData();
    }
  }, [selectedCustomerId]);

  return (
    <div className={styles.wrapper}>
      <PageTitle title={selectedCustomerId ? 'Edit Customer' : 'Add New Customer'} />
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
            label="Phone"
            variant="outlined"
            fullWidth
            value={values.phone}
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </div>
        <div className={styles.formActions}>
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            Save
          </Button>
          {isFormDirty && (
            <a href="/customers">
              <Button variant="contained" color="primary">
                Go To Customer List
              </Button>
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCustomerScreen;
