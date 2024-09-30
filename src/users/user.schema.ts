// user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Read more about schemas
 * https://mongoosejs.com/docs/schematypes.html#schematype-options
 */

// This is the TypeScript interface representing a User document
export type UserDocument = User & Document;

@Schema({ timestamps: true }) // Decorator that marks the class as a Mongoose schema and enables timestamps
export class User {
  @Prop({ required: true, maxlength: 150 }) // 'required' ensures that this field must be present
  name: string;

  /**
   * 'unique' ensures email uniqueness
   * maxlength is set to 255, trim will ensure no leading or trailing spaces.
   */
  @Prop({ required: true, unique: true, maxlength: 255, trim: true })
  email: string;

  /**
   * Password field
   * - Required field
   * - We will handle hashing in the service logic (not directly in schema)
   */
  @Prop({ required: true, maxlength: 255 }) 
  password: string;

  /**
   * 'isActive' indicates if the user account is active.
   * - By default, it is set to true
   */
  @Prop({ default: true })
  isActive: boolean;

  /**
   * 'emailVerifiedAt' stores the date and time when the user's email was verified.
   * - Null by default if the email is not yet verified.
   * - Use 'Date' type for storing datetime information.
   */
  @Prop({ type: Date, default: null })
  emailVerifiedAt: Date | null;
}

// Create the schema factory
export const UserSchema = SchemaFactory.createForClass(User);
