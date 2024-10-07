'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { getItems, deleteItem } from '../api/items/route'; 

interface Item {
  _id: string;
  name: string;
  description: string;
}

interface ItemListProps {
  items: Item[];
  onEdit: (item: Item) => void;
  updateItemsList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ItemList = ({ items, onEdit, updateItemsList }: ItemListProps) => {

  const fetchItems = async () => {
    try {
      const response = await getItems();
      updateItemsList(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (error) {
      console.error('Erro ao deletar o item:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Item List</h2>
      <ul className='space-y-4'>
        {items.map((item) => (
          <li key={item._id} className='p-4 bg-white rounded-lg shadow-md flex justify-between items-center'>
            <div className='flex flex-col'>
              <span className='text-lg font-semibold'>{item.name}</span>
              <span className='text-sm text-gray-500'>{item.description}</span>
            </div>
            <div className='flex space-x-2'> 
              <Button className='edit' onClick={() => onEdit(item)}>Editar</Button> 
              <Button onClick={() => handleDelete(item._id)} className='bg-red-600 hover:bg-red-700 text-white'>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
