export type Categoria = {
  slug: string;
  title: string; // nome completo (card + página)
  img: string; // imagem do card na home
  cardText: string; // descrição curta no card da home
  intro: string; // texto de abertura na página da categoria
};

export const CATEGORIAS: Categoria[] = [
  {
    slug: "impressoras",
    title: "Locação de Impressoras",
    img: "/card-impressora.png",
    cardText: "Soluções completas com manutenção inclusa, suporte técnico e equipamentos de alta performance.",
    intro:
      "Trabalhamos com as principais marcas do mercado em planos de locação com manutenção e suporte inclusos. Conheça os equipamentos disponíveis.",
  },
  {
    slug: "filamentos",
    title: "Filamentos 3D",
    img: "/card-filamento.png",
    cardText: "Filamentos de alta qualidade para impressões 3D mais precisas e duráveis.",
    intro:
      "Filamentos de alta qualidade das melhores marcas, em diversos tipos e cores para cada aplicação da sua impressão 3D.",
  },
  {
    slug: "cartuchos",
    title: "Cartuchos",
    img: "/card-cartucho.png",
    cardText: "Cartuchos originais e compatíveis com ótimo rendimento e excelente custo-benefício.",
    intro:
      "Cartuchos originais e compatíveis para todas as marcas, com ótimo rendimento e o melhor custo-benefício.",
  },
  {
    slug: "toners",
    title: "Toners",
    img: "/card-toner.png",
    cardText: "Toners originais e compatíveis com máxima performance e qualidade de impressão.",
    intro:
      "Toners para impressoras laser de todas as marcas — originais, compatíveis e recarga — com máxima performance.",
  },
];

export function getCategoria(slug: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.slug === slug);
}
