export interface Product {
  id: string;
  name: string;
  category: "Keripik" | "Dodol & Buah" | "Olahan Ikan" | "Kuliner Lokal";
  price: number;
  weight: string;
  image: string;
  badge?: string;
  description: string;
  ingredients: string;
  isPopular?: boolean;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: "sn-01",
    name: "Keripik Tempe Mocaf Original",
    category: "Keripik",
    price: 15000,
    weight: "200 gram",
    badge: "Best Seller",
    isPopular: true,
    image:
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?q=80&w=800&auto=format&fit=crop",
    description:
      "Keripik tempe renyah istimewa menggunakan tepung mocaf (singkong) pilihan khas Banjarnegara. Diproses dengan bumbu rempah alami tanpa pengawet.",
    ingredients:
      "Kedelai pilihan, Tepung Mocaf, Bawang Putih, Ketumbar, Garam, Minyak Nabati",
  },
  {
    id: "sn-02",
    name: "Abon Ikan Patin / Gurame Suka Nicky",
    category: "Olahan Ikan",
    price: 25000,
    weight: "150 gram",
    badge: "Tersedia di Indomaret",
    isPopular: true,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop",
    description:
      "Abon ikan kaya protein dengan tekstur lembut dan gurih alami. Cocok untuk lauk bekal praktis dan teman makan nasi hangat.",
    ingredients:
      "Daging Ikan Segar, Bawang Merah, Bawang Putih, Gula Aren, Rempah Tradisional",
  },
  {
    id: "sn-03",
    name: "Manisan Carica Dieng Segar",
    category: "Dodol & Buah",
    price: 22000,
    weight: "4 pcs @ 120ml",
    badge: "Khas Banjarnegara",
    isPopular: true,
    image:
      "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=800&auto=format&fit=crop",
    description:
      "Buah Carica segar pilihan dari dataran tinggi Dieng dipadukan dengan sirup gula murni. Disajikan dingin lebih nikmat.",
    ingredients: "Buah Carica Pilihan, Air, Gula Pasir Murni",
  },
  {
    id: "sn-04",
    name: "Keripik Pare Renyah Non-Pahit",
    category: "Keripik",
    price: 14000,
    weight: "180 gram",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=800&auto=format&fit=crop",
    description:
      "Inovasi keripik pare dengan teknik pengolahan khusus sehingga menghilangkan rasa pahit namun tetap mempertahankan kegurihannya.",
    ingredients: "Pare Segar, Tepung Mocaf, Rempah Alami, Minyak Kelapa",
  },
  {
    id: "sn-05",
    name: "Dodol Buah & Kopi Banjarnegara",
    category: "Dodol & Buah",
    price: 18000,
    weight: "250 gram",
    image:
      "https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=800&auto=format&fit=crop",
    description:
      "Dodol lezat bertekstur kenyal dengan perpaduan rasa buah manis dan aroma kopi lokal khas Banjarnegara.",
    ingredients: "Tepung Ketan, Santan Kelapa, Gula Kelapa, Ekstrak Kopi/Buah",
  },
  {
    id: "sn-06",
    name: "Paket Sambal & Pepes Ikan Asap Gubug Suka Nicky",
    category: "Kuliner Lokal",
    price: 35000,
    weight: "1 Porsi Siap Saji",
    badge: "Spesial Gubug",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    description:
      "Menu kuliner khas Warung Gubug Suka Nicky Gumiwang. Ikan asap bumbu pepes gurih siap santap bersama sambal terasi khas.",
    ingredients: "Ikan Segar Asap, Bumbu Pepes Jawa, Daun Kemangi, Cabai Rawit",
  },
];
