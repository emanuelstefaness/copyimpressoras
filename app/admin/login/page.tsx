"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const entrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!supabase) {
      setErro("Supabase ainda não configurado. Adicione as chaves em .env.local.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
    setLoading(false);
    if (error) {
      setErro("E-mail ou senha inválidos.");
      return;
    }
    router.push("/admin");
  };

  return (
    <main className="admin-auth">
      <form className="admin-card" onSubmit={entrar}>
        <Link href="/" className="admin-logo" aria-label="Copy Impressoras">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Copy Impressoras" />
        </Link>
        <h1>Painel administrativo</h1>
        <p className="admin-sub">Entre para gerenciar os produtos do site.</p>

        {!isSupabaseConfigured && (
          <div className="admin-warn">Supabase não configurado ainda — o login será ativado quando as chaves forem adicionadas.</div>
        )}

        <label className="admin-field">
          <span>E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@copyimpressoras.com.br" required />
        </label>
        <label className="admin-field">
          <span>Senha</span>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" required />
        </label>

        {erro && <div className="admin-error">{erro}</div>}

        <button className="btn btn--primary" type="submit" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </button>
        <Link href="/" className="admin-back">← Voltar ao site</Link>
      </form>
    </main>
  );
}
