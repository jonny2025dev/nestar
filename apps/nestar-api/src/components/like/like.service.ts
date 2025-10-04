import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LikeModule } from './like.module';
import { Model } from 'mongoose';
import { Like } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';
import { lookupService } from 'dns/promises';
import { Message } from '../../libs/enums/common.enum';
import { T } from '../../libs/types/common';

@Injectable()
export class LikeService {
  constructor(@InjectModel('Like') private readonly likeModel: Model<Like>) {}

  public async toggleLike(input: LikeInput): Promise<number> {
    const search: T = { memberId: input.memberId, likeRefId: input.likeRefId }, // 1. Qidirish: like bor yoki yo‘qligini tekshirish
     exist = await this.likeModel.findOne(search).exec();
    let modifier = 1;

    if (exist) {
      await this.likeModel.findOneAndDelete(search).exec();  // 2. Agar like mavjud bo‘lsa, uni o‘chirib tashlaymiz (unlike)
      modifier = -1;
    } else {
      try {
        await this.likeModel.create(input);// 3. Agar yo‘q bo‘lsa, yangisini qo‘shamiz (like)
      } catch (err) {
        console.log('Error, Service.model: ', err.message);
        throw new BadRequestException(Message.CREATE_FAILED);
      }
    }

    console.log(`Like modifier: ${modifier}`);
    return modifier;
  }
}