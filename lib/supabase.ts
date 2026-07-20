import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true quando as variáveis de ambiente do Supabase estão configuradas */
export const isSupabaseConfigured = Boolean(url && anon);

/** cliente Supabase (null enquanto as chaves não forem configuradas).
 *  Usa fetch com cache: "no-store" para o Next.js nunca servir dados
 *  cacheados (produtos precisam aparecer assim que cadastrados no admin). */
export const supabase = isSupabaseConfigured
  ? createClient(url as string, anon as string, {
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, { ...init, cache: "no-store" }),
      },
    })
  : null;

export type Produto = {
  id: string;
  categoria: string;
  nome: string;
  modelo: string | null;
  valor: string | null;
  descricao: string | null;
  imagem_url: string | null;
  relacionados: string[] | null;
  ordem: number | null;
  created_at: string;
};

export const BUCKET = "produtos";
