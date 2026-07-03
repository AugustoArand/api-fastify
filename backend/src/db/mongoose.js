import mongoose from 'mongoose';

// MONGO_URL é injetado automaticamente pelo Railway MongoDB plugin
// MONGODB_URI é o fallback para desenvolvimento local
const MONGODB_URI = process.env.MONGO_URL || process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Variável de ambiente de conexão não definida.\n' +
    'Em produção (Railway): vincule o serviço MongoDB ao projeto.\n' +
    'Em desenvolvimento local: defina MONGODB_URI no arquivo backend/.env'
  );
}

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    throw error;
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB desconectado');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erro de conexão MongoDB:', err);
});

export default mongoose;
