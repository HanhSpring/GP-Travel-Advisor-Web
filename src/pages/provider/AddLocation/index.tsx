import React from 'react';
import AddLocationForm from '../../../components/AddLocationForm';

const AddLocationPage: React.FC = () => {
  return <AddLocationForm onSuccessNavigateTo="/dashboard" />;
};

export default AddLocationPage;
