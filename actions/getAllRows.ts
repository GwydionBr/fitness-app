import { supabase } from "@/utils/supabase";
import { TableNames, ApiResponse } from "@/types/action.types";
import { Tables } from "@/types/db.types";

export async function getAllRows<T extends TableNames>(
  tableName: T
): Promise<ApiResponse<T>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      data: null,
      error: "User not found",
      success: false,
    };
  }

  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("user_id" , user.id);

  if (error) {
    return {
      data: null,
      error: error.message,
      success: false,
    };
  }

  return {
    success: true,
    data: data as Tables<T>[],
    error: null,
  };
}
