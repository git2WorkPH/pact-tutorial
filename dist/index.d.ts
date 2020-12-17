import { AxiosPromise } from "axios";
export declare class DogService {
    private url;
    private port;
    constructor(endpoint: any);
    getMeDogs: () => AxiosPromise;
}
