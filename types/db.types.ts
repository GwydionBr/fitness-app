export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      category: {
        Row: {
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          title: string;
          user_id?: string;
        };
        Update: {
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      exercise: {
        Row: {
          created_at: string;
          id: string;
          information: string | null;
          title: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          information?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          information?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      exercise_category: {
        Row: {
          category_id: string;
          created_at: string;
          exercise_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          category_id?: string;
          created_at?: string;
          exercise_id?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          category_id?: string;
          created_at?: string;
          exercise_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercise_category_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercise_category_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      training_exercise: {
        Row: {
          created_at: string;
          ecercise_id: string;
          id: string;
          max_repetitions: number | null;
          max_weight: number | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          ecercise_id: string;
          id?: string;
          max_repetitions?: number | null;
          max_weight?: number | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          ecercise_id?: string;
          id?: string;
          max_repetitions?: number | null;
          max_weight?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "training_exercise_ecercise_id_fkey";
            columns: ["ecercise_id"];
            isOneToOne: false;
            referencedRelation: "exercise";
            referencedColumns: ["id"];
          }
        ];
      };
      training_session: {
        Row: {
          end_time: string;
          id: string;
          start_time: string;
          user_id: string | null;
        };
        Insert: {
          end_time: string;
          id?: string;
          start_time: string;
          user_id?: string | null;
        };
        Update: {
          end_time?: string;
          id?: string;
          start_time?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      training_session_category: {
        Row: {
          categoy_id: string;
          created_at: string;
          id: string;
          training_session_id: string;
          user_id: string;
        };
        Insert: {
          categoy_id?: string;
          created_at?: string;
          id?: string;
          training_session_id?: string;
          user_id: string;
        };
        Update: {
          categoy_id?: string;
          created_at?: string;
          id?: string;
          training_session_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "training_session_category_categoy_id_fkey";
            columns: ["categoy_id"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "training_session_category_training_session_id_fkey";
            columns: ["training_session_id"];
            isOneToOne: false;
            referencedRelation: "training_session";
            referencedColumns: ["id"];
          }
        ];
      };
      training_set: {
        Row: {
          created_at: string;
          exercise_id: string;
          id: string;
          repetitions: number;
          training_session_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          exercise_id?: string;
          id?: string;
          repetitions?: number;
          training_session_id: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          exercise_id?: string;
          id?: string;
          repetitions?: number;
          training_session_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "training_set_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "training_exercise";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "training_set_training_session_id_fkey";
            columns: ["training_session_id"];
            isOneToOne: false;
            referencedRelation: "training_session";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
