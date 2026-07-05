/**
 * seed-motorcycle-images.js
 *
 * Preenche o campo `image` das motos já cadastradas no banco com fotos
 * reais (Wikimedia Commons, licença livre) para os modelos mais icônicos
 * do catálogo. Só atualiza documentos que ainda não têm imagem definida.
 *
 * Uso:
 *   node scripts/seed-motorcycle-images.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Defina MONGO_URL ou MONGODB_URI no .env');
  process.exit(1);
}

const Motorcycle = mongoose.models.Motorcycle
  || mongoose.model('Motorcycle', new mongoose.Schema({}, { strict: false }), 'motorcycles');

// Fotos de licença livre (Wikimedia Commons), mapeadas pelo campo `model`
// exatamente como é retornado pela API Ninjas / cadastrado no banco.
const IMAGES_BY_MODEL = {
  'Street Glide': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Harley_davidson_street_glide_103.jpg',
  'Road King': 'https://upload.wikimedia.org/wikipedia/commons/7/75/Harley-Davidson_Road_King.jpg',
  'Fat Boy 114': 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Harley_Davidson_FAT_BOY_114.jpg',
  'Heritage Classic': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/HD_Heritage_Softail_Classic_Motorcycle.jpg',
  'Iron 883': 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Harley-davidson-sportster-iron-883.jpg',
  'Fat Bob 114': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Harley_Davidson_Fat_Bob_114.jpg',
  'Road Glide': 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Harley-Davidson_Road_Glide_%28MSP15%29.JPG',
  'Softail Standard': 'https://upload.wikimedia.org/wikipedia/commons/2/2f/2008_Harley_Davidson_FXSTC_Softail_Custom.jpg',
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Conectado ao MongoDB\n');

  let totalUpdated = 0;

  for (const [model, image] of Object.entries(IMAGES_BY_MODEL)) {
    const result = await Motorcycle.updateMany(
      { model, $or: [{ image: { $exists: false } }, { image: null }, { image: '' }] },
      { $set: { image } }
    );
    console.log(`🖼️  ${model}: ${result.modifiedCount} atualizada(s)`);
    totalUpdated += result.modifiedCount;
  }

  console.log(`\n🏁 Concluído! ${totalUpdated} moto(s) atualizada(s) com foto.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('\n❌ Erro durante a atualização:', err.message);
  process.exit(1);
});
