"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Whatsapp, Icon } from "./icons";

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = wrapRef.current;
    const copy = copyRef.current;

    if (!reduce && copy) {
      const items = Array.from(copy.children) as HTMLElement[];
      gsap.set(items, { opacity: 0, y: 26 });
      gsap.to(items, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        stagger: 0.12, delay: 0.15,
      });
    }
    if (!reduce && wrap) {
      gsap.set(wrap, { opacity: 0, scale: 0.94, transformPerspective: 1000 });
      gsap.to(wrap, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.35 });
    }

    // subtle mouse tilt on the printer (max ~5°)
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (!wrap || reduce) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rx = (e.clientY / window.innerHeight - 0.5) * -5;
        const ry = (e.clientX / window.innerWidth - 0.5) * 6;
        gsap.to(wrap, { rotateX: rx, rotateY: ry, duration: 0.7, ease: "power2.out", overwrite: "auto" });
      });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" id="inicio">
      <div className="hero-grid">
        <div className="hero-copy" ref={copyRef}>
          <span className="eyebrow">Soluções completas em impressão</span>
          <h1>
            Tecnologia que <span className="lime">impulsiona</span> o seu negócio
          </h1>
          <p className="lead">
            Locação de impressoras, filamentos 3D, cartuchos e toners com qualidade,
            economia e suporte especializado para você e sua empresa.
          </p>
          <div className="hero-actions">
            <a className="btn btn--primary" href="#contato">
              Solicitar orçamento <Icon name="arrow" strokeWidth={2.4} />
            </a>
            <a className="btn btn--wa" data-wa href="#">
              <Whatsapp /> Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-stage">
          <div className="stage-glow" />
          <div className="stage-rings" />
          <div className="stage-scan" />
          <div className="printer-photo-wrap" ref={wrapRef}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/impressora.png" alt="Multifuncional Copy Impressoras em destaque" className="printer-photo" />
          </div>

          <div className="stage-labels">
            <span className="on">Tecnologia</span>
            <span>Precisão</span>
            <span>Desempenho</span>
            <span className="on">Economia</span>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#servicos" aria-label="Rolar para serviços">
        <span className="mouse" />
        Scroll
      </a>
    </section>
  );
}
