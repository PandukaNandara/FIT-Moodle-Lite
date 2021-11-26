import Kuppi from "../models/Kuppi";
import CrudService from "./CrudService";

export default class KuppiService implements CrudService<Kuppi>{
    create(data: Kuppi): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Kuppi): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    stream(callback: (data: Kuppi[]) => void): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getCollection(): Promise<any> {
        throw new Error("Method not implemented.");
    }
}