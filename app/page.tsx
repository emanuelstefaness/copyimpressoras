import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import SiteInteractions from "@/components/SiteInteractions";
import { Icon, Whatsapp } from "@/components/icons";

/* ---- data ---- */
const BRANDS = ["Canon", "Epson", "Kyocera", "Ricoh", "Creality", "Elegoo", "HP", "Brother"];

export default function Page() {
  return (
    <>
      <Navbar home />

      <main>
        <Hero />

        {/* ---------------- SERVIÇOS ---------------- */}
        <ServicesSection />

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
                      <b data-count="7" data-suffix=" mil">+7 mil</b>
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

              <form className="cta-form" id="orcamento-form">
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
              </form>
            </div>
          </div>
        </section>

        <Footer home />
      </main>

      {/* floating whatsapp */}
      <a className="wa-round wa-fab" data-wa href="#" aria-label="Fale no WhatsApp"><Whatsapp /></a>

      <SiteInteractions />
    </>
  );
}
