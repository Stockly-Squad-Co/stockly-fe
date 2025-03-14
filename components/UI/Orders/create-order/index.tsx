import FormContainer from '@/components/Common/Form/form-container';
import FormSection from '@/components/Common/Form/form-section';
import React from 'react';

const CreateOrder = () => {
  return (
    <form>
      <FormContainer title="Create Order">
        <FormSection title="Order Details">
          <div className="space-y-4"></div>
        </FormSection>
      </FormContainer>
    </form>
  );
};

export default CreateOrder;
