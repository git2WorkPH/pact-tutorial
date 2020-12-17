"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogService = void 0;
var axios_1 = __importDefault(require("axios"));
var DogService = /** @class */ (function () {
    function DogService(endpoint) {
        var _this = this;
        this.getMeDogs = function () {
            return axios_1.default.request({
                baseURL: _this.url + ":" + _this.port,
                headers: { Accept: "application/json" },
                method: "GET",
                url: "/dogs",
            });
        };
        this.url = endpoint.url;
        this.port = endpoint.port;
    }
    return DogService;
}());
exports.DogService = DogService;
