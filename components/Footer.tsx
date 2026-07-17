import { Icon, Whatsapp } from "./icons";

export default function Footer({ home = false }: { home?: boolean }) {
  const homeHref = home ? "#inicio" : "/";
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href={homeHref} aria-label="Copy Impressoras">
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
  );
}
