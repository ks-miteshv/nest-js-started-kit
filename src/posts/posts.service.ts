import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.schema';
import { Model, Mongoose, Types } from 'mongoose';
import { PostDto } from './dto/post.dto';
import { User } from 'src/users/schemas/user.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async index(query: ExpressQuery) {
    const perPage: number = Number(query.perPage) ?? 10;
    const currentPage: number = Math.max(Number(query.currentPage) || 1, 1);
    const skip: number = perPage * (currentPage - 1);

    const searchQuery = query.search
      ? {
          title: {
            $regex: query.search,
            $options: 'i',
          },
        }
      : {};

    return await this.postModel
      .find({ ...searchQuery })
      .skip(skip)
      .limit(perPage)
      .exec();
  }

  async store(postDto: PostDto, user: User): Promise<Post> {
    const checkSlug = await this.checkSlug(postDto.slug);
    if (checkSlug) {
      throw new UnprocessableEntityException('slug must be unique.');
    }

    const attributes = Object.assign(postDto, { createdBy: user._id });
    const post = new this.postModel(attributes);
    return await post.save();
  }

  async update(postId: string, postDto: PostDto): Promise<Post> {
    const checkSlug = await this.checkSlug(postDto.slug, postId);
    if (checkSlug) {
      throw new UnprocessableEntityException('slug must be unique.');
    }

    // check this given post is existed.
    await this.show(postId);

    return await this.postModel
      .findByIdAndUpdate(postId, postDto, { new: true })
      .exec();
  }

  async show(postId: string): Promise<Post> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new BadRequestException('Invalid Object id.');
    }

    const post: Post | null = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException(`Post not found.`);
    }
    return post;
  }

  async destroy(postId: string): Promise<Post> {
    const post = await this.show(postId);
    await this.postModel.deleteOne({ _id: postId }).exec();
    return post;
  }

  private async checkSlug(
    slug: string,
    postId: string | null = null,
  ): Promise<Post> {
    const playload = { slug: slug.toLowerCase() }; // Ensure exact match

    if (postId) {
      if (postId) {
        playload['_id'] = { $ne: postId }; // Ensure postId is excluded from the search.
      }
    }

    return await this.postModel.findOne(playload).exec();
  }
}
