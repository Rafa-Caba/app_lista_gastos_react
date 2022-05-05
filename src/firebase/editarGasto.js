import { db } from './firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";

const editarGasto = async ({ id, categoria, descripcion, cantidad, fecha }) => {
    const document = doc(db, 'gastos', id);
    return await updateDoc(document, {
        categoria,
        descripcion,
        cantidad: Number(cantidad),
        fecha,
    });
}


export default editarGasto;