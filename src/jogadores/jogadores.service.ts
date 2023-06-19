import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidV4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly JogadorModule: Model<Jogador>) { }

    private readonly logger = new Logger(JogadoresService.name);

    async criarJogador(criarJogadorDTO: CriarJogadorDto): Promise<Jogador> {
        const jogadorEncontrado = await this.JogadorModule.findOne({ email: criarJogadorDTO.email }).exec();
        if (!!jogadorEncontrado) throw new BadRequestException(`Já existe um jogadorm com o e-mail ${criarJogadorDTO.email}`);

        const jogadorCriado = new this.JogadorModule(criarJogadorDTO);
        return await jogadorCriado.save();
    }

    async consultarTodosOsJogadores(): Promise<Jogador[]> {
        return await this.JogadorModule.find().exec();
    }

    async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
        const jogador = await this.JogadorModule.findOne({ email });
        if (!jogador) throw new NotFoundException(`Jogador com e-mail "${email}" não encontrado`);
        return jogador;
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogador = await this.JogadorModule.findOne({ _id });
        if (!jogador) throw new NotFoundException(`Jogador com id "${_id}" não encontrado`);
        return jogador;
    }

    async deletarJogador(_id: string): Promise<void> {
        const jogador = await this.JogadorModule.findOne({ _id });
        if (!jogador) throw new NotFoundException(`Jogador com id "${_id}" não encontrado`);
        await this.JogadorModule.deleteOne({ _id }).exec();
    }

    async atualizarJogador(_id: string, atualizarJogadorDTO: AtualizarJogadorDto): Promise<Jogador> {
        const jogadorExists = await this.JogadorModule.findOne({ _id });

        if (!jogadorExists) throw new NotFoundException(`Jogador com id ${_id} não encontrado`);

        return await this.JogadorModule.findOneAndUpdate(
            { _id },
            { $set: atualizarJogadorDTO }
        ).exec();
    }

}
