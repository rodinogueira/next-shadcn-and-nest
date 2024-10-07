'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addItem, updateItem } from '../api/items/route';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';

interface Item {
  _id: string;
  name: string;
  description: string;
}

const itemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

type ItemFormData = z.infer<typeof itemSchema>;

interface ItemFormProps {
  onSuccess: () => void;
  currentItem?: Item;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSuccess, currentItem }) => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: currentItem?.name || '',
      description: currentItem?.description || '',
    },
  });

  useEffect(() => {
    reset({
      name: currentItem?.name || '',
      description: currentItem?.description || '',
    });
  }, [currentItem, reset]);

  const onSubmit = async (data: ItemFormData) => {
    try {
      if (currentItem?._id) {
        await updateItem(String(currentItem._id), data);
      } else {
        await addItem(data);
      }
      onSuccess();
      reset();
    } catch (err) {
      setError('Failed to save item.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-6 bg-white rounded-lg shadow-md'>
        {error && <p className='text-red-500'>{error}</p>}

        <div>
          <Input
            placeholder='Name'
            {...register('name')}
            className={`w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div>
          <Input
            placeholder='Description'
            {...register('description')}
            className={`w-full ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
        </div>

        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white'>
          {currentItem ? 'Atualizar' : 'Adicionar'}
        </Button>
      </form>
    </div>
  );
};

export default ItemForm;
