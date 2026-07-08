import { useEffect, useState } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import {obtenerContactos, crearContacto, eliminarContacto}
from "./services/contactApi";

function App() {
  const [contactos, setContactos] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {cargarContactos();
  }, []);

  const cargarContactos = async () => {try {const data = await obtenerContactos();setContactos(data);
  } catch (error) {setError("Error al cargar contactos");
      console.error(error);
    }
  };

  const agregarContacto = async (nuevoContacto) => {try {await crearContacto(nuevoContacto);cargarContactos();
  } catch (error) {setError("No se pudo agregar el contacto");
      console.error(error);
    }
  };

  const borrarContacto = async (id) => {try {await eliminarContacto(id);cargarContactos();
  } catch (error) {setError("No se pudo eliminar el contacto");
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>Agenda de Contactos</h1>
      {error && <p>{error}</p>}
      <ContactForm agregarContacto={agregarContacto}/>
      <ContactList contactos={contactos}borrarContacto={borrarContacto}/>
    </div>
  );
}

export default App;