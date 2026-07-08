import { supabase } from "./supabase";

export const obtenerDatosContacto = async (idContacto) => {const { data, error } = await supabase.from("dato_contacto").select("*").eq("id_contacto", idContacto);
  if (error) {throw error;}
  return data;
};

export const crearDatoContacto =
async (nuevoDato) => {const { data, error } = await supabase.from("dato_contacto").insert([nuevoDato]);
  if (error) {throw error;}
  return data;
};

export const eliminarDatoContacto = async (id) => {const { error } = await supabase.from("dato_contacto").delete().eq("id_dato_contacto", id);
  if (error) {throw error;}
};