import React from 'react';
import AddLocationForm from '../../../components/AddLocationForm';

export const AddLocation: React.FC = () => {
  return <AddLocationForm onSuccessNavigateTo="/admin/locations" />;
};
