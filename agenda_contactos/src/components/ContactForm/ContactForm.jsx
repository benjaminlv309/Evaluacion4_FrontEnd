import { useState } from "react";
import "./ContactForm.css";

function ContactForm({ agregarContacto }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const validarTexto = (texto) => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/;
    return regex.test(texto.trim());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nombreLimpio = nombre.trim();
    const apellidoLimpio = apellido.trim();
    if (nombreLimpio === "" || apellidoLimpio === "") {
      alert("Debe completar el nombre y el apellido.");
      return;
    }
    if (!validarTexto(nombreLimpio)) {
      alert("El nombre solo puede contener letras y debe tener entre 2 y 40 caracteres.");
      return;
    }
    if (!validarTexto(apellidoLimpio)) {
      alert("El apellido solo puede contener letras y debe tener entre 2 y 40 caracteres.");
      return;
    }
    try {
      await agregarContacto({nombre: nombreLimpio, apellido: apellidoLimpio});
      setNombre("");
      setApellido("");
    } catch (error) {console.error(error);
      alert("No fue posible agregar el contacto.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Nombre" value={nombre}maxLength={40}onChange={(e) => setNombre(e.target.value)}/>
      <input type="text" placeholder="Apellido" value={apellido}maxLength={40}onChange={(e) => setApellido(e.target.value)}/>
      <button type="submit">Agregar Contacto</button>
    </form>
  );
}

export default ContactForm;