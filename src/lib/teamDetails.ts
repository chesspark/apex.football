export interface TeamDetail {
  stadium?: string;
  city?: string;
  founded?: number;
  website?: string;
  wikipedia?: string;
  description?: string;
}

export const teamDetails: Record<string, TeamDetail> = {
  "Raja CA": {
    stadium: "Stade Mohammed V",
    city: "Casablanca",
    founded: 1949,
    website: "https://www.rajacasablanca.com",
    wikipedia: "https://en.wikipedia.org/wiki/Raja_CA",
    description: "Raja Club Athletic, l'un des plus grands clubs d'Afrique. 3 fois vainqueur de la Ligue des champions CAF, 12 titres de Botola Pro.",
  },
  "Wydad AC": {
    stadium: "Stade Mohammed V",
    city: "Casablanca",
    founded: 1937,
    website: "https://www.wac.ma",
    wikipedia: "https://en.wikipedia.org/wiki/Wydad_AC",
    description: "Wydad Athletic Club, rival historique du Raja. 3 Ligue des champions CAF, 22 titres de Botola Pro.",
  },
  "AS FAR": {
    stadium: "Stade Prince Moulay Abdellah",
    city: "Rabat",
    founded: 1958,
    wikipedia: "https://en.wikipedia.org/wiki/AS_FAR_(football_club)",
    description: "Association Sportive des Forces Armées Royales. Club de l'armée, multiple champion du Maroc et d'Afrique.",
  },
  "RS Berkane": {
    stadium: "Stade Municipal de Berkane",
    city: "Berkane",
    founded: 1938,
    wikipedia: "https://en.wikipedia.org/wiki/RS_Berkane",
    description: "Renaissance Sportive de Berkane. Champion Botola Pro 2024-25, 2 fois vainqueur de la Coupe de la Confédération CAF.",
  },
  "FUS Rabat": {
    stadium: "Stade Moulay Hassan",
    city: "Rabat",
    founded: 1946,
    wikipedia: "https://en.wikipedia.org/wiki/FUS_Rabat",
    description: "Fath Union Sport de Rabat. Club historique de la capitale.",
  },
  "Olympic Safi": {
    stadium: "Stade El Massira",
    city: "Safi",
    founded: 1921,
    wikipedia: "https://en.wikipedia.org/wiki/Olympic_Safi",
    description: "Olympic Club de Safi. Vainqueur de la Coupe du Trône 2024-25.",
  },
  "IR Tanger": {
    stadium: "Stade Ibn Batouta",
    city: "Tanger",
    founded: 1919,
    wikipedia: "https://en.wikipedia.org/wiki/IR_Tanger",
    description: "Itthad Riadhi de Tanger. Un des plus anciens clubs du Maroc.",
  },
  "Maghreb de Fès": {
    stadium: "Stade de Fès",
    city: "Fès",
    founded: 1946,
    wikipedia: "https://en.wikipedia.org/wiki/Maghreb_de_F%C3%A8s",
    description: "Maghreb Association Sportive de Fès. Club emblématique de la ville impériale.",
  },
  "Hassania Agadir": {
    stadium: "Stade Adrar",
    city: "Agadir",
    founded: 1946,
    wikipedia: "https://en.wikipedia.org/wiki/Hassania_Agadir",
    description: "Hassania d'Agadir. Club du sud marocain.",
  },
  "Difaâ El Jadidi": {
    stadium: "Stade El Abdi",
    city: "El Jadida",
    founded: 1957,
    wikipedia: "https://en.wikipedia.org/wiki/Difa%C3%A2_El_Jadidi",
    description: "Difaâ Hassani d'El Jadida. Club de la côte atlantique.",
  },
  "COD Meknès": {
    stadium: "Stade d'Honneur",
    city: "Meknès",
    founded: 1943,
    wikipedia: "https://en.wikipedia.org/wiki/COD_Mekn%C3%A8s",
    description: "Club Olympique de Meknès. Promu en Botola Pro 2024-25.",
  },
  "Moghreb Tétouan": {
    stadium: "Saniat Rmel",
    city: "Tétouan",
    founded: 1922,
    wikipedia: "https://en.wikipedia.org/wiki/Moghreb_T%C3%A9touan",
    description: "Moghreb Athlétique de Tétouan. Club du nord du Maroc.",
  },
  "Union de Touarga": {
    stadium: "Stade Moulay Hassan",
    city: "Rabat",
    founded: 1958,
    wikipedia: "https://en.wikipedia.org/wiki/Union_de_Touarga",
    description: "Union Sportive de Touarga. Club de Rabat.",
  },
  "SCC Mohammédia": {
    stadium: "Stade El Bachir",
    city: "Mohammédia",
    founded: 1948,
    wikipedia: "https://en.wikipedia.org/wiki/Chabab_Mohamm%C3%A9dia",
    description: "Chabab Mohammédia. Club de la ville portuaire.",
  },
  "RCA Zemamra": {
    stadium: "Stade Ahmed Choukri",
    city: "Zemamra",
    wikipedia: "https://en.wikipedia.org/wiki/RCA_Zemamra",
    description: "Renaissance Club Athletic de Zemamra.",
  },
  "JS Soualem": {
    stadium: "Stade Municipal de Berrechid",
    city: "Soualem",
    wikipedia: "https://en.wikipedia.org/wiki/Jeunesse_Sportive_Soualem",
    description: "Jeunesse Sportive de Soualem.",
  },
};
