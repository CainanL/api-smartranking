import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        telefoneCelular: String, 
        nome: String,
        ranking: Number,
        posicaoRanking: String,
        urlFotoJogador: String
    },{
        timestamps: true, //gera informações de momento de criação e edição
        collection: 'Jogadores' //gera um nome para a collection, no mongo uma collection funciona de forma semelhante a uma tabela
    }
)