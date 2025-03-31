import { supabase } from "@/utils/supabase";
import { TableNames, DeleteResponse } from "@/types/action.types";

interface DeleteRowProps {
  tableName: TableNames;
  id: string;
}

export async function deleteRow({
  tableName,
  id,
}: DeleteRowProps): Promise<DeleteResponse> {
  const response = await supabase.from(tableName).delete().eq("id", id);

  if (response.error) {
    return {
      success: false,
      data: null,
      error: response.error.message,
    };
  }

  return {
    success: true,
    data: null,
    error: null,
  };
}
