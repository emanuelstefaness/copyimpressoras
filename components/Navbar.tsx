import { Icon } from "./icons";

/** Navbar do site. `home` = true na página inicial (âncoras locais).
 *  Nas páginas internas as âncoras apontam para "/#..." (voltam à home). */
export default function Navbar({ home = false }: { home?: boolean }) {
  const p = home ? "" : "/";
  return (
    <header className="nav" id="nav">
      <div className="nav-inner">
        <a className="brand" href={home ? "#inicio" : "/"} aria-label="Copy Impressoras">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="brand-logo" src="/logo.png" alt="Copy Impressoras" />
        </a>
        <nav className="nav-links">
          <a href={`${p}#inicio`} className={home ? "active" : ""}>Início</a>
          <a href={`${p}#empresa`}>Empresa</a>
          <a href={`${p}#servicos`}>Serviços</a>
          <a href={`${p}#marcas`}>Marcas</a>
          <a href={`${p}#contato`}>Contato</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn--primary nav-cta-btn" href={`${p}#contato`}>
            <span className="full">Solicitar</span> Orçamento
          </a>
          <button className="burger" id="burger" aria-label="Menu"><span /></button>
        </div>
      </div>
    </header>
  );
}
