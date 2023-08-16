import { gql } from '@apollo/client';

export const ADD_CONTACT = gql`
  mutation AddContact($input: ContactInput!) {
    createContact(input: $input) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id)
  }
`;

export const EDIT_CONTACT = gql`
  mutation EditContact($id: ID!, $input: ContactInput!) {
    updateContact(id: $id, input: $input) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;
