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
export class validatePostInventarios {
    constructor(identifaction_P, identifaction_B, amount) {
        this.identifaction_P = identifaction_P;
        this.identifaction_B = identifaction_B;
        this.amount = amount;
    }
}
__decorate([
    Expose({ name: 'id_producto' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_producto no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostInventarios.prototype, "identifaction_P", void 0);
__decorate([
    Expose({ name: 'id_bodega' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'El id_bodega no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostInventarios.prototype, "identifaction_B", void 0);
__decorate([
    Expose({ name: 'cantidad' }),
    Transform(({ value }) => {
        if (Math.floor(value) && typeof value === "number" && value >= 0)
            return Math.floor(value);
        else
            throw { status: 400, message: 'La cantidad no cumple con los parametros requeridos' };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], validatePostInventarios.prototype, "amount", void 0);
