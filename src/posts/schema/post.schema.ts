import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop({ required: true, maxlength: 255 })
  slug: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User | null;

  // Add timestamps explicitly for TypeScript type safety
  createdAt: Date; // Mongoose will automatically populate this field
  updatedAt: Date; // Mongoose will automatically populate this field
}

export const PostSchema = SchemaFactory.createForClass(Post);
