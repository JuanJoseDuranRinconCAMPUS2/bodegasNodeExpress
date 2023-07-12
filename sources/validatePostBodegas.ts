import { Expose, Type, Transform } from "class-transformer";

export class validatePBodegas{
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
            return value.substring(0, 250);
        else
            throw { status: 400, message: 'El nombre no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    name_B: string;

    @Expose({ name: 'id_responsable' })
    @Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_responsable no cumple con los parametros requeridos' };
    }, { toClassOnly: true })
    identifaction_R: number;

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

    constructor(Identification : number, name_B : string, identifaction_R : number, status: number, created_B : number, update_B : number){
        this.Identification = Identification;
        this.name_B = name_B;
        this.identifaction_R = identifaction_R;
        this.status = status;
        this.created_B = created_B;
        this.update_B = update_B;
    }
}