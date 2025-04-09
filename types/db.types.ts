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
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          information?: string | null;
          title: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          information?: string | null;
          title?: string;
          user_id?: string;
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
          information: string | null;
          max_repetitions: number | null;
          max_weight: number | null;
          title: string;
          training_session_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          ecercise_id: string;
          id?: string;
          information?: string | null;
          max_repetitions?: number | null;
          max_weight?: number | null;
          title?: string;
          training_session_id: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          ecercise_id?: string;
          id?: string;
          information?: string | null;
          max_repetitions?: number | null;
          max_weight?: number | null;
          title?: string;
          training_session_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "training_exercise_ecercise_id_fkey";
            columns: ["ecercise_id"];
            isOneToOne: false;
            referencedRelation: "exercise";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "training_exercise_training_session_id_fkey";
            columns: ["training_session_id"];
            isOneToOne: false;
            referencedRelation: "training_session";
            referencedColumns: ["id"];
          }
        ];
      };
      training_session: {
        Row: {
          end_time: string;
          id: string;
          start_time: string;
          user_id: string;
        };
        Insert: {
          end_time: string;
          id?: string;
          start_time: string;
          user_id?: string;
        };
        Update: {
          end_time?: string;
          id?: string;
          start_time?: string;
          user_id?: string;
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
          id: string;
          repetitions: number;
          training_exercise_id: string;
          user_id: string;
          weight: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          repetitions?: number;
          training_exercise_id: string;
          user_id?: string;
          weight?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          repetitions?: number;
          training_exercise_id?: string;
          user_id?: string;
          weight?: number;
        };
        Relationships: [
          {
            foreignKeyName: "training_set_training_exercise_id_fkey";
            columns: ["training_exercise_id"];
            isOneToOne: false;
            referencedRelation: "training_exercise";
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

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
