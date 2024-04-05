import React, { useState } from 'react';

const Room1 = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    // Close the pop-up
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={togglePopup}>Open Form</button>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={togglePopup} className="close-button">Close</button>
            <h2>Form</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room1;
