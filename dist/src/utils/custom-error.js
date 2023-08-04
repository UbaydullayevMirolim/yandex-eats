"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerError = void 0;
class CustomerError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.CustomerError = CustomerError;
