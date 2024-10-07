// app/api/items/[id].ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';

export async function DELETE(request: Request) {
  // O ID deve ser obtido do URL
  const { pathname } = new URL(request.url);
  const id = pathname.split('/').pop(); // Obtém o ID da URL

  try {
    // Faz a requisição DELETE usando axios
    await axios.delete(`${backendUrl}/items/${id}`);

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
