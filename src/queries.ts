import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts {
    contact {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;


export const EDIT_CONTACT = gql`
  mutation EditContact($id: ID!, $first_name: String!, $last_name: String!, $phones: [PhoneInput]!) {
    editContact(input: {
      id: $id,
      first_name: $first_name,
      last_name: $last_name,
      phones: $phones
    }) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
