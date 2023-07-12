import { Expose, Type, Transform } from "class-transformer";

export class validatePostInventarios{
    @Expose({ name: 'id_producto' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_producto no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    identifaction_P: number;

    @Expose({ name: 'id_bodega' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_bodega no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    identifaction_B: number;

    @Expose({ name: 'cantidad' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'La cantidad no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    amount: number;
    constructor(identifaction_P: number, identifaction_B : number, amount : number){
        this.identifaction_P = identifaction_P;
        this.identifaction_B = identifaction_B;
        this.amount = amount;
    }
}