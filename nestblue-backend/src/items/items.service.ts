import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async update(id: string, updatedItem: Partial<Item>): Promise<Item> {
    const item = await this.itemModel.findByIdAndUpdate(id, updatedItem, { new: true }).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async delete(id: string): Promise<void> {
    const result = await this.itemModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
