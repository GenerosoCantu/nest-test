"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const operators_1 = require("rxjs/operators");
let ItemsService = class ItemsService {
    constructor(httpService, itemModel) {
        this.httpService = httpService;
        this.itemModel = itemModel;
    }
    async findAll() {
        return await this.itemModel.find();
    }
    async findOne(id) {
        const found = await this.itemModel.findOne({ _id: id });
        if (!found) {
            throw new common_1.NotFoundException();
        }
        return found;
    }
    async create(item) {
        const newItem = new this.itemModel(item);
        return await newItem.save();
    }
    async delete(id) {
        return await this.itemModel.findByIdAndRemove(id);
    }
    async update(id, item) {
        return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    }
    external() {
        return this.httpService.get('https://api.github.com/users/gcantuw')
            .pipe(operators_1.map(response => response.data));
    }
};
ItemsService = __decorate([
    common_1.Injectable(),
    __param(1, mongoose_2.InjectModel('Item')),
    __metadata("design:paramtypes", [common_1.HttpService, typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map