import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Query,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipes } from './pipes/jogadores-validacao-parametros.pipe';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ) {
        return await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Param('_id') _id: string,
        @Body() atualziarJogadorDto: AtualizarJogadorDto
    ) {
        await this.jogadoresService.atualizarJogador(_id, atualziarJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string
    ): Promise<Jogador[] | Jogador> {
        if (!!email) return this.jogadoresService.consultarJogadorPeloEmail(email);
        return this.jogadoresService.consultarTodosOsJogadores();
    }

    @Get('/:_id')
    async consultarJogador(
        @Param('_id') _id: string
    ): Promise<Jogador[] | Jogador> {
        return this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', JogadoresValidacaoParametrosPipes) _id: string
    ): Promise<void> {
        return this.jogadoresService.deletarJogador(_id);
    }

}
