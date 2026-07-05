/**
 * seed-motorcycles-extra.js
 *
 * Complementa o seed-motorcycles.js original. A API Ninjas limita o
 * plano gratuito a 30 resultados por consulta (parâmetro `offset` só é
 * liberado no plano premium), então uma única busca por `make=Harley-Davidson`
 * sempre trava em 30 motos. Este script contorna o limite fazendo várias
 * buscas por `model=<termo>`, que retornam conjuntos diferentes de
 * resultados (cada busca tem seu próprio teto de 30), e filtra apenas
 * `make === "Harley-Davidson"`.
 *
 * Uso:
 *   API_NINJAS_KEY=sua_key node scripts/seed-motorcycles-extra.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import https from 'https';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URL || process.env.MONGODB_URI;
const API_KEY     = process.env.API_NINJAS_KEY;

if (!MONGODB_URI) {
  console.error('❌ Defina MONGO_URL ou MONGODB_URI no .env');
  process.exit(1);
}
if (!API_KEY) {
  console.error('❌ Defina API_NINJAS_KEY no .env ou como variável de ambiente');
  process.exit(1);
}

// ── Models (mesmo formato do seed original) ──────────────────────────────────

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

// ── Termos de busca ───────────────────────────────────────────────────────────
// Cada termo é uma consulta separada à API (cada uma com teto de ~30
// resultados), então buscar por famílias de modelo variadas é o jeito de
// acessar motos que não aparecem na busca genérica por `make`.

const SEARCH_TERMS = [
  'V-Rod',
  'Night Rod',
  'Dyna',
  'Low Rider',
  'Wide Glide',
  'Super Glide',
  'Softail Deluxe',
  'Softail Slim',
  'Fat Boy',
  'Sportster 883',
  'Sportster 1200',
  'XL 1200',
  'Forty-Eight',
  'Springer',
  'Night Train',
  'Electra Glide',
];

// ── Helpers (iguais ao seed original) ─────────────────────────────────────────

function guessEngineTypeName(bike) {
  const cc    = parseInt(bike.displacement) || 0;
  const model = (bike.model || '').toLowerCase();

  if (model.includes('pan america'))                                    return 'Revolution Max 1250T';
  if (model.includes('sportster s'))                                    return 'Revolution Max 1250';
  if (model.includes('street 750') || model.includes('street 500'))     return 'Street 500/750';
  if (model.includes('v-rod') || model.includes('vrod') || model.includes('vrsc') || model.includes('night rod')) return 'V-Rod Revolution';

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

function formatDisplacement(raw) {
  if (!raw) return undefined;
  const str = String(raw).trim();
  return str.endsWith('cc') ? str : `${str}cc`;
}

function fetchByModel(model) {
  return new Promise((resolve, reject) => {
    const url     = `https://api.api-ninjas.com/v1/motorcycles?model=${encodeURIComponent(model)}`;
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

  const engineTypes   = await EngineType.find();
  const engineTypeMap = Object.fromEntries(engineTypes.map(et => [et.name, et._id]));
  console.log(`🔧 ${engineTypes.length} tipos de motor encontrados no banco`);

  let totalImported = 0;
  let totalSkipped  = 0;

  for (const term of SEARCH_TERMS) {
    console.log(`\n🌐 Buscando "${term}"...`);

    let bikes;
    try {
      bikes = await fetchByModel(term);
    } catch (e) {
      console.log(`   ⚠️  Falha na busca: ${e.message}`);
      continue;
    }

    if (!Array.isArray(bikes)) {
      console.log(`   ⚠️  Resposta inesperada: ${JSON.stringify(bikes)}`);
      await sleep(1200);
      continue;
    }

    for (const bike of bikes) {
      if (bike.make !== 'Harley-Davidson') {
        totalSkipped++;
        continue;
      }

      const model = bike.model?.trim();
      const year  = parseInt(bike.year);

      if (!model || !year || year < 1903) {
        totalSkipped++;
        continue;
      }

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
        category:     bike.type      || undefined,
        image:        undefined,
        price:        0,
        description:  bike.bore_stroke
          ? `Diâmetro x curso: ${bike.bore_stroke}`
          : undefined,
        engineType: engineTypeId || undefined,
      });

      totalImported++;
      process.stdout.write(`\r   ✅ Importadas: ${totalImported} | ⏭️  Ignoradas: ${totalSkipped}`);
    }

    // Rate limit: 1.2s entre buscas
    await sleep(1200);
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
