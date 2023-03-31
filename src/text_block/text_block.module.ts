import { Module } from '@nestjs/common';
import { TextBlockController } from './text_block.controller';
import { TextBlockService } from './text_block.service';

@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService],

})
export class TextBlockModule {}
