import lisbon from "@/assets/p-lisbon.jpg";
import porto from "@/assets/p-porto.jpg";
import cascais from "@/assets/p-cascais.jpg";
import algarve from "@/assets/p-algarve.jpg";
import tavira from "@/assets/p-tavira.jpg";
import foz from "@/assets/p-foz.jpg";
import interior from "@/assets/interior.jpg";
import hero from "@/assets/hero.jpg";
import type { L } from "@/lib/i18n";

export type Region = "lisbon" | "porto" | "cascais" | "algarve";
export type PropertyType = "apartment" | "townhouse" | "villa";
export type Feature = "pool" | "garden" | "seaView" | "riverView" | "terrace" | "balcony" | "lift" | "garage" | "renovated";

export const REGIONS: Region[] = ["lisbon", "porto", "cascais", "algarve"];
export const TYPES: PropertyType[] = ["apartment", "townhouse", "villa"];
export const FEATURES: Feature[] = ["pool", "garden", "seaView", "riverView", "terrace", "balcony", "lift", "garage", "renovated"];

export type Property = {
  id: string;
  ref: string;
  title: L;
  region: Region;
  area: string;
  type: PropertyType;
  price: number;
  beds: number;
  baths: number;
  size: number;
  features: Feature[];
  images: string[];
  summary: L;
  description: L;
  neighbourhood: L;
};

export const properties: Property[] = [
  {
    id: "principe-real-apartment",
    ref: "NH-LX-0142",
    title: { en: "Restored apartment with city views", pt: "Apartamento recuperado com vista sobre a cidade" },
    region: "lisbon",
    area: "Príncipe Real",
    type: "apartment",
    price: 895000,
    beds: 3,
    baths: 2,
    size: 142,
    features: ["balcony", "lift", "renovated"],
    images: [lisbon, interior, hero],
    summary: { en: "High ceilings, herringbone floors and tall windows in a 19th-century building.", pt: "Tetos altos, soalho em espinha e janelas amplas num edifício do século XIX." },
    description: {
      en: "A carefully restored third-floor apartment in a classic Lisbon building. The living and dining room runs across three tall windows with iron balconies, original plaster cornices and oak herringbone floors. Three bedrooms, two bathrooms and a separate kitchen complete the layout. The building has a recently installed lift.",
      pt: "Apartamento num terceiro andar, cuidadosamente recuperado, num edifício clássico de Lisboa. A sala de estar e de jantar estende-se por três janelas altas com varandas em ferro, sancas originais e soalho de carvalho em espinha. Três quartos, duas casas de banho e cozinha independente completam a planta. O edifício tem elevador instalado recentemente.",
    },
    neighbourhood: {
      en: "Príncipe Real is a leafy, residential quarter known for its garden square, independent shops and quiet streets, within walking distance of Chiado and Avenida da Liberdade.",
      pt: "O Príncipe Real é um bairro residencial e arborizado, conhecido pelo seu jardim, lojas independentes e ruas tranquilas, a uma curta caminhada do Chiado e da Avenida da Liberdade.",
    },
  },
  {
    id: "ribeira-townhouse",
    ref: "NH-OP-0087",
    title: { en: "Tiled townhouse near the Douro", pt: "Moradia em azulejo junto ao Douro" },
    region: "porto",
    area: "Ribeira",
    type: "townhouse",
    price: 640000,
    beds: 4,
    baths: 3,
    size: 188,
    features: ["riverView", "terrace", "renovated"],
    images: [porto, interior, foz],
    summary: { en: "Granite and blue azulejo façade, four floors and a river-facing terrace.", pt: "Fachada em granito e azulejo azul, quatro pisos e terraço virado ao rio." },
    description: {
      en: "A narrow, four-storey townhouse with its original azulejo façade, renovated inside with a contemporary kitchen, exposed granite walls and a top-floor terrace looking towards the Douro. Suitable as a family home or a base with room for guests.",
      pt: "Moradia estreita de quatro pisos, com a fachada original em azulejo, renovada no interior com cozinha contemporânea, paredes de granito à vista e terraço no último piso com vista para o Douro. Adequada como casa de família ou com espaço para receber.",
    },
    neighbourhood: {
      en: "Ribeira is Porto's historic riverside, with steep cobbled lanes, cafés and easy access to the Dom Luís I bridge and Vila Nova de Gaia.",
      pt: "A Ribeira é a zona ribeirinha histórica do Porto, com ruas íngremes em calçada, cafés e acesso fácil à ponte D. Luís I e a Vila Nova de Gaia.",
    },
  },
  {
    id: "cascais-villa",
    ref: "NH-CS-0031",
    title: { en: "Contemporary villa with pool and garden", pt: "Moradia contemporânea com piscina e jardim" },
    region: "cascais",
    area: "Quinta da Marinha",
    type: "villa",
    price: 2350000,
    beds: 5,
    baths: 5,
    size: 410,
    features: ["pool", "garden", "garage", "terrace"],
    images: [cascais, interior, lisbon],
    summary: { en: "Light-filled family villa among umbrella pines, minutes from the coast.", pt: "Moradia familiar luminosa entre pinheiros-mansos, a minutos da costa." },
    description: {
      en: "A two-storey contemporary villa set in a mature garden with umbrella pines. Large sliding windows connect the living spaces to a stone terrace and heated pool. Five en-suite bedrooms, a home office and a double garage.",
      pt: "Moradia contemporânea de dois pisos, num jardim maduro com pinheiros-mansos. Grandes janelas de correr ligam as zonas sociais a um terraço em pedra e piscina aquecida. Cinco suítes, escritório e garagem para dois carros.",
    },
    neighbourhood: {
      en: "Quinta da Marinha is a calm residential area between Cascais and the Guincho coast, with international schools and golf nearby and Lisbon around 35 minutes by car.",
      pt: "A Quinta da Marinha é uma zona residencial tranquila entre Cascais e o Guincho, com escolas internacionais e golfe nas proximidades e Lisboa a cerca de 35 minutos de carro.",
    },
  },
  {
    id: "lagos-villa",
    ref: "NH-AL-0214",
    title: { en: "Sea-view villa above the cliffs", pt: "Moradia com vista mar sobre as falésias" },
    region: "algarve",
    area: "Lagos",
    type: "villa",
    price: 1480000,
    beds: 4,
    baths: 4,
    size: 290,
    features: ["pool", "seaView", "garden", "terrace"],
    images: [algarve, tavira, interior],
    summary: { en: "Whitewashed villa with terracotta roofs, bougainvillea and Atlantic views.", pt: "Moradia caiada com telhados de barro, buganvílias e vista para o Atlântico." },
    description: {
      en: "A traditional Algarve villa with arched porches, terracotta roofs and a pool terrace facing the sea. Four bedrooms, a vaulted living room with fireplace and landscaped gardens on a plot of around 1,800 m².",
      pt: "Moradia algarvia tradicional com alpendres em arco, telhados de barro e terraço com piscina virado ao mar. Quatro quartos, sala abobadada com lareira e jardins num terreno com cerca de 1800 m².",
    },
    neighbourhood: {
      en: "Just outside Lagos, close to Ponta da Piedade and the town's marina, with Faro airport about an hour away.",
      pt: "Nos arredores de Lagos, perto da Ponta da Piedade e da marina, a cerca de uma hora do aeroporto de Faro.",
    },
  },
  {
    id: "tavira-townhouse",
    ref: "NH-AL-0198",
    title: { en: "Townhouse with rooftop terrace", pt: "Moradia com terraço na cobertura" },
    region: "algarve",
    area: "Tavira",
    type: "townhouse",
    price: 465000,
    beds: 3,
    baths: 2,
    size: 135,
    features: ["terrace", "renovated"],
    images: [tavira, interior, algarve],
    summary: { en: "A quiet, renovated home in the old town with views over rooftops to the salt pans.", pt: "Casa renovada e tranquila no centro histórico, com vista sobre os telhados até às salinas." },
    description: {
      en: "A renovated townhouse on a quiet street in Tavira's historic centre. Terracotta floors, a light kitchen-living area and a rooftop terrace with views over the town towards the Ria Formosa.",
      pt: "Moradia renovada numa rua tranquila do centro histórico de Tavira. Pavimento em tijoleira, cozinha e sala luminosas e terraço na cobertura com vista sobre a cidade até à Ria Formosa.",
    },
    neighbourhood: {
      en: "Tavira is a calm eastern Algarve town on the Gilão river, with a ferry to Ilha de Tavira's beaches and a year-round local community.",
      pt: "Tavira é uma cidade tranquila do sotavento algarvio, junto ao rio Gilão, com ligação de barco às praias da Ilha de Tavira e uma comunidade local ativa todo o ano.",
    },
  },
  {
    id: "foz-apartment",
    ref: "NH-OP-0119",
    title: { en: "Ocean-facing apartment in Foz", pt: "Apartamento virado ao mar na Foz" },
    region: "porto",
    area: "Foz do Douro",
    type: "apartment",
    price: 720000,
    beds: 2,
    baths: 2,
    size: 118,
    features: ["seaView", "lift", "garage", "balcony"],
    images: [foz, interior, porto],
    summary: { en: "Open-plan living with oak joinery and full-width windows to the Atlantic.", pt: "Zona social em open space, carpintaria em carvalho e janelas a toda a largura para o Atlântico." },
    description: {
      en: "A two-bedroom apartment in a modern building with lift and parking. The open-plan kitchen and living room opens to a balcony facing the sea. Both bedrooms are en-suite.",
      pt: "Apartamento T2 num edifício moderno com elevador e estacionamento. A cozinha e a sala em open space abrem para uma varanda virada ao mar. Ambos os quartos são suítes.",
    },
    neighbourhood: {
      en: "Foz do Douro is where the river meets the ocean — a residential area with a seafront promenade, restaurants and good schools.",
      pt: "A Foz do Douro é onde o rio encontra o mar — uma zona residencial com passeio marítimo, restaurantes e boas escolas.",
    },
  },
  {
    id: "estoril-apartment",
    ref: "NH-CS-0054",
    title: { en: "Calm apartment near Estoril", pt: "Apartamento tranquilo perto do Estoril" },
    region: "cascais",
    area: "Monte Estoril",
    type: "apartment",
    price: 585000,
    beds: 2,
    baths: 2,
    size: 96,
    features: ["balcony", "garden", "lift"],
    images: [interior, cascais, foz],
    summary: { en: "Sunny two-bedroom flat in a small condominium with shared gardens.", pt: "T2 soalheiro num pequeno condomínio com jardins comuns." },
    description: {
      en: "A bright two-bedroom apartment in a small, well-kept condominium with shared gardens. Wooden shutters, terracotta floors and a balcony with afternoon sun. A short walk to the train line to Lisbon.",
      pt: "Apartamento T2 luminoso num pequeno condomínio bem cuidado, com jardins comuns. Portadas de madeira, pavimento em tijoleira e varanda com sol à tarde. A poucos minutos a pé do comboio para Lisboa.",
    },
    neighbourhood: {
      en: "Monte Estoril sits between Cascais and Estoril, with beaches, a seafront promenade and direct trains to Cais do Sodré.",
      pt: "O Monte Estoril fica entre Cascais e o Estoril, com praias, paredão e comboio direto para o Cais do Sodré.",
    },
  },
];

export const getProperty = (id: string) => properties.find((p) => p.id === id);
