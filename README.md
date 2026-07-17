# COPY Impressoras — Landing (Next.js + React Three Fiber)

Landing page premium com identidade **tinta CMYK** e uma **impressora 3D real** (GLB) renderizada em tempo real na Hero, imprimindo o conteúdo da página.

## Stack
- **Next.js 14** (App Router) + **TypeScript**
- **React Three Fiber** + **drei** + **three** (impressora 3D `/public/printer.glb`)
- **GSAP** (timeline da folha “saindo” da impressora + linha do processo no scroll)
- **Lenis** (scroll suave)
- Canvas 2D próprio (ondas de tinta CMYK) — mais leve que tsParticles
- CSS custom (design system em `app/globals.css`), sem Tailwind

## Rodar
```bash
npm install
npm run dev      # http://localhost:3000
# produção:
npm run build && npm start
```
> O 3D usa WebGL — abra em um navegador de verdade (Chrome/Edge/Firefox).

## Ajustes rápidos (o que você provavelmente vai querer mexer)

| O quê | Onde |
|---|---|
| **Número do WhatsApp** | `components/SiteInteractions.tsx` → `WA_NUMBER` |
| **Girar a impressora** p/ mostrar a frente | `components/PrinterCanvas.tsx` → `MODEL_YAW` (radianos; `Math.PI` = 180°) |
| **Intensidade do parallax** do mouse | `PrinterCanvas.tsx` → `TILT_Y` / `TILT_X` |
| **Altura / encaixe** da impressora com a folha | `app/globals.css` → `.printer-wrap--3d { height / margin-bottom }` |
| **Iluminação** da cena 3D | `PrinterCanvas.tsx` (lights + `ContactShadows`) |
| **Trocar o modelo 3D** | substitua `public/printer.glb` |
| **Logo** | `components/icons.tsx` → `BrandMark` (provisória) |
| Cores / tipografia | `app/globals.css` → variáveis `:root` |

## Estrutura
```
app/
  layout.tsx        # fonts + metadata
  globals.css       # design system (CMYK) — portado 1:1 do protótipo
  page.tsx          # monta todas as seções (server component)
components/
  Hero.tsx          # Hero: ondas de tinta + impressora 3D + folha imprimindo (GSAP)
  PrinterCanvas.tsx # cena R3F (client, sem SSR) — carrega o GLB
  SiteInteractions.tsx # reveal, count-up, form, nav, Lenis, botões magnéticos
  icons.tsx         # ícones SVG + logo provisória
public/printer.glb  # Office MFP — Mikael Ganehag Brorsson, CC BY 3.0 (Poly Pizza)
```

## Créditos
Modelo 3D “Office MFP” por **Mikael Ganehag Brorsson** — CC BY 3.0 (via Poly Pizza).
Ao publicar, mantenha a atribuição (já consta no rodapé/here).
