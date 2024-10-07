import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';  // Import your ItemsModule

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ItemsModule, // Register your module
  ],
})
export class AppModule {}
