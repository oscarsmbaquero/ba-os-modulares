import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('./src/environments', { recursive: true });

const config = `export const environment = {
  production: PROD,
  geminiApiKey: '${process.env.GEMINI_API_KEY || ''}',
  otraVariable: '${process.env.OTRA_VARIABLE || ''}',
  urlApi: '${process.env.URL_API || ''}'
};
`;

writeFileSync('./src/environments/environment.prod.ts', config.replace('PROD', 'true'));
writeFileSync('./src/environments/environment.ts', config.replace('PROD', 'false'));

console.log('✅ Environment files created');