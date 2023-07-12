import { Expose, Type, Transform } from "class-transformer";

export class validatePostProductosInv{
    @Expose({ name: 'id' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0) {
            return Math.floor(value);
        } else {
            throw { status: 400, message: 'El id no cumple con los parametros requeridos' };
        }
    }, { toClassOnly: true })
    Identification: number;
    @Expose({ name: 'nombre' })
    @Transform(({ value }) => {
        if (/^[a-zA-Z\s]+$/.test(value))
            return value.substring(0, 255);
        else
            throw { status: 400, message: 'El nombre no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    name_P: string;

    @Expose({ name: 'descripcion' })
    @Transform(({ value }) => {
        if (/^[a-zA-Z\s]+$/.test(value))
            return value.substring(0, 255);
        else
            throw { status: 400, message: 'La descripcion no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    description: number;

    @Expose({ name: 'estado' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El estado no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    status: number;

    @Expose({ name: 'created_by' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El created_by no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    created_B: number;

    @Expose({ name: 'update_by' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El update_by no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    update_B: number;

    constructor(Identification : number, name_P : string, description : number, status: number, created_B : number, update_B : number){
        this.Identification = Identification;
        this.name_P = name_P;
        this.description = description;
        this.status = status;
        this.created_B = created_B;
        this.update_B = update_B;
    }
}