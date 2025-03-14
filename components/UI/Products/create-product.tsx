'use client';
import Button from '@/components/Common/Button';
import FormContainer from '@/components/Common/Form/form-container';
import FormFooter from '@/components/Common/Form/form-footer';
import FormSection from '@/components/Common/Form/form-section';
import ImageUploader from '@/components/Common/Inputs/image-upload';
import SelectCollections from '@/components/Common/Inputs/select-collections';
import SelectField from '@/components/Common/Inputs/select-field';
import TextField from '@/components/Common/Inputs/text-field';
import { CreateProduct } from '@/lib/@types';
import { ProductUnits } from '@/lib/enums';
import { cn } from '@/lib/utils/cn';
import React from 'react';
import { useForm } from 'react-hook-form';

type Inputs = CreateProduct;

const CreateProductPage = () => {
  const {
    handleSubmit,
    reset,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      images: [],
      collections: [],
      thumbnailImageIndex: 0,
    },
  });

  const [images, thumbnailImageIndex, collections, unit] = watch([
    'images',
    'thumbnailImageIndex',
    'collections',
    'unit',
  ]);

  return (
    <form>
      <div className="p-4 md:p-6">
        <FormContainer title="Create Product">
          <FormSection title="Product Images">
            {!images?.length ? (
              <>
                <ImageUploader
                  uploaded_image={undefined}
                  onUploadImage={(img) => setValue('images', [...images, img])}
                />
              </>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {images?.map((img, img_index) => {
                  const is_thumbnail = img_index === thumbnailImageIndex;

                  return (
                    <div className="relative" key={img_index}>
                      <ImageUploader
                        uploaded_image={img}
                        onRemoveImage={() =>
                          setValue(
                            'images',
                            images.filter((_, index) => index != img_index)
                          )
                        }
                      />

                      <div
                        onClick={() =>
                          setValue('thumbnailImageIndex', img_index)
                        }
                        className={cn(
                          'absolute top-0 left-0 w-full h-full border-4 hover:border-accent cursor-pointer z-[20] rounded-md duration-200 transition-all flex flex-col justify-end',
                          is_thumbnail && 'border-accent'
                        )}
                      >
                        {is_thumbnail ? (
                          <div className="max-w-fit mx-auto bg-accent text-white font-bold px-2 py-1 rounded-t-md text-[.85rem]">
                            Thumbnail
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  );
                })}
                <ImageUploader
                  uploaded_image={undefined}
                  onUploadImage={(img) => setValue('images', [...images, img])}
                />
              </div>
            )}
          </FormSection>

          <FormSection title="Product Details">
            <div className="space-y-2 ">
              <TextField
                label="Product Name"
                InputProps={{
                  placeholder: 'Enter Name',
                  required: true,
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
                label="Product Description (Optional)"
                multiline={true}
                InputProps={{
                  placeholder: 'Enter description',
                  required: false,
                  ...register('description'),
                }}
              />

              <SelectCollections
                onSelectCollection={(c) => {
                  setValue('collections', [...collections, c]);
                }}
                onRemoveCollection={(c) => {
                  setValue(
                    'collections',
                    collections.filter((col) => col._id != c._id)
                  );
                }}
                selected_collections={collections ?? []}
              />

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Price"
                  InputProps={{
                    required: true,
                    type: 'tel',
                    placeholder: 'Enter amount',
                    ...register('price', {
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                      min: {
                        value: 0,
                        message: 'Price must be greater than 0',
                      },
                    }),
                  }}
                  helperText={errors?.price?.message}
                />
                <TextField
                  label="Cost Price"
                  InputProps={{
                    required: true,
                    type: 'tel',
                    ...register('costPrice', {
                      required: {
                        value: true,
                        message: 'This field is required',
                      },
                      min: {
                        value: 0,
                        message: 'Price must be greater than 0',
                      },
                    }),
                  }}
                  helperText={errors?.costPrice?.message}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Product Inventory">
            <div className="grid grid-cols-3 gap-4">
              <TextField
                label="Stock Quantity"
                InputProps={{
                  required: true,
                  type: 'number',
                  ...register('quantityAvailable', {
                    required: {
                      value: true,
                      message: 'This field is required',
                    },
                  }),
                }}
                helperText={errors?.quantityAvailable?.message}
              />

              <SelectField
                options={Object.values(ProductUnits).map((u) => ({
                  label: u,
                  value: u,
                }))}
                label="Unit (optional)"
                data={{ label: unit, value: unit }}
                onValueChange={(e) => setValue('unit', e)}
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
            loading={false}
          >
            Create Product
          </Button>
        }
      />
    </form>
  );
};

export default CreateProductPage;
