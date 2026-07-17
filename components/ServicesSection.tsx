import Link from "next/link";
import { CATEGORIAS } from "@/lib/categorias";
import { Icon } from "./icons";

export default function ServicesSection() {
  return (
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
          {CATEGORIAS.map((c, i) => (
            <article className="card reveal" data-d={String((i % 4) + 1)} key={c.slug}>
              <div className="card-media">
                <span className="card-media-glow" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.title} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.cardText}</p>
              <Link className="card-link" href={`/produtos/${c.slug}`}>
                Saiba mais <Icon name="arrow" strokeWidth={2.2} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
