import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  // Adicione mais etapas se desejar aumentar gradualmente a quantidade de usuários
  stages: [
    { duration: '5s', target: 1 },
  ],
};

export default function () {
  // Defina os cabeçalhos da solicitação
  const headers = {
    Accept: 'application/json; version=3',
    Authorization: 'Token tokenincorrect',
    'Content-Type': 'application/json',
  };

  // Envie a solicitação GET para a API com headers
  // const res = http.get('https://test-api.k6.io/public/crocodiles/', { headers });

   // Envie a solicitação GET para a API
  const res = http.get('https://test-api.k6.io/public/crocodiles/');

  // Use a função group() para agrupar as métricas por status de resposta
  group('Status Code', function () {
    // Verifique se a resposta possui o status de sucesso (200)
    check(res, {
      'Status 200': (r) => r.status === 200,
    });
  });
  // Aguarde por 1 segundo antes de fazer a próxima solicitação
  sleep(1);
}
// função que gerar o report em .html
export function handleSummary(data) {
  return {
    "index.html": htmlReport(data),
  };
}
