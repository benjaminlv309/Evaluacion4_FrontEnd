import { useState } from "react";
import "./ContactDataForm.css";
import { crearDatoContacto } from "../../services/contactDataApi";

function ContactDataForm({ idContacto, cargarDatos }) {
  const [tipo, setTipo] = useState("Personal");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const validarCorreo = (correo) => {
    if (correo.trim() === "") return true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(correo);
  };
  const validarTelefono = (telefono) => {
    if (telefono.trim() === "") return true;
    return /^[0-9]{9}$/.test(telefono);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      telefono.trim() === "" &&
      correo.trim() === "" &&
      direccion.trim() === ""
    ) {
      alert("Debe ingresar al menos un dato.");
      return;
    }
    if (!validarTelefono(telefono)) {
      alert("El teléfono debe contener exactamente 9 números.");
      return;
    }
    if (!validarCorreo(correo)) {
      alert("Ingrese un correo válido.");
      return;
    }
    if (
      direccion !== "" &&
      direccion.length < 5
    ) {
      alert("La dirección debe contener al menos 5 caracteres.");
      return;
    }
    try {
      await crearDatoContacto({id_contacto: idContacto, tipo, telefono, correo, direccion});
      await cargarDatos();
      setTipo("Personal");
      setTelefono("");
      setCorreo("");
      setDireccion("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="form-section">
      <h3>Agregar nuevo dato</h3>
      <form className="contact-data-form" onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Tipo</label>
              <select value={tipo}onChange={(e) =>setTipo(e.target.value)}>
                  <option value="Personal">Personal</option>
                  <option value="Trabajo">Trabajo</option>
                  <option value="Casa">Casa</option>
              </select>
          </div>
          <div className="form-group">
              <label>Teléfono</label>
              <input type="text" maxLength="9" placeholder="912345678" value={telefono} onChange={(e) => setTelefono( e.target.value.replace(/\D/g, ""))}/>
          </div>
          <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" placeholder="correo@ejemplo.com" value={correo}onChange={(e) => setCorreo(e.target.value)}/>
          </div>
          <div className="form-group">
              <label>Dirección</label>
              <input type="text" placeholder="Ingrese una dirección" value={direccion} onChange={(e) =>setDireccion(e.target.value)}/>
          </div>
        <button type="submit">Agregar dato</button>
      </form>
    </section>
  );
}

export default ContactDataForm;