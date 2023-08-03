import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState(null);

  const handleLogin = () => {
    axios
      .post('http://localhost:5000/login', { username, password }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(true);
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    axios
      .post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setIsAuthenticated(false);
      })
      .catch((err) => console.error(err));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios
      .post('http://localhost:5000/upload', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default App;
