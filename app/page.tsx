import Hero from "@/components/Hero";
import SiteInteractions from "@/components/SiteInteractions";
import { Icon, Whatsapp } from "@/components/icons";

/* ---- data ---- */
const SERVICES = [
  {
    idx: "01",
    img: "/card-impressora.png",
    title: "Locação de Impressoras",
    text: "Soluções completas com manutenção inclusa, suporte técnico e equipamentos de alta performance.",
  },
  {
    idx: "02",
    img: "/card-filamento.png",
    title: "Filamentos 3D",
    text: "Filamentos de alta qualidade para impressões 3D mais precisas e duráveis.",
  },
  {
    idx: "03",
    img: "/card-cartucho.png",
    title: "Cartuchos",
    text: "Cartuchos originais e compatíveis com ótimo rendimento e excelente custo-benefício.",
  },
  {
    idx: "04",
    img: "/card-toner.png",
    title: "Toners",
    text: "Toners originais e compatíveis com máxima performance e qualidade de impressão.",
  },
];

const BRANDS = ["Canon", "Epson", "Kyocera", "Ricoh", "Creality", "Elegoo", "HP", "Brother"];

export default function Page() {
  return (
    <>
      {/* ---------------- NAVBAR ---------------- */}
      <header className="nav" id="nav">
        <div className="nav-inner">
          <a className="brand" href="#inicio" aria-label="Copy Impressoras">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src="/logo.png" alt="Copy Impressoras" />
          </a>
          <nav className="nav-links">
            <a href="#inicio" className="active">Início</a>
            <a href="#empresa">Empresa</a>
            <a href="#servicos">Serviços</a>
            <a href="#marcas">Marcas</a>
            <a href="#contato">Contato</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn--primary nav-cta-btn" href="#contato">
              <span className="full">Solicitar</span> Orçamento
            </a>
            <button className="burger" id="burger" aria-label="Menu"><span /></button>
          </div>
        </div>
      </header>

      <main>
        <Hero />

        {/* ---------------- SERVIÇOS ---------------- */}
        <section className="services" id="servicos">
          <div className="container">
            <div className="services-top">
              <div className="section-head reveal" style={{ marginBottom: 0 }}>
                <span className="eyebrow">Nossas soluções</span>
                <h2 className="section-title">
                  Tudo o que você precisa <br /> em <span className="lime">um só lugar</span>
                </h2>
              </div>
            </div>

            <div className="cards">
              {SERVICES.map((s, i) => (
                <article className="card reveal" data-d={String((i % 4) + 1)} key={s.idx}>
                  <div className="card-media">
                    <span className="card-media-glow" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.img} alt={s.title} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- QUEM SOMOS ---------------- */}
        <section className="about" id="empresa">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy reveal">
                <span className="eyebrow">Quem somos</span>
                <h2 className="section-title">
                  Compromisso com <span className="lime">qualidade</span> e o melhor atendimento
                </h2>
                <p className="body">
                  A Copy Impressoras atua há mais de 15 anos no mercado oferecendo soluções
                  inteligentes em impressão. Nosso objetivo é garantir produtos de qualidade,
                  preços justos e um atendimento ágil e eficiente, sempre atendendo às
                  necessidades de cada cliente.
                </p>
              </div>

              <div className="about-panel reveal" data-d="1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="about-bg" src="/fachada.png" alt="Fachada da loja Copy Impressoras" />
                <div className="about-scrim" />
                <div className="about-stats">
                  <span className="about-tag"><span className="dot" />Nossa loja física</span>
                  <div className="about-stat-list">
                    <div className="stat">
                      <b data-count="800" data-suffix="">+800</b>
                      <span>Clientes atendidos</span>
                    </div>
                    <div className="stat">
                      <b data-count="15" data-suffix="">+15</b>
                      <span>Anos de experiência</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- MARCAS ---------------- */}
        <section className="brands" id="marcas">
          <div className="container">
            <p className="brands-label">Marcas que trabalhamos</p>
            <div className="brand-grid">
              {BRANDS.map((b) => (
                <div className="brand-card reveal" key={b}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/marcas/${b.toLowerCase()}.svg`} alt={b} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA FINAL ---------------- */}
        <section className="cta" id="contato">
          <div className="container">
            <div className="cta-box reveal">
              <div className="grid-lines" />
              <h2>Pronto para <span className="lime">imprimir</span> com economia e qualidade?</h2>
              <p>
                Preencha os dados abaixo e nossa equipe entra em contato para montar a
                solução ideal em impressão para a sua empresa.
              </p>

              <form className="cta-form" id="orcamento-form" noValidate>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="of-nome">Nome</label>
                    <input id="of-nome" name="nome" type="text" placeholder="Seu nome" required />
                  </div>
                  <div className="field">
                    <label htmlFor="of-contato">Contato</label>
                    <input id="of-contato" name="contato" type="tel" placeholder="(00) 00000-0000" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="of-email">E-mail</label>
                  <input id="of-email" name="email" type="email" placeholder="voce@empresa.com.br" />
                </div>
                <div className="field">
                  <label htmlFor="of-descricao">Descrição</label>
                  <textarea id="of-descricao" name="descricao" rows={4} placeholder="Conte o que você precisa (impressoras, cartuchos, toners, filamentos 3D…)" required />
                </div>
                <button type="submit" className="btn btn--primary cta-form-submit">
                  Enviar solicitação <Icon name="arrow" strokeWidth={2.4} />
                </button>
                <p className="cta-form-note" data-form-status>
                  Ao enviar, você será direcionado ao nosso WhatsApp com a mensagem pronta.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ---------------- FOOTER ---------------- */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <a className="brand" href="#inicio" aria-label="Copy Impressoras">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="brand-logo brand-logo--footer" src="/logo.png" alt="Copy Impressoras" />
                </a>
                <p>Soluções completas em impressão, com a qualidade e a confiança que você já conhece.</p>
                <div className="social">
                  <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
                  <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
                  <a href="#" data-wa aria-label="WhatsApp"><Whatsapp /></a>
                </div>
              </div>

              <div>
                <h5>Contato</h5>
                <div className="row"><Whatsapp /><span>(42) 9 9818-7045 <em>WhatsApp</em></span></div>
                <div className="row"><Icon name="phone" /><span>(42) 3304-0432 <em>Fixo</em></span></div>
                <div className="row"><Icon name="mail" /><span>copyimpressoras1@gmail.com</span></div>
                <div className="row"><Icon name="instagram" /><span>@copyimpressoras</span></div>
              </div>

              <div>
                <h5>Endereço</h5>
                <div className="row"><Icon name="pin" /><span>Rua Pedro Siqueira, 685<br />Guarapuava — PR</span></div>
                <div className="row"><Icon name="clock" /><span>Seg a Sex — 08h às 18h<br />Sábado — 08h às 12h</span></div>
              </div>

              <div>
                <h5>Localização</h5>
                <div className="footer-map">
                  <iframe
                    title="Localização Copy Impressoras — Rua Pedro Siqueira 685, Guarapuava-PR"
                    src="https://maps.google.com/maps?q=Rua%20Pedro%20Siqueira%2C%20685%2C%20Guarapuava%20-%20PR&z=16&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a
                  className="map-link"
                  href="https://www.google.com/maps/search/?api=1&query=Rua+Pedro+Siqueira+685+Guarapuava+PR"
                  target="_blank"
                  rel="noopener"
                >
                  Ver no mapa <Icon name="arrow" strokeWidth={2.2} />
                </a>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} Copy Impressoras — Todos os direitos reservados.</span>
            </div>
          </div>
        </footer>
      </main>

      {/* floating whatsapp */}
      <a className="wa-round wa-fab" data-wa href="#" aria-label="Fale no WhatsApp"><Whatsapp /></a>

      <SiteInteractions />
    </>
  );
}
