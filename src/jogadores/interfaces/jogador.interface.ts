import { Document } from "mongoose";

export interface Jogador extends Document {
    readonly _id: string;
    readonly email: string;
    telefoneCelular: string;
    nome: string;
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}