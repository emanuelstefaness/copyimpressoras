import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SiteInteractions from "@/components/SiteInteractions";
import { Icon } from "@/components/icons";
import { CATEGORIAS, getCategoria } from "@/lib/categorias";
import { supabase, isSupabaseConfigured, type Produto } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // sempre buscar produtos atualizados

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata({ params }: { params: { categoria: string } }): Promise<Metadata> {
  const cat = getCategoria(params.categoria);
  if (!cat) return { title: "Produto não encontrado — Copy Impressoras" };
  return {
    title: `${cat.title} — Copy Impressoras`,
    description: cat.intro,
  };
}

export default async function ProdutoCategoriaPage({ params }: { params: { categoria: string } }) {
  const cat = getCategoria(params.categoria);
  if (!cat) notFound();

  let produtos: Produto[] = [];
  const relMap: Record<string, Pick<Produto, "id" | "nome" | "categoria">> = {};
  if (supabase) {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .eq("categoria", cat.slug)
      .order("ordem", { ascending: true })
      .order("created_at", { ascending: true });
    produtos = data ?? [];

    // busca os dados dos produtos relacionados (nome/categoria) p/ os chips
    const relIds = Array.from(new Set(produtos.flatMap((p) => p.relacionados ?? [])));
    if (relIds.length) {
      const { data: rels } = await supabase
        .from("produtos")
        .select("id,nome,categoria")
        .in("id", relIds);
      (rels ?? []).forEach((r) => { relMap[r.id] = r as Pick<Produto, "id" | "nome" | "categoria">; });
    }
  }

  return (
    <>
      <Navbar />

      <main className="prod-page">
        <section className="prod-hero">
          <div className="container">
            <Link href="/#servicos" className="prod-back">
              <Icon name="chevronL" strokeWidth={2.2} /> Voltar para o site
            </Link>
            <span className="eyebrow">Nossos produtos</span>
            <h1 className="prod-hero-title">{cat.title}</h1>
            <p className="prod-hero-intro">{cat.intro}</p>
          </div>
        </section>

        <section className="prod-list">
          <div className="container">
            {produtos.length > 0 ? (
              <div className="prod-grid">
                {produtos.map((p) => (
                  <article className="prod-card" id={`p-${p.id}`} key={p.id}>
                    <div className="prod-card-media">
                      {p.imagem_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imagem_url} alt={p.nome} />
                      ) : (
                        <span className="prod-card-ph"><Icon name="box" /></span>
                      )}
                    </div>
                    <div className="prod-card-body">
                      {p.modelo && <span className="prod-card-model">{p.modelo}</span>}
                      <h3>{p.nome}</h3>
                      {p.descricao && <p>{p.descricao}</p>}
                      {p.relacionados && p.relacionados.some((rid) => relMap[rid]) && (
                        <div className="prod-card-rel">
                          <span className="prod-card-rel-label">Compatível com</span>
                          <div className="prod-card-rel-list">
                            {p.relacionados.map((rid) => {
                              const r = relMap[rid];
                              if (!r) return null;
                              return (
                                <Link key={rid} className="prod-rel-chip" href={`/produtos/${r.categoria}#p-${r.id}`}>
                                  {r.nome}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="prod-card-foot">
                        {p.valor && <span className="prod-card-valor">{p.valor}</span>}
                        <a className="prod-card-cta" data-wa href="#">
                          Solicitar orçamento <Icon name="arrow" strokeWidth={2.2} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="prod-empty">
                <span className="prod-empty-ico"><Icon name="box" /></span>
                <h3>Em breve, nossos produtos aqui</h3>
                <p>
                  {isSupabaseConfigured
                    ? "Ainda não há produtos cadastrados nesta categoria. Fale com a gente que montamos a solução ideal pra você."
                    : "Estamos preparando o catálogo desta categoria. Enquanto isso, solicite um orçamento e nossa equipe te atende na hora."}
                </p>
                <a className="btn btn--primary" data-wa href="#">
                  Falar no WhatsApp <Icon name="arrow" strokeWidth={2.4} />
                </a>
              </div>
            )}
          </div>
        </section>

        <section className="prod-cta">
          <div className="container">
            <div className="cta-box">
              <div className="grid-lines" />
              <h2>Não encontrou o que <span className="lime">procura</span>?</h2>
              <p>Trabalhamos com diversas marcas e modelos. Fale com a gente e encontramos a solução ideal.</p>
              <div className="cta-actions">
                <Link className="btn btn--primary" href="/#contato">
                  Solicitar orçamento <Icon name="arrow" strokeWidth={2.4} />
                </Link>
                <a className="btn btn--wa" data-wa href="#">Falar no WhatsApp</a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <a className="wa-round wa-fab" data-wa href="#" aria-label="Fale no WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.1-.7.2-.8 1-.9 1.1-.3.2-.6.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.5L9 6.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3c-.3.3-1 1-1 2.3s1 2.7 1.2 2.9 2 3 4.8 4.2c2.4 1 2.4.7 2.8.6s1.7-.7 2-1.3.3-1.3.2-1.4z" />
          <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" />
        </svg>
      </a>

      <SiteInteractions />
    </>
  );
}
