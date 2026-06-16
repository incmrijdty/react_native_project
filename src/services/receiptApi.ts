import { supabase } from "../lib/supabase";

export async function uploadReceipt(
  uri: string,
  userId: string
) {
  try {
    const response = await fetch(uri);

    const arrayBuffer =
      await response.arrayBuffer();

    const fileName =
      `${userId}/${Date.now()}.jpg`;

    const { data, error } =
      await supabase.storage
        .from("receipts")
        .upload(
          fileName,
          arrayBuffer,
          {
            contentType: "image/jpeg",
          }
        );

    console.log("UPLOAD DATA", data);
    console.log("UPLOAD ERROR", error);

    if (error) {
      return {
        data: null,
        error,
      };
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("receipts")
      .getPublicUrl(fileName);

    return {
      data: publicUrl,
      error: null,
    };
  } catch (error) {
    console.log("UPLOAD CRASH", error);

    return {
      data: null,
      error,
    };
  }
}

export async function deleteReceipt(imageUrl: string) {
    const marker = '/storage/v1/object/public/receipts';
    const index = imageUrl.indexOf(marker);

    if (index === -1) return;

    const filePath = imageUrl.substring(
        index + marker.length
    );

    const { error } = 
        await supabase.storage
            .from('receipts')
            .remove([filePath]);
    
    return { error };
}