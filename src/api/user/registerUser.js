import axios from 'axios';

export const registerUser = async (dto) => {
  try {
    const response = await axios.post('http://localhost:8000/api/users/register', dto, {
      headers: {
        'Content-Type': 'application/json',
     },
   });

   if (response.status == 201) {
     return response.data;
   } else {
     throw new Error("Registration failed");
   }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("Username already exists. Please try again with a different name.");
    } else {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }
};
