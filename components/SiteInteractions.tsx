"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const WA_NUMBER = "5542998187045"; // (42) 9 9818-7045
const WA_TEXT = "Olá! Gostaria de solicitar um orçamento com a Copy Impressoras.";
const EMAIL_TO = "copyimpressoras1@gmail.com"; // recebe as solicitações do formulário

export default function SiteInteractions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const disposers: Array<() => void> = [];
    const on = (el: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
      el.addEventListener(type, fn, opts);
      disposers.push(() => el.removeEventListener(type, fn, opts));
    };

    gsap.registerPlugin(ScrollTrigger);

    /* ---- Lenis smooth scroll ---- */
    let lenis: Lenis | null = null;
    let rafId = 0;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
      const raf = (t: number) => { lenis!.raf(t); rafId = requestAnimationFrame(raf); };
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", ScrollTrigger.update);
      (window as unknown as { lenis?: Lenis }).lenis = lenis;
    }

    /* ---- anchor scroll ---- */
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      on(a, "click", (e) => {
        const id = a.getAttribute("href")!;
        if (id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis ? lenis.scrollTo(el as HTMLElement, { offset: -74 }) : el.scrollIntoView({ behavior: "smooth" });
      })
    );

    /* ---- WhatsApp links ---- */
    const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_TEXT)}`;
    document.querySelectorAll<HTMLAnchorElement>("[data-wa]").forEach((el) => {
      el.href = waHref;
      el.target = "_blank";
      el.rel = "noopener";
    });

    /* ---- contact form -> WhatsApp ---- */
    const form = document.getElementById("orcamento-form") as HTMLFormElement | null;
    const note = document.querySelector<HTMLElement>("[data-form-status]");
    const noteDefault = note?.textContent || "";
    if (form) {
      on(form, "submit", (e) => {
        e.preventDefault();
        const data = new FormData(form);
        const nome = (data.get("nome") as string || "").trim();
        const contato = (data.get("contato") as string || "").trim();
        const email = (data.get("email") as string || "").trim();
        const descricao = (data.get("descricao") as string || "").trim();
        if (!nome || !contato || !descricao) {
          if (note) { note.textContent = "Preencha nome, contato e descrição."; note.className = "cta-form-note err"; }
          return;
        }
        const msg =
          `*Nova solicitação de orçamento — Copy Impressoras*\n\n` +
          `*Nome:* ${nome}\n` +
          `*Contato:* ${contato}\n` +
          (email ? `*E-mail:* ${email}\n` : "") +
          `*Descrição:* ${descricao}`;
        // 1) abre o WhatsApp com a mensagem pronta (síncrono = evita bloqueio de pop-up)
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
        // 2) envia uma cópia por e-mail (FormSubmit — dispara em segundo plano)
        fetch(`https://formsubmit.co/ajax/${EMAIL_TO}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: "Nova solicitação de orçamento — Copy Impressoras",
            _template: "table",
            Nome: nome,
            Contato: contato,
            "E-mail": email || "(não informado)",
            Descrição: descricao,
          }),
        }).catch(() => {});
        if (note) { note.textContent = "Enviado! Abrimos o WhatsApp e você também recebe por e-mail."; note.className = "cta-form-note ok"; }
        form.reset();
        setTimeout(() => { if (note) { note.textContent = noteDefault; note.className = "cta-form-note"; } }, 6000);
      });
    }

    /* ---- navbar glass on scroll ---- */
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("solid", window.scrollY > 40);
    onScroll();
    on(window, "scroll", onScroll, { passive: true });

    const burger = document.getElementById("burger");
    if (burger) on(burger, "click", () => {
      const t = document.querySelector("#servicos");
      lenis && t ? lenis.scrollTo(t as HTMLElement, { offset: -74 }) : t?.scrollIntoView({ behavior: "smooth" });
    });

    /* ---- scrollspy: active nav link ---- */
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const spy = new IntersectionObserver(
      (es) => es.forEach((en) => {
        if (!en.isIntersecting) return;
        const id = "#" + en.target.id;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === id));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["inicio", "servicos", "empresa", "marcas", "contato"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    disposers.push(() => spy.disconnect());

    /* ---- reveal on scroll ---- */
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    disposers.push(() => io.disconnect());

    /* ---- count up ---- */
    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          cio.unobserve(en.target);
          const el = en.target as HTMLElement;
          const end = +(el.dataset.count || "0");
          const suf = el.dataset.suffix || "";
          const pre = /^\+/.test(el.textContent || "") ? "+" : "";
          if (reduce) { el.textContent = pre + end + suf; return; }
          const t0 = performance.now();
          const tick = (t: number) => {
            const pr = Math.min((t - t0) / 1600, 1);
            const eased = 1 - Math.pow(1 - pr, 3);
            el.textContent = pre + Math.round(end * eased) + suf;
            if (pr < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 }
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => cio.observe(el));
    disposers.push(() => cio.disconnect());

    return () => {
      disposers.forEach((d) => d());
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return null;
}
