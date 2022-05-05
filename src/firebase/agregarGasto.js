import { db } from './firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

const agregarGasto = async ({ categoria, descripcion, cantidad, fecha, uidUsuario }) => {
    return await addDoc(collection(db, 'gastos'), {
        categoria,
        descripcion,
        cantidad: Number(cantidad),
        fecha,
        uidUsuario
    });
}

export default agregarGasto;