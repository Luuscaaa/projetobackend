// Conecta com o Banco de Dados - Postgresql (Railway)

import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = 'postgresql://postgres:YiiDTNNTPHiBrEqbcQmDSOSYVGAHnXyM@autorack.proxy.rlwy.net:18891/railway';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, 
  }
});

export default pool;