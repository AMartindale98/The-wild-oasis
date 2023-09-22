import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  //this was pulled from API docs. we are selecting all rows
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //this needs to be unique
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //creating cabin if there is no id to edit
  let query = supabase.from("cabins");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //editing cabin with id
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  //uploading image
  if (hasImagePath) return data;
  // Upload file using standard upload
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //deleting cabin if there was an error
  if (storageError) {
    await supabase
      .from("cabins")
      .delete()
      //this is where we specify on what to delete
      .eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin could not be created"
    );
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from("cabins")
    .delete()
    //this is where we specify on what to delete
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
