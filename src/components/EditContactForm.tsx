import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_CONTACT } from '../mutations';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
}

interface EditContactFormProps {
  contact: Contact;
  onClose: () => void;
  onEditContact: () => void; 
}

function EditContactForm({ contact, onClose, onEditContact }: EditContactFormProps) {
  const [firstName, setFirstName] = useState(contact.first_name);
  const [lastName, setLastName] = useState(contact.last_name);
  const [phoneNumber, setPhoneNumber] = useState(contact.phones[0].number);

  const [editContact] = useMutation(EDIT_CONTACT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await editContact({
      variables: {
        id: contact.id,
        input: {
          first_name: firstName,
          last_name: lastName,
          phones: [{ number: phoneNumber }],
        },
      },
    });
    onEditContact();
    onClose();
  };

  return (
    <div className="edit-contact-form">
      <h2>Edit Contact</h2>
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
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditContactForm;
