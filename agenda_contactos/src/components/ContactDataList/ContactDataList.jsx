import "./ContactDataList.css";
import { eliminarDatoContacto } from "../../services/contactDataApi";

function ContactDataList({ datosContacto, cargarDatos }) {
    const borrarDato = async (id) => {
        try {
            await eliminarDatoContacto(id);
            await cargarDatos();
        } catch (error) {
            console.error(error);
        }
    };
    if (datosContacto.length === 0) {
        return (
            <section className="contact-data-list">
                <h3 className="data-title">Datos de contacto</h3>
                <p className="no-data">Este contacto aún no posee datos registrados.</p>
            </section>
        );
    }
    return (
        <section className="contact-data-list">
            <h3 className="data-title">Datos de contacto</h3>
            {datosContacto.map((dato, index) => (
                <div className="contact-data-row" key={dato.id_dato_contacto}>
                    <div className="contact-data-info">
                        <p><strong>Tipo:</strong> {dato.tipo}</p>
                        {dato.telefono && (
                            <p>{dato.telefono}</p>
                        )}
                        {dato.correo && (
                            <p>{dato.correo}</p>)}
                        {dato.direccion && (
                            <p>{dato.direccion}</p>
                        )}
                    </div>
                    <button className="delete-data" onClick={() => borrarDato(dato.id_dato_contacto)}>Eliminar</button>
                    {index !== datosContacto.length - 1 && (
                        <div className="divider"></div>
                    )}
                </div>
            ))}
        </section>
    );
}

export default ContactDataList;