import "./ContactList.css";
import ContactCard from "../ContactCard/ContactCard";

function ContactList({contactos, borrarContacto
}) {
  if (contactos.length === 0) {
    return (<p>No hay contactos registrados</p>);
  }

  return (
    <section className="contact-list">
      {contactos.map((contacto) => (<ContactCard key={contacto.id_contacto}contacto={contacto}borrarContacto={borrarContacto}/>))}
    </section>
  );
}

export default ContactList;