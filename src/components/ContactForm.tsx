import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CONTACT } from '../mutations';

interface ContactFormProps {
  onAddContact: () => void; 
}

function ContactForm({ onAddContact }: ContactFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [addContact] = useMutation(ADD_CONTACT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addContact({
      variables: {
        input: {
          first_name: firstName,
          last_name: lastName,
          phones: [{ number: phoneNumber }],
        },
      },
    });
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    onAddContact();
  };

  return (
    <div className="contact-form">
      <h2>Add New Contact</h2>
      <form onSubmit={handleSubmit}>
        {
          <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Contact</button>
        </form>
        
        }
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default ContactForm;
