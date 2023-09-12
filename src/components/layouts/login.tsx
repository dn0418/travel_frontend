// @flow strict

import { Button, Container, Paper, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";


function AdminLoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.email !== 'sales.2expedition@gmail.com' || formData.password !== 'PowerfulAdmin2023!@#') {
      toast.error("Invalid Credentials");
      return;
    };

    localStorage.setItem('admin', 'true');
    router.reload();
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Container maxWidth="xs">
        <Paper className='p-8'>
          <h3 className="mb-8 text-2xl text-center">
            Admin Login
          </h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              type='email'
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className='mt-8'
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLoginForm;