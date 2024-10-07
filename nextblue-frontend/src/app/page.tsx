'use client';

import { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

interface Item {
  _id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [currentItem, setCurrentItem] = useState<Item | undefined>(undefined);
  const [items, setItems] = useState<Item[]>([]);
  const handleEdit = (item: Item) => {
    setCurrentItem(item);
  };

  return (
    <main className='max-w-3xl mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Item Manager</h1>
      <ItemForm
        currentItem={currentItem}
        onSuccess={() => {
          setCurrentItem(undefined);
          window.location.reload();
        }}
      />
      <ItemList items={items} onEdit={handleEdit} updateItemsList={setItems} />
    </main>
  );
}
