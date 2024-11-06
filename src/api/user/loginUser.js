export const loginUser = async (username, password) => {
    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);
  
    return fetch('http://localhost:8000/api/users/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDetails,
    });
  };
  