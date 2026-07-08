import { useEffect, useState } from "react";
import "./ContactCard.css";
import ContactDataList from "../ContactDataList/ContactDataList";
import ContactDataForm from "../ContactDataForm/ContactDataForm";
import { obtenerDatosContacto } from "../../services/contactDataApi";

function ContactCard({contacto,borrarContacto}) {
  const [datosContacto, setDatosContacto] = useState([]);
  useEffect(() => {cargarDatos();}, []);
  const cargarDatos = async () => {
      try {
          const data = await obtenerDatosContacto(contacto.id_contacto);
          setDatosContacto(data);
      } catch (error) {
          console.error(error);
      }
  };
  return (
    <article className="contact-card">
        <div className="contact-header">
            <div className="contact-info">
                <div className="avatar">
                    {contacto.nombre.charAt(0)}
                    {contacto.apellido.charAt(0)}
                </div>
                <div className="contact-name">
                    <h2>{contacto.nombre} {contacto.apellido}</h2>
                </div>
            </div>
            <button className="delete-contact" onClick={() => borrarContacto(contacto.id_contacto)}>Eliminar contacto</button>
        </div>
        <ContactDataList datosContacto={datosContacto}cargarDatos={cargarDatos}/>
        <ContactDataForm idContacto={contacto.id_contacto}cargarDatos={cargarDatos}/>
    </article>
  );
}

export default ContactCard;