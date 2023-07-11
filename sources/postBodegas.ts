import { Expose, Type, Transform } from "class-transformer";

export class postBodegas{
    @Expose({ name: 'id' })
    @Transform(({ value }) => {if(Math.floor(value) && typeof value == "number" && value >= 0) return value; else throw { status : 400 , message : 'El id no cumple con los parametros requeridos'}}, { toClassOnly: true })
    Identification: bigint;
    @Expose({name : "nombre"})
    @Transform(({ value }) => {if(/^[a-z A-Z]+$/.test(value)) return value; else throw { status : 400 , message : 'El id_responsble no cumple con los parametros requeridos'}}, { toClassOnly: true })
    name_B : string;
    @Expose({ name: 'id_responsble' })
    @Transform(({ value }) => {if(Math.floor(value) && typeof value == "number") return value; else throw { status : 400 , message : 'El id_responsble no cumple con los parametros requeridos'}}, { toClassOnly: true })
    identifaction_R: bigint;
    @Expose({ name: 'estado' })
    @Transform(({ value }) => {if(Math.floor(value) && typeof value == "number") return value; else throw { status : 400 , message : 'El id_responsble no cumple con los parametros requeridos'}}, { toClassOnly: true })
    status: bigint;
    constructor(Identification : bigint, name_B : string, identifaction_R : bigint, status: number, created_B : bigint, update_B : bigint, created_A : Date, update_A : Date, delete_A : Date){
        this.Identification = Identification;
        this.name_B = name_B;
        this.identifaction_R = identifaction_R;
        this.status = status;
        this.created_B = created_B;
        this.update_B = update_B;
        this.created_A = created_A;
        this.update_A = update_A;
        this.delete_A = delete_A;

        (this.name_B.length > 250) ? this.name_B = this.name_B.substring(0, 250) : this.name_B;


    }
}