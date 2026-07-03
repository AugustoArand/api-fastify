import mongoose from 'mongoose';

const engineTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const EngineType = mongoose.model('EngineType', engineTypeSchema);

// Dados padrão para seed
const DEFAULT_ENGINE_TYPES = [
  { name: 'Twin Cam 88', description: 'Motor V-Twin de 88 polegadas cúbicas (1450cc), produzido de 1999 a 2006' },
  { name: 'Twin Cam 96', description: 'Motor V-Twin de 96 polegadas cúbicas (1584cc), produzido de 2007 a 2016' },
  { name: 'Twin Cam 103', description: 'Motor V-Twin de 103 polegadas cúbicas (1690cc), produzido de 2010 a 2016' },
  { name: 'Sportster Evolution', description: 'Motor Evolution para linha Sportster, 883cc e 1200cc' },
  { name: 'V-Rod Revolution', description: 'Motor Revolution de 60 graus refrigerado a líquido, 1250cc' },
  { name: 'Milwaukee-Eight 107', description: 'Motor Milwaukee-Eight de 107 polegadas cúbicas (1746cc), lançado em 2017' },
  { name: 'Milwaukee-Eight 114', description: 'Motor Milwaukee-Eight de 114 polegadas cúbicas (1868cc), lançado em 2017' },
  { name: 'Milwaukee-Eight 117', description: 'Motor Milwaukee-Eight de 117 polegadas cúbicas (1923cc), versão de alta performance' },
  { name: 'Revolution Max 1250', description: 'Motor Revolution Max de 1250cc, 60 graus refrigerado a líquido' },
  { name: 'Revolution Max 1250T', description: 'Motor Revolution Max 1250 turboalimentado para Pan America' },
  { name: 'Street 500/750', description: 'Motor Revolution X para Street 500 (494cc) e Street 750 (749cc)' },
  { name: "Screamin' Eagle", description: "Motores de alta performance da divisão Screamin' Eagle" },
];

export async function seedEngineTypes() {
  for (const engineType of DEFAULT_ENGINE_TYPES) {
    await EngineType.findOneAndUpdate(
      { name: engineType.name },
      { $setOnInsert: engineType },
      { upsert: true, new: false }
    );
  }
  console.log('✅ Tipos de motor verificados/inseridos');
}
