import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    //import and bind below given dependency so the we can use it into the service and controller.
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  
})
export class PostsModule {}
