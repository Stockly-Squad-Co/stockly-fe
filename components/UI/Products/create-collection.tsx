'use client';

import Button from '@/components/Common/Button';
import FormContainer from '@/components/Common/Form/form-container';
import FormFooter from '@/components/Common/Form/form-footer';
import FormSection from '@/components/Common/Form/form-section';
import ImageUploader from '@/components/Common/Inputs/image-upload';
import TextField from '@/components/Common/Inputs/text-field';
import { CreateCollection } from '@/lib/@types';
import { createCollections } from '@/lib/services/products.service';
import { cn } from '@/lib/utils/cn';
import { getBase64 } from '@/lib/utils/helpers';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Inputs = CreateCollection;

const CreateCollectionPage = () => {
  const router = useRouter();
  const {
    reset,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutateAsync: _createCollection, isPending: _creatingCollection } =
    useMutation({
      mutationKey: ['collections', 'create'],
      mutationFn: createCollections,

      onSuccess() {
        toast.success('Collection created successfully');
        router.push('/products?tab=Collections');
      },
    });

  const image = watch('image');

  const onSubmit = async (e: Inputs) => {
    if (!e.image) {
      return toast.success('Image is required');
    }
    const base64 = await getBase64(e.image as any);

    await _createCollection({ ...e, image: base64 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:p-6 p-4">
        <FormContainer title="Create Product Collection">
          <FormSection title="Collection Image">
            <div className={cn('w-full', image && 'w-[150px]')}>
              <ImageUploader
                uploaded_image={image as File}
                onUploadImage={(img) => setValue('image', img)}
                onRemoveImage={() => setValue('image', undefined)}
              />
            </div>
          </FormSection>

          <FormSection title="Collection Details">
            <div className="space-y-3">
              <TextField
                label="Collection Name"
                InputProps={{
                  required: true,
                  placeholder: 'Enter name',
                  ...register('name', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  }),
                }}
                helperText={errors?.name?.message}
              />
              <TextField
                label="Collection Description (Optional)"
                multiline={true}
                InputProps={{
                  ...register('description'),
                }}
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
            loading={_creatingCollection}
          >
            Create Collection
          </Button>
        }
      ></FormFooter>
    </form>
  );
};

export default CreateCollectionPage;
