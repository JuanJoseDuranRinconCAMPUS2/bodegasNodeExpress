import { Expose, Type, Transform } from "class-transformer";

export class validatePostTransladarInv{
    @Expose({ name: 'id_bodegaOrigen' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_bodegaOrigen no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    identifaction_BO: number;

    @Expose({ name: 'id_bodegaFinal' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_bodegaFinal no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    identifaction_BF: number;

    @Expose({ name: 'id_producto' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_producto no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    identifaction_P: number;

    @Expose({ name: 'cantidad' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'La cantidad no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    amount: number;
    constructor(identifaction_BO : number, identifaction_BF : number, identifaction_P: number, amount : number){
        this.identifaction_BO = identifaction_BO;
        this.identifaction_BF = identifaction_BF;
        this.identifaction_P = identifaction_P;
        this.amount = amount;
    }
}