import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { v4 as uuidv4 } from 'uuid';
import { Item } from './item.schema';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body() item: Omit<Item, 'id'>) {
    const newItem = { ...item, id: uuidv4() };
    await this.itemsService.create(newItem);
    return { message: 'Item created successfully', item: newItem };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedItem: Partial<Item>) {
    return this.itemsService.update(id, updatedItem);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.itemsService.delete(id);
    return { message: 'Item deleted successfully' };
  }
}
