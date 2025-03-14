'use client';
import Button from '@/components/Common/Button';
import FormContainer from '@/components/Common/Form/form-container';
import FormFooter from '@/components/Common/Form/form-footer';
import FormSection from '@/components/Common/Form/form-section';
import SelectField from '@/components/Common/Inputs/select-field';
import TextField from '@/components/Common/Inputs/text-field';
import { CreateDiscount, Product } from '@/lib/@types';
import { useSidebar } from '@/lib/providers/SideDrawersProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiChevronRight } from 'react-icons/bi';
import AddProductsSidebar from './add-products';
import { useMutation } from '@tanstack/react-query';
import { createDiscount } from '@/lib/services/discount.service';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Inputs = CreateDiscount;

const CreateDiscountPage = () => {
  const { showSidebar } = useSidebar();
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      type: 'FIXED',
    },
  });

  const [products, type] = watch(['products', 'type']);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['create-discount'],
    mutationFn: createDiscount,
    onSuccess() {
      toast.success('Discount created successfully');
      router.push('/promotions');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = (e: Inputs) => {
    mutateAsync(e);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormContainer title="Create Discount">
          <FormSection title="Discount Details">
            <TextField
              label="Discount Name (Optional)"
              InputProps={{
                required: false,
                placeholder: 'Enter discount name e.g September Discount',
                ...register('name'),
              }}
            />
          </FormSection>

          <FormSection title="Discount Type">
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                data={{
                  label: type,
                  value: type,
                }}
                onValueChange={(d) => setValue('type', d)}
                options={['FIXED', 'PERCENTAGE'].map((p) => ({
                  label: p,
                  value: p,
                }))}
                label="Select discount type"
              />

              <TextField
                label={
                  type === 'FIXED' ? 'Amount (₦)' : 'Percentage Discount (%)'
                }
                InputProps={{
                  required: true,
                  type: 'number',
                  placeholder:
                    type === 'FIXED'
                      ? 'Enter amount'
                      : 'Enter percentage discount',

                  ...register('value', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  }),
                }}
                helperText={errors?.value?.message}
              />
            </div>
          </FormSection>

          <FormSection title="Select Products">
            <div
              onClick={() => {
                showSidebar(
                  <AddProductsSidebar
                    selectedProducts={products ?? []}
                    setProducts={(products) => setValue('products', products)}
                  />
                );
              }}
              className="rounded-md px-4 py-3 border flex items-center justify-between cursor-pointer"
            >
              {products?.length > 0 ? (
                <h1>{products?.map((p) => p.name)?.join(', ')}</h1>
              ) : (
                <h1>Select Products</h1>
              )}

              <span>
                <BiChevronRight size={25} className="text-gray-500" />
              </span>
            </div>
          </FormSection>

          <FormSection title="Discount Validity">
            <div className="grid grid-cols-2 justify-between gap-4">
              <TextField
                label="Start Date"
                InputProps={{
                  required: true,
                  type: 'date',
                  ...register('startDate', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  }),
                }}
                helperText={errors?.startDate?.message}
              />

              <TextField
                label="End Date"
                InputProps={{
                  required: true,
                  type: 'date',
                  ...register('endDate', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  }),
                }}
                helperText={errors?.endDate?.message}
              />
            </div>
          </FormSection>
        </FormContainer>
      </div>

      <FormFooter
        onReset={reset}
        submitButton={
          <Button
            className="text-white hover:bg-accent bg-accent"
            variant="filled"
            size="medium"
            loading={isPending}
          >
            Create Discount
          </Button>
        }
      />
    </form>
  );
};

export default CreateDiscountPage;
