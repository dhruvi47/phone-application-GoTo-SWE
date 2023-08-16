import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACTS } from '../queries';
import { ADD_CONTACT, DELETE_CONTACT } from '../mutations';
import ContactForm from './ContactForm';
import EditContactForm from './EditContactForm';
import './ContactList.css'

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
}

function ContactList() {
  const { loading, error, data, refetch: refetchContacts } = useQuery(GET_CONTACTS);
  // const [addContact] = useMutation(ADD_CONTACT);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const handleDelete = async (id: string) => {
    await deleteContact({ variables: { id } });
    refetchContacts();
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleEditClose = () => {
    setEditingContact(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="contact-list">
      <h1>Contact List</h1>
      <ContactForm onAddContact={refetchContacts} />
      <ul>
        {data.contacts.map((contact: Contact) => (
          <li key={contact.id}>
            {contact.first_name} {contact.last_name} - {contact.phones[0].number}
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
            <button onClick={() => handleEdit(contact)}>Edit</button>
          </li>
        ))}
      </ul>
      {editingContact && (
        <EditContactForm
          contact={editingContact}
          onClose={handleEditClose}
          onEditContact={refetchContacts}
        />
      )}
    </div>
  );
}

export default ContactList;
