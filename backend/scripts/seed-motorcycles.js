/**
 * seed-motorcycles.js
 *
 * Script de seed que busca motos Harley-Davidson na API Ninjas
 * e popula o MongoDB com os dados reais.
 *
 * Uso:
 *   1. Crie uma conta gratuita em https://api-ninjas.com (100 req/dia)
 *   2. Copie sua API key
 *   3. Execute: API_NINJAS_KEY=sua_key node scripts/seed-motorcycles.js
 *
 * A API Ninjas retorna: make, model, year, type, displacement, engine,
 *                       power, torque, bore_stroke, compression, etc.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import https from 'https';

dotenv.config();

// ── Conexão ──────────────────────────────────────────────────────────────────

const MONGODB_URI = process.env.MONGO_URL || process.env.MONGODB_URI;
const API_KEY     = process.env.API_NINJAS_KEY;

if (!MONGODB_URI) {
  console.error('❌ Defina MONGO_URL ou MONGODB_URI no .env');
  process.exit(1);
}
if (!API_KEY) {
  console.error('❌ Defina API_NINJAS_KEY no .env ou como variável de ambiente');
  console.error('   Crie sua key gratuita em: https://api-ninjas.com');
  process.exit(1);
}

// ── Models ───────────────────────────────────────────────────────────────────

const engineTypeSchema = new mongoose.Schema({ name: String, description: String }, { timestamps: true });

const motorcycleSchema = new mongoose.Schema({
  model:        String,
  year:         Number,
  color:        String,
  engine:       String,
  displacement: String,
  power:        String,
  torque:       String,
  category:     String,
  image:        String,
  price:        Number,
  description:  String,
  engineType:   { type: mongoose.Schema.Types.ObjectId, ref: 'EngineType' },
}, { timestamps: true });

const EngineType = mongoose.models.EngineType || mongoose.model('EngineType', engineTypeSchema);
const Motorcycle = mongoose.models.Motorcycle  || mongoose.model('Motorcycle', motorcycleSchema);

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Mapeia a cilindrada/modelo para o EngineType do banco.
 */
function guessEngineTypeName(bike) {
  const cc    = parseInt(bike.displacement) || 0;
  const model = (bike.model || '').toLowerCase();

  if (model.includes('pan america'))                                    return 'Revolution Max 1250T';
  if (model.includes('sportster s'))                                    return 'Revolution Max 1250';
  if (model.includes('street 750') || model.includes('street 500'))     return 'Street 500/750';
  if (model.includes('v-rod') || model.includes('vrod') || model.includes('vrsc')) return 'V-Rod Revolution';

  if (cc >= 1900) return 'Milwaukee-Eight 117';
  if (cc >= 1850) return 'Milwaukee-Eight 114';
  if (cc >= 1700) return 'Milwaukee-Eight 107';
  if (cc >= 1650) return 'Twin Cam 103';
  if (cc >= 1550) return 'Twin Cam 96';
  if (cc >= 1400) return 'Twin Cam 88';
  if (cc >= 850)  return 'Sportster Evolution';
  if (cc > 0)     return 'Street 500/750';

  return null;
}

/** Formata cilindrada: "1200" → "1200cc" */
function formatDisplacement(raw) {
  if (!raw) return undefined;
  const str = String(raw).trim();
  return str.endsWith('cc') ? str : `${str}cc`;
}

/** Busca paginada na API Ninjas */
function fetchPage(offset = 0) {
  return new Promise((resolve, reject) => {
    const url     = `https://api.api-ninjas.com/v1/motorcycles?make=Harley-Davidson&offset=${offset}`;
    const options = { headers: { 'X-Api-Key': API_KEY } };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── Seed principal ────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Conectado ao MongoDB\n');

  // Mapear EngineTypes existentes
  const engineTypes   = await EngineType.find();
  const engineTypeMap = Object.fromEntries(engineTypes.map(et => [et.name, et._id]));
  console.log(`🔧 ${engineTypes.length} tipos de motor encontrados no banco`);

  let totalImported = 0;
  let totalSkipped  = 0;
  let offset        = 0;

  console.log('\n🌐 Buscando motos na API Ninjas...\n');

  while (true) {
    const bikes = await fetchPage(offset);

    if (!Array.isArray(bikes) || bikes.length === 0) {
      console.log('\n📄 Sem mais resultados.');
      break;
    }

    for (const bike of bikes) {
      const model = bike.model?.trim();
      const year  = parseInt(bike.year);

      if (!model || !year || year < 1903) {
        totalSkipped++;
        continue;
      }

      // Evitar duplicatas
      const exists = await Motorcycle.findOne({ model, year });
      if (exists) {
        totalSkipped++;
        continue;
      }

      const engineTypeName = guessEngineTypeName(bike);
      const engineTypeId   = engineTypeName ? engineTypeMap[engineTypeName] : null;

      await Motorcycle.create({
        model,
        year,
        color:        'A definir',
        engine:       bike.engine    || undefined,
        displacement: formatDisplacement(bike.displacement),
        power:        bike.power     || undefined,
        torque:       bike.torque    || undefined,
        category:     bike.type      || undefined,   // "Cruiser", "Touring", etc.
        image:        undefined,                      // Não disponível via API
        price:        0,
        description:  bike.bore_stroke
          ? `Diâmetro x curso: ${bike.bore_stroke}`
          : undefined,
        engineType: engineTypeId || undefined,
      });

      totalImported++;
      process.stdout.write(`\r   ✅ Importadas: ${totalImported} | ⏭️  Ignoradas: ${totalSkipped}`);
    }

    offset += bikes.length;

    // Rate limit: 1s entre páginas
    await sleep(1000);

    if (bikes.length < 30) break;
  }

  console.log(`\n\n🏁 Seed concluído!`);
  console.log(`   ✅ Importadas: ${totalImported}`);
  console.log(`   ⏭️  Ignoradas/duplicadas: ${totalSkipped}`);
  console.log(`\n💡 Campos 'color', 'price' e 'image' ficaram com valores padrão.`);
  console.log(`   Atualize-os pelo painel da aplicação conforme necessário.\n`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('\n❌ Erro durante o seed:', err.message);
  process.exit(1);
});
