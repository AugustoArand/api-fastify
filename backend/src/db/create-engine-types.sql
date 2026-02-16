-- Criar tabela de tipos de motor
CREATE TABLE IF NOT EXISTS engine_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir os tipos de motor da Harley Davidson
INSERT INTO engine_types (name, description) VALUES
  ('Twin Cam 88', 'Motor V-Twin de 88 polegadas cúbicas (1450cc), produzido de 1999 a 2006'),
  ('Twin Cam 96', 'Motor V-Twin de 96 polegadas cúbicas (1584cc), produzido de 2007 a 2016'),
  ('Twin Cam 103', 'Motor V-Twin de 103 polegadas cúbicas (1690cc), produzido de 2010 a 2016'),
  ('Sportster Evolution', 'Motor Evolution para linha Sportster, 883cc e 1200cc'),
  ('V-Rod Revolution', 'Motor Revolution de 60 graus refrigerado a líquido, 1250cc'),
  ('Milwaukee-Eight 107', 'Motor Milwaukee-Eight de 107 polegadas cúbicas (1746cc), lançado em 2017'),
  ('Milwaukee-Eight 114', 'Motor Milwaukee-Eight de 114 polegadas cúbicas (1868cc), lançado em 2017'),
  ('Milwaukee-Eight 117', 'Motor Milwaukee-Eight de 117 polegadas cúbicas (1923cc), versão de alta performance'),
  ('Revolution Max 1250', 'Motor Revolution Max de 1250cc, 60 graus refrigerado a líquido'),
  ('Revolution Max 1250T', 'Motor Revolution Max 1250 turboalimentado para Pan America'),
  ('Street 500/750', 'Motor Revolution X para Street 500 (494cc) e Street 750 (749cc)'),
  ('Screamin'' Eagle', 'Motores de alta performance da divisão Screamin'' Eagle')
ON CONFLICT (name) DO NOTHING;

-- Adicionar coluna engine_type_id na tabela motorcycles (se não existir)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name='motorcycles' AND column_name='engine_type_id'
  ) THEN
    ALTER TABLE motorcycles ADD COLUMN engine_type_id INTEGER REFERENCES engine_types(id);
  END IF;
END $$;

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_motorcycles_engine_type ON motorcycles(engine_type_id);
