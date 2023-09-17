export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          answer: Json
          answer_type: string
          created_at: string
          id: string
          keys: string[]
          needs_additional_incorrect_count: number
          question: Json
          question_type: string
          quiz_id: number
        }
        Insert: {
          answer: Json
          answer_type: string
          created_at?: string
          id: string
          keys: string[]
          needs_additional_incorrect_count?: number
          question: Json
          question_type: string
          quiz_id: number
        }
        Update: {
          answer?: Json
          answer_type?: string
          created_at?: string
          id?: string
          keys?: string[]
          needs_additional_incorrect_count?: number
          question?: Json
          question_type?: string
          quiz_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "questions_quiz_id_fkey"
            columns: ["quiz_id"]
            referencedRelation: "quizes"
            referencedColumns: ["id"]
          }
        ]
      }
      quizes: {
        Row: {
          answer_formats: string[]
          created_at: string
          description: string
          id: number
          name: string
          question_formats: string[]
          slug: string
        }
        Insert: {
          answer_formats: string[]
          created_at?: string
          description: string
          id?: number
          name: string
          question_formats: string[]
          slug: string
        }
        Update: {
          answer_formats?: string[]
          created_at?: string
          description?: string
          id?: number
          name?: string
          question_formats?: string[]
          slug?: string
        }
        Relationships: []
      }
      user_key_scores: {
        Row: {
          created_at: string
          ease_factor: number
          interval: number
          key: string
          last_review_date: string
          next_review_date: string
          repetition_number: number
          score: number
          user_id: number
        }
        Insert: {
          created_at?: string
          ease_factor?: number
          interval?: number
          key: string
          last_review_date?: string
          next_review_date?: string
          repetition_number?: number
          score: number
          user_id: number
        }
        Update: {
          created_at?: string
          ease_factor?: number
          interval?: number
          key?: string
          last_review_date?: string
          next_review_date?: string
          repetition_number?: number
          score?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_key_scores_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_question_scores: {
        Row: {
          attempts: number
          created_at: string
          id: number
          keys: string[]
          score: number
          user_id: number
        }
        Insert: {
          attempts?: number
          created_at?: string
          id?: number
          keys: string[]
          score: number
          user_id: number
        }
        Update: {
          attempts?: number
          created_at?: string
          id?: number
          keys?: string[]
          score?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_question_scores_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
