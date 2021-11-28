import { CollectionReference, DocumentData } from "@firebase/firestore";

export default interface CrudInterface<T> {
    create(data: T): Promise<void>;
    update(id: string, data: T): Promise<void>;
    delete(id: string): Promise<void>;
    stream(callback: (data: T[])=> void): Promise<void>;

    getCollection(): CollectionReference<DocumentData>;
}