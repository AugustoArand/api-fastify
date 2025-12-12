// Catálogo de Motos Harley-Davidson organizadas por tipo de motor (2000-2024)

const motorcycleCatalog = {
  'Twin Cam 88': [
    {
      model: 'Fat Boy',
      year: 2000,
      engine: 'Twin Cam 88',
      displacement: '1450cc',
      power: '67 cv',
      torque: '115 Nm',
      price: 45000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980645-3f4e6e0e6e5a?w=400',
      description: 'Ícone dos anos 2000 com rodas sólidas características'
    },
    {
      model: 'Road King Classic',
      year: 2001,
      engine: 'Twin Cam 88',
      displacement: '1450cc',
      power: '67 cv',
      torque: '115 Nm',
      price: 48000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980645-4f4e6e0e6e5b?w=400',
      description: 'Touring clássico com estilo retrô e conforto'
    },
    {
      model: 'Heritage Softail Classic',
      year: 2002,
      engine: 'Twin Cam 88B',
      displacement: '1450cc',
      power: '67 cv',
      torque: '115 Nm',
      price: 46000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980645-5f4e6e0e6e5c?w=400',
      description: 'Softail clássico com visual vintage'
    },
    {
      model: 'Dyna Super Glide',
      year: 2003,
      engine: 'Twin Cam 88',
      displacement: '1450cc',
      power: '67 cv',
      torque: '115 Nm',
      price: 42000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980645-6f4e6e0e6e5d?w=400',
      description: 'Dyna ágil com motor potente'
    }
  ],

  'Twin Cam 96': [
    {
      model: 'Street Glide',
      year: 2006,
      engine: 'Twin Cam 96',
      displacement: '1584cc',
      power: '78 cv',
      torque: '125 Nm',
      price: 62000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980646-1f4e6e0e6e5e?w=400',
      description: 'Touring moderno com mais cilindrada'
    },
    {
      model: 'Fat Bob',
      year: 2008,
      engine: 'Twin Cam 96',
      displacement: '1584cc',
      power: '78 cv',
      torque: '125 Nm',
      price: 58000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980646-2f4e6e0e6e5f?w=400',
      description: 'Dyna agressivo com farol duplo'
    },
    {
      model: 'Road King',
      year: 2009,
      engine: 'Twin Cam 96',
      displacement: '1584cc',
      power: '78 cv',
      torque: '125 Nm',
      price: 65000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980646-3f4e6e0e6e60?w=400',
      description: 'Touring versátil da era Twin Cam'
    },
    {
      model: 'Softail Deluxe',
      year: 2010,
      engine: 'Twin Cam 96B',
      displacement: '1584cc',
      power: '78 cv',
      torque: '125 Nm',
      price: 60000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980646-4f4e6e0e6e61?w=400',
      description: 'Softail elegante com acabamento deluxe'
    }
  ],

  'Twin Cam 103': [
    {
      model: 'Ultra Limited',
      year: 2012,
      engine: 'Twin Cam 103',
      displacement: '1690cc',
      power: '85 cv',
      torque: '138 Nm',
      price: 78000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980647-1f4e6e0e6e62?w=400',
      description: 'Touring topo de linha com motor 103'
    },
    {
      model: 'Heritage Softail Classic',
      year: 2013,
      engine: 'Twin Cam 103B',
      displacement: '1690cc',
      power: '85 cv',
      torque: '138 Nm',
      price: 68000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980647-2f4e6e0e6e63?w=400',
      description: 'Heritage com motor mais potente'
    },
    {
      model: 'Street Glide Special',
      year: 2015,
      engine: 'Twin Cam 103',
      displacement: '1690cc',
      power: '85 cv',
      torque: '138 Nm',
      price: 82000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980647-3f4e6e0e6e64?w=400',
      description: 'Street Glide com acabamento especial'
    },
    {
      model: 'Road Glide Ultra',
      year: 2016,
      engine: 'Twin Cam 103',
      displacement: '1690cc',
      power: '85 cv',
      torque: '138 Nm',
      price: 85000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980647-4f4e6e0e6e65?w=400',
      description: 'Road Glide com carenagem montada no quadro'
    }
  ],

  'Sportster Evolution': [
    {
      model: 'Sportster 883',
      year: 2000,
      engine: 'Evolution 883',
      displacement: '883cc',
      power: '52 cv',
      torque: '69 Nm',
      price: 28000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980648-1f4e6e0e6e66?w=400',
      description: 'Sportster clássico de entrada'
    },
    {
      model: 'Sportster 1200 Custom',
      year: 2004,
      engine: 'Evolution 1200',
      displacement: '1202cc',
      power: '67 cv',
      torque: '96 Nm',
      price: 35000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980648-2f4e6e0e6e67?w=400',
      description: 'Sportster 1200 personalizado'
    },
    {
      model: 'Iron 883',
      year: 2009,
      engine: 'Evolution 883',
      displacement: '883cc',
      power: '52 cv',
      torque: '69 Nm',
      price: 32000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980648-3f4e6e0e6e68?w=400',
      description: 'Sportster com estilo dark e minimalista'
    },
    {
      model: 'Forty-Eight',
      year: 2010,
      engine: 'Evolution 1200',
      displacement: '1202cc',
      power: '67 cv',
      torque: '96 Nm',
      price: 38000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980648-4f4e6e0e6e69?w=400',
      description: 'Sportster com tanque peanut e visual retrô'
    },
    {
      model: 'Roadster 1200',
      year: 2016,
      engine: 'Evolution 1200',
      displacement: '1202cc',
      power: '67 cv',
      torque: '96 Nm',
      price: 42000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980648-5f4e6e0e6e70?w=400',
      description: 'Sportster esportivo com suspensão aprimorada'
    }
  ],

  'V-Rod Revolution': [
    {
      model: 'V-Rod',
      year: 2002,
      engine: 'Revolution V-Twin',
      displacement: '1130cc',
      power: '115 cv',
      torque: '110 Nm',
      price: 55000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980649-1f4e6e0e6e71?w=400',
      description: 'Primeira Harley com motor refrigerado a líquido'
    },
    {
      model: 'Night Rod Special',
      year: 2007,
      engine: 'Revolution V-Twin',
      displacement: '1250cc',
      power: '125 cv',
      torque: '115 Nm',
      price: 62000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980649-2f4e6e0e6e72?w=400',
      description: 'V-Rod em versão dark e agressiva'
    },
    {
      model: 'V-Rod Muscle',
      year: 2009,
      engine: 'Revolution V-Twin',
      displacement: '1250cc',
      power: '125 cv',
      torque: '115 Nm',
      price: 65000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980649-3f4e6e0e6e73?w=400',
      description: 'V-Rod musculoso com pneu traseiro largo'
    }
  ],

  'Milwaukee-Eight 107': [
    {
      model: 'Street Glide',
      year: 2024,
      engine: 'Milwaukee-Eight 107',
      displacement: '1746cc',
      power: '92 cv',
      torque: '145 Nm',
      price: 135000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980664-1db506751c6c?w=400',
      description: 'Touring clássico com fairing batwing icônico e tecnologia moderna'
    },
    {
      model: 'Road King',
      year: 2024,
      engine: 'Milwaukee-Eight 107',
      displacement: '1746cc',
      power: '92 cv',
      torque: '145 Nm',
      price: 132000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980663-1db506751c6d?w=400',
      description: 'Touring versátil com estilo clássico e conforto excepcional'
    },
    {
      model: 'Softail Standard',
      year: 2024,
      engine: 'Milwaukee-Eight 107',
      displacement: '1746cc',
      power: '92 cv',
      torque: '145 Nm',
      price: 98000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980664-2db506751c6e?w=400',
      description: 'Cruiser minimalista com suspensão traseira oculta'
    },
    {
      model: 'Heritage Classic',
      year: 2024,
      engine: 'Milwaukee-Eight 107',
      displacement: '1746cc',
      power: '92 cv',
      torque: '145 Nm',
      price: 115000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980664-3db506751c6f?w=400',
      description: 'Cruiser vintage com design nostálgico e bolsas de couro'
    }
  ],

  'Milwaukee-Eight 114': [
    {
      model: 'Road Glide Limited',
      year: 2024,
      engine: 'Milwaukee-Eight 114',
      displacement: '1868cc',
      power: '101 cv',
      torque: '163 Nm',
      price: 155000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980665-1db506751c70?w=400',
      description: 'Touring premium com fairing montado no quadro e tecnologia avançada'
    },
    {
      model: 'Ultra Limited',
      year: 2024,
      engine: 'Milwaukee-Eight 114',
      displacement: '1868cc',
      power: '101 cv',
      torque: '163 Nm',
      price: 165000,
      category: 'Touring',
      image: 'https://images.unsplash.com/photo-1558980665-2db506751c71?w=400',
      description: 'Touring topo de linha com máximo conforto e recursos'
    },
    {
      model: 'Fat Boy 114',
      year: 2024,
      engine: 'Milwaukee-Eight 114',
      displacement: '1868cc',
      power: '101 cv',
      torque: '163 Nm',
      price: 125000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980665-3db506751c72?w=400',
      description: 'Ícone musculoso com rodas sólidas e presença imponente'
    },
    {
      model: 'Low Rider S',
      year: 2024,
      engine: 'Milwaukee-Eight 114',
      displacement: '1868cc',
      power: '101 cv',
      torque: '163 Nm',
      price: 118000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980665-4db506751c73?w=400',
      description: 'Cruiser agressivo com posição de pilotagem esportiva'
    }
  ],

  'Milwaukee-Eight 117': [
    {
      model: 'CVO Road Glide',
      year: 2024,
      engine: 'Milwaukee-Eight 117',
      displacement: '1923cc',
      power: '108 cv',
      torque: '172 Nm',
      price: 235000,
      category: 'CVO',
      image: 'https://images.unsplash.com/photo-1558980666-1db506751c74?w=400',
      description: 'Custom Vehicle Operations - touring premium personalizado'
    },
    {
      model: 'CVO Street Glide',
      year: 2024,
      engine: 'Milwaukee-Eight 117',
      displacement: '1923cc',
      power: '108 cv',
      torque: '172 Nm',
      price: 240000,
      category: 'CVO',
      image: 'https://images.unsplash.com/photo-1558980666-2db506751c75?w=400',
      description: 'Touring CVO com acabamento exclusivo e potência máxima'
    },
    {
      model: 'CVO Road King',
      year: 2024,
      engine: 'Milwaukee-Eight 117',
      displacement: '1923cc',
      power: '108 cv',
      torque: '172 Nm',
      price: 238000,
      category: 'CVO',
      image: 'https://images.unsplash.com/photo-1558980666-3db506751c76?w=400',
      description: 'Road King personalizado com máximo luxo e performance'
    }
  ],

  'Revolution Max 1250': [
    {
      model: 'Pan America 1250',
      year: 2024,
      engine: 'Revolution Max 1250',
      displacement: '1252cc',
      power: '150 cv',
      torque: '128 Nm',
      price: 98000,
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1558980667-1db506751c77?w=400',
      description: 'Adventure touring com tecnologia de ponta e versatilidade'
    },
    {
      model: 'Pan America 1250 Special',
      year: 2024,
      engine: 'Revolution Max 1250',
      displacement: '1252cc',
      power: '150 cv',
      torque: '128 Nm',
      price: 115000,
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1558980667-2db506751c78?w=400',
      description: 'Pan America premium com suspensão semiativa e recursos avançados'
    },
    {
      model: 'Sportster S',
      year: 2024,
      engine: 'Revolution Max 1250',
      displacement: '1252cc',
      power: '121 cv',
      torque: '125 Nm',
      price: 92000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980667-3db506751c79?w=400',
      description: 'Cruiser esportivo moderno com design futurista'
    }
  ],

  'Revolution Max 1250T': [
    {
      model: 'Nightster',
      year: 2024,
      engine: 'Revolution Max 1250T',
      displacement: '975cc',
      power: '90 cv',
      torque: '95 Nm',
      price: 78000,
      category: 'Sport',
      image: 'https://images.unsplash.com/photo-1558980668-1db506751c80?w=400',
      description: 'Sportster acessível com motor Revolution Max e estilo agressivo'
    }
  ],

  'Street 500/750': [
    {
      model: 'Street 500',
      year: 2015,
      engine: 'Revolution X 500',
      displacement: '494cc',
      power: '34 cv',
      torque: '40 Nm',
      price: 30000,
      category: 'Urban',
      image: 'https://images.unsplash.com/photo-1558980668-2db506751c81?w=400',
      description: 'Primeira Harley de pequena cilindrada desde os anos 70'
    },
    {
      model: 'Street 750',
      year: 2015,
      engine: 'Revolution X 750',
      displacement: '749cc',
      power: '53 cv',
      torque: '59 Nm',
      price: 38000,
      category: 'Urban',
      image: 'https://images.unsplash.com/photo-1558980668-3db506751c82?w=400',
      description: 'Harley urbana ágil e acessível'
    },
    {
      model: 'Street Rod 750',
      year: 2017,
      engine: 'Revolution X 750',
      displacement: '749cc',
      power: '68 cv',
      torque: '65 Nm',
      price: 42000,
      category: 'Urban',
      image: 'https://images.unsplash.com/photo-1558980668-4db506751c83?w=400',
      description: 'Street 750 esportiva com mais potência'
    },
    {
      model: 'Street 500',
      year: 2023,
      engine: 'Revolution X 500',
      displacement: '494cc',
      power: '34 cv',
      torque: '40 Nm',
      price: 38000,
      category: 'Urban',
      image: 'https://images.unsplash.com/photo-1558980668-2db506751c81?w=400',
      description: 'Moto urbana ágil ideal para iniciantes'
    },
    {
      model: 'Street 750',
      year: 2023,
      engine: 'Revolution X 750',
      displacement: '749cc',
      power: '53 cv',
      torque: '59 Nm',
      price: 45000,
      category: 'Urban',
      image: 'https://images.unsplash.com/photo-1558980668-3db506751c82?w=400',
      description: 'Harley urbana com mais potência e atitude'
    }
  ],

  'Screamin\' Eagle': [
    {
      model: 'Road Glide ST',
      year: 2024,
      engine: 'Milwaukee-Eight 117 (Performance Kit)',
      displacement: '1923cc',
      power: '115 cv',
      torque: '180 Nm',
      price: 145000,
      category: 'Sport Touring',
      image: 'https://images.unsplash.com/photo-1558980669-1db506751c83?w=400',
      description: 'Touring esportivo com performance elevada e manuseio ágil'
    },
    {
      model: 'Street Bob 114',
      year: 2024,
      engine: 'Milwaukee-Eight 114 (Stage IV)',
      displacement: '1868cc',
      power: '110 cv',
      torque: '170 Nm',
      price: 105000,
      category: 'Cruiser',
      image: 'https://images.unsplash.com/photo-1558980669-2db506751c84?w=400',
      description: 'Bobber minimalista com performance aprimorada'
    }
  ]
};

// Função para obter todas as categorias de motores
export function getEngineTypes() {
  return Object.keys(motorcycleCatalog).map(engine => ({
    name: engine,
    count: motorcycleCatalog[engine].length
  }));
}

// Função para obter motos por tipo de motor
export function getMotorcyclesByEngine(engineType) {
  if (!motorcycleCatalog[engineType]) {
    return null;
  }
  return {
    engine: engineType,
    count: motorcycleCatalog[engineType].length,
    motorcycles: motorcycleCatalog[engineType]
  };
}

// Função para obter todas as motos
export function getAllMotorcycles() {
  const all = [];
  for (const engine in motorcycleCatalog) {
    motorcycleCatalog[engine].forEach(moto => {
      all.push(moto);
    });
  }
  return all;
}

// Função para buscar motos por termo
export function searchMotorcycles(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  for (const engine in motorcycleCatalog) {
    const filtered = motorcycleCatalog[engine].filter(moto => 
      moto.model.toLowerCase().includes(lowerQuery) ||
      moto.engine.toLowerCase().includes(lowerQuery) ||
      moto.category.toLowerCase().includes(lowerQuery) ||
      moto.description.toLowerCase().includes(lowerQuery)
    );
    results.push(...filtered);
  }
  
  return results;
}

// Função para obter estatísticas do catálogo
export function getCatalogStats() {
  const stats = {
    totalEngineTypes: Object.keys(motorcycleCatalog).length,
    totalMotorcycles: 0,
    categories: {},
    priceRange: { min: Infinity, max: 0 }
  };

  for (const engine in motorcycleCatalog) {
    motorcycleCatalog[engine].forEach(moto => {
      stats.totalMotorcycles++;
      
      if (!stats.categories[moto.category]) {
        stats.categories[moto.category] = 0;
      }
      stats.categories[moto.category]++;
      
      if (moto.price < stats.priceRange.min) stats.priceRange.min = moto.price;
      if (moto.price > stats.priceRange.max) stats.priceRange.max = moto.price;
    });
  }

  return stats;
}
