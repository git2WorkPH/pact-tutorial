"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */
var chai = __importStar(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var path = require("path");
var sinon_chai_1 = __importDefault(require("sinon-chai"));
var pact_1 = require("@pact-foundation/pact");
var expect = chai.expect;
var index_1 = require("../index");
var mocha_1 = require("mocha");
var eachLike = pact_1.Matchers.eachLike;
chai.use(sinon_chai_1.default);
chai.use(chai_as_promised_1.default);
mocha_1.describe("The Dog API", function () {
    var url = "http://localhost";
    var dogService;
    var provider = new pact_1.Pact({
        // port,
        log: path.resolve(process.cwd(), "logs", "pacts.log"),
        dir: path.resolve(process.cwd(), "pacts"),
        logLevel: 'info',
        spec: 4,
        consumer: "Consumer",
        provider: "Provider",
    });
    var dogExample = { dog: 1 };
    var EXPECTED_BODY = eachLike(dogExample);
    before(function () {
        return provider.setup().then(function (opts) {
            dogService = new index_1.DogService({ url: url, port: opts.port });
        });
    });
    after(function () { return provider.finalize(); });
    afterEach(function () { return provider.verify(); });
    mocha_1.describe("get /dogs using builder pattern", function () {
        before(function () {
            var interaction = new pact_1.Interaction()
                .given("I have a list of dogs")
                .uponReceiving("a request for all dogs with the builder pattern")
                .withRequest({
                method: "GET",
                path: "/dogs",
                headers: {
                    Accept: "application/json",
                },
            })
                .willRespondWith({
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: EXPECTED_BODY,
            });
            return provider.addInteraction(interaction);
        });
        it("returns the correct response", function (done) {
            dogService.getMeDogs().then(function (response) {
                expect(response.data[0]).to.deep.eq(dogExample);
                done();
            }, done);
        });
    });
    mocha_1.describe("get /dogs using object pattern", function () {
        before(function () {
            return provider.addInteraction({
                state: "i have a list of dogs",
                uponReceiving: "a request for all dogs with the object pattern",
                withRequest: {
                    method: "GET",
                    path: "/dogs",
                    headers: {
                        Accept: "application/json",
                    },
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: EXPECTED_BODY,
                },
            });
        });
        it("returns the correct response", function (done) {
            dogService.getMeDogs().then(function (response) {
                expect(response.data[0]).to.deep.eq(dogExample);
                done();
            }, done);
        });
    });
});
