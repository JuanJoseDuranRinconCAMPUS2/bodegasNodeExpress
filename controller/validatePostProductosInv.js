var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
export class validatePostProductosInv {
    constructor(Identification, name_P, description, status, created_B, update_B) {
        this.Identification = Identification;
        this.name_P = name_P;
        this.description = description;
        this.status = status;
        this.created_B = created_B;
        this.update_B = update_B;
    }
}
__decorate([
    Expose({ name: 'id' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0) {
            return Math.floor(value);
        }
        else {
            throw { status: 400, message: 'El id no cumple con los parametros requeridos' };
        }
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostProductosInv.prototype, "Identification", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    Transform(({ value }) => {
        if (/^[a-zA-Z\s]+$/.test(value))
            return value.substring(0, 255);
        else
            throw { status: 400, message: 'El nombre no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], validatePostProductosInv.prototype, "name_P", void 0);
__decorate([
    Expose({ name: 'descripcion' }),
    Transform(({ value }) => {
        if (/^[a-zA-Z\s]+$/.test(value))
            return value.substring(0, 255);
        else
            throw { status: 400, message: 'La descripcion no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostProductosInv.prototype, "description", void 0);
__decorate([
    Expose({ name: 'estado' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El estado no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostProductosInv.prototype, "status", void 0);
__decorate([
    Expose({ name: 'created_by' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El created_by no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostProductosInv.prototype, "created_B", void 0);
__decorate([
    Expose({ name: 'update_by' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El update_by no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostProductosInv.prototype, "update_B", void 0);
