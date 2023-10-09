import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    profilePictureUrl: "",
    accountType: "", // Added accountType field
  });

  useEffect(() => {
    console.log(`Date of Birth changed to ${formData.dateOfBirth}`);
  }, [formData.dateOfBirth]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:8080/api/users/register";

    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data.success);
        if (data !== null) {
          alert("User registration successful!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={(event) =>
          setFormData({ ...formData, username: event.target.value })
        }
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(event) =>
          setFormData({ ...formData, firstName: event.target.value })
        }
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(event) =>
          setFormData({ ...formData, lastName: event.target.value })
        }
      />
      <input
        type="date"
        name="dateOfBirth"
        placeholder="Date of Birth"
        value={formData.dateOfBirth}
        onChange={(event) => {
          setFormData({ ...formData, dateOfBirth: event.target.value });
          console.log("Date of Birth changed to", event.target.value);
        }}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={(event) =>
          setFormData({ ...formData, address: event.target.value })
        }
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(event) =>
          setFormData({ ...formData, phoneNumber: event.target.value })
        }
      />
      <input
        type="text"
        name="profilePictureUrl"
        placeholder="Profile Picture URL"
        value={formData.profilePictureUrl}
        onChange={(event) =>
          setFormData({ ...formData, profilePictureUrl: event.target.value })
        }
      />

      <select
        name="accountType"
        value={formData.accountType}
        onChange={(event) =>
          setFormData({ ...formData, accountType: event.target.value })
        }
      >
        <option value="">Select account type</option>
        <option value="savings">Savings</option>
        <option value="current">Current</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
