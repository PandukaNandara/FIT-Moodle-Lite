import db from "../../config/firebaseConfig";
import { collection, onSnapshot } from "@firebase/firestore";


export default class SubjectService {
  getAll() {
    onSnapshot(collection(db,"subjects"),(snapshot) => {
        return (snapshot.docs.map((doc) => doc.data));
    });
  }

//   create(tutorial: ISubjectData) {
//     return db.add(tutorial);
//   }

//   update(id: string, value: any) {
//     return db.doc(id).update(value);
//   }

//   delete(id: string) {
//     return db.doc(id).delete();
//   }
}
