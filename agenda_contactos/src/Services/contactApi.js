import { supabase } from "./supabase";

export const obtenerContactos = async () => {const { data, error } = await supabase.from("contacto").select("*").order("id_contacto",{ascending: true});
  if (error) {throw error;}
  return data;
};

export const crearContacto = async (nuevoContacto) => {const { data, error } = await supabase.from("contacto").insert([nuevoContacto]);
  if (error) {throw error;}
  return data;
};

export const eliminarContacto = async (id) => {const { error } =await supabase.from("contacto").delete().eq("id_contacto",id);
  if (error) {throw error;}
};