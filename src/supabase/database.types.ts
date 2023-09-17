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
          knowledge_key: string
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
          knowledge_key: string
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
          knowledge_key?: string
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
      user_knowledge_keys: {
        Row: {
          created_at: string
          ease_factor: number
          interval: number
          key: string
          last_review_date: string
          next_review_date: string
          repetition_number: number
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          ease_factor?: number
          interval?: number
          key: string
          last_review_date?: string
          next_review_date?: string
          repetition_number?: number
          score?: number
          user_id: string
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
          user_id?: string
        }
        Relationships: []
      }
      user_question_scores: {
        Row: {
          attempts: number
          created_at: string
          knowledge_key: string
          question_id: string
          user_id: string
          user_quiz_id: number
        }
        Insert: {
          attempts?: number
          created_at?: string
          knowledge_key: string
          question_id: string
          user_id: string
          user_quiz_id: number
        }
        Update: {
          attempts?: number
          created_at?: string
          knowledge_key?: string
          question_id?: string
          user_id?: string
          user_quiz_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_question_scores_knowledge_key_fkey"
            columns: ["knowledge_key"]
            referencedRelation: "user_knowledge_keys"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "user_question_scores_question_id_fkey"
            columns: ["question_id"]
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_question_scores_user_quiz_id_fkey"
            columns: ["user_quiz_id"]
            referencedRelation: "user_quiz_stats"
            referencedColumns: ["id"]
          }
        ]
      }
      user_quiz_stats: {
        Row: {
          created_at: string
          id: number
          quiz_id: number
          score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          quiz_id: number
          score?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          quiz_id?: number
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quiz_stats_quiz_id_fkey"
            columns: ["quiz_id"]
            referencedRelation: "quizes"
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
