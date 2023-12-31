import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://cainanluyles:89dTrQpaMRCM3LZM@cluster0.sxenwgh.mongodb.net/smartranking?retryWrites=true&w=majority'),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
