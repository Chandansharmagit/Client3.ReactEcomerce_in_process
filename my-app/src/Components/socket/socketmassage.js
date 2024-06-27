import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './Socketmassage.css'; // Import the CSS file

function Socketmassage() {
  const [formdata, setFormdata] = useState({
    message: '',
  });
  const [selectedFile, setSelectedFile] = useState(''); // State for the selected file name
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Ensure this matches your server's address and port
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server with ID:', newSocket.id);
    });

    newSocket.on('recive massage', (message) => {
      console.log(message);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name); // Update the state with the selected file name
    }
  };

  const handlesubmit = (event) => {
    event.preventDefault();
    if (socket) {
      socket.emit('message', formdata.message);
      setFormdata({ message: '' });
      setSelectedFile(''); // Clear the selected file after submitting
    }
  };

  return (
    <div className="socket-container">
      <h1 >Send us Feedback we will reply you soon</h1>
      <form className="socket-form" onSubmit={handlesubmit}>
        <div className="form-row">
          <input
            type="text"
            name="message"
            value={formdata.message}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter your message"
            style={{ width: '90vw' }}
          />
          <div className="svg-container" onClick={() => document.getElementById('fileInput').click()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16"id='filess'>
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
            </svg>
            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
          </div>
          {selectedFile && <p className="file-name">{selectedFile}</p>}
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}

export default Socketmassage;
