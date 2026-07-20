"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured, BUCKET, type Produto } from "@/lib/supabase";
import { CATEGORIAS } from "@/lib/categorias";

type Form = {
  id: string | null;
  categoria: string;
  nome: string;
  modelo: string;
  valor: string;
  descricao: string;
  imagem_url: string;
};

const emptyForm: Form = { id: null, categoria: CATEGORIAS[0].slug, nome: "", modelo: "", valor: "", descricao: "", imagem_url: "" };

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [form, setForm] = useState<Form>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from("produtos").select("*").order("categoria").order("created_at");
    setProdutos(data ?? []);
  }, []);

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { router.replace("/admin/login"); return; }
      setReady(true);
      carregar();
    });
  }, [router, carregar]);

  const sair = async () => {
    await supabase?.auth.signOut();
    router.replace("/admin/login");
  };

  const editar = (p: Produto) => {
    setForm({
      id: p.id, categoria: p.categoria, nome: p.nome,
      modelo: p.modelo ?? "", valor: p.valor ?? "", descricao: p.descricao ?? "", imagem_url: p.imagem_url ?? "",
    });
    setFile(null);
    setMsg(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const limpar = () => { setForm(emptyForm); setFile(null); setMsg(null); };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true); setMsg(null);
    try {
      let imagem_url = form.imagem_url;
      if (file) {
        const path = `${form.categoria}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
        const up = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });
        if (up.error) throw up.error;
        imagem_url = supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
      }
      const payload = {
        categoria: form.categoria, nome: form.nome, modelo: form.modelo || null,
        valor: form.valor || null, descricao: form.descricao || null, imagem_url: imagem_url || null,
      };
      const res = form.id
        ? await supabase.from("produtos").update(payload).eq("id", form.id)
        : await supabase.from("produtos").insert(payload);
      if (res.error) throw res.error;
      setMsg("Produto salvo com sucesso!");
      limpar();
      carregar();
    } catch (err) {
      setMsg("Erro ao salvar: " + (err instanceof Error ? err.message : "tente novamente."));
    } finally {
      setSaving(false);
    }
  };

  const excluir = async (p: Produto) => {
    if (!supabase || !confirm(`Excluir "${p.nome}"?`)) return;
    const { error } = await supabase.from("produtos").delete().eq("id", p.id);
    if (error) { setMsg("Erro ao excluir: " + error.message); return; }
    carregar();
  };

  if (!isSupabaseConfigured) {
    return (
      <main className="admin-auth">
        <div className="admin-card">
          <h1>Painel administrativo</h1>
          <div className="admin-warn">
            O Supabase ainda não foi configurado. Adicione <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> no arquivo <code>.env.local</code> (veja o SUPABASE_SETUP.md) e recarregue.
          </div>
          <Link href="/" className="admin-back">← Voltar ao site</Link>
        </div>
      </main>
    );
  }

  if (!ready) return <main className="admin-auth"><div className="admin-card"><p className="admin-sub">Carregando…</p></div></main>;

  return (
    <main className="admin">
      <header className="admin-top">
        <Link href="/" className="admin-logo sm" aria-label="Copy Impressoras">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Copy Impressoras" />
        </Link>
        <div className="admin-top-actions">
          <Link href="/" className="admin-link">Ver site</Link>
          <button className="admin-link" onClick={sair}>Sair</button>
        </div>
      </header>

      <div className="admin-body">
        {/* formulário */}
        <form className="admin-panel" onSubmit={salvar}>
          <h2>{form.id ? "Editar produto" : "Novo produto"}</h2>
          <label className="admin-field">
            <span>Categoria</span>
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
              {CATEGORIAS.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
            </select>
          </label>
          <label className="admin-field">
            <span>Nome do produto</span>
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Multifuncional Laser" required />
          </label>
          <label className="admin-field">
            <span>Modelo <em>(opcional)</em></span>
            <input value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} placeholder="Ex.: HP LaserJet M428" />
          </label>
          <label className="admin-field">
            <span>Valor <em>(opcional)</em></span>
            <input value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })} placeholder="Ex.: R$ 1.200,00 ou A partir de R$ 99/mês" />
          </label>
          <label className="admin-field">
            <span>Descrição</span>
            <textarea rows={4} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} placeholder="Detalhes do produto…" />
          </label>
          <label className="admin-field">
            <span>Foto</span>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
          {(file || form.imagem_url) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="admin-preview" src={file ? URL.createObjectURL(file) : form.imagem_url} alt="Prévia" />
          )}
          {msg && <div className="admin-msg">{msg}</div>}
          <div className="admin-form-actions">
            <button className="btn btn--primary" type="submit" disabled={saving}>
              {saving ? "Salvando…" : form.id ? "Salvar alterações" : "Adicionar produto"}
            </button>
            {form.id && <button type="button" className="admin-link" onClick={limpar}>Cancelar</button>}
          </div>
        </form>

        {/* lista */}
        <div className="admin-list">
          <h2>Produtos cadastrados <span>({produtos.length})</span></h2>
          {produtos.length === 0 && <p className="admin-sub">Nenhum produto ainda. Cadastre o primeiro ao lado.</p>}
          {produtos.map((p) => (
            <div className="admin-item" key={p.id}>
              <div className="admin-item-thumb">
                {p.imagem_url
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={p.imagem_url} alt={p.nome} />
                  : <span>—</span>}
              </div>
              <div className="admin-item-info">
                <span className="admin-item-cat">{CATEGORIAS.find((c) => c.slug === p.categoria)?.title ?? p.categoria}</span>
                <strong>{p.nome}</strong>
                {p.modelo && <small>{p.modelo}</small>}
              </div>
              <div className="admin-item-actions">
                <button className="admin-link" onClick={() => editar(p)}>Editar</button>
                <button className="admin-link danger" onClick={() => excluir(p)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
