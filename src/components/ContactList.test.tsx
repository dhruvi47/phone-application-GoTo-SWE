import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing'; 
import { GET_CONTACTS } from '../queries';
import { DELETE_CONTACT } from '../mutations';
import ContactList from './ContactList';

const mockContacts = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    phones: [{ number: '123-456-7890' }],
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    phones: [{ number: '987-654-3210' }],
  },
];

const mocks = [
  {
    request: {
      query: GET_CONTACTS,
    },
    result: {
      data: {
        contacts: mockContacts,
      },
    },
  },
];

test('renders contact list', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}> 
      <ContactList />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/John Doe - 123-456-7890/i)).toBeInTheDocument();
  });
  await waitFor(()=>{
    expect(screen.getByText(/Jane Smith - 987-654-3210/i)).toBeInTheDocument();

  })
});

test('deletes a contact', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ContactList />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(screen.getByText(/John Doe - 123-456-7890/i)).toBeInTheDocument();
  });

  const deleteButton = screen.getByText(/Delete/i);
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText(/John Doe - 123-456-7890/i)).not.toBeInTheDocument();
  });
});
