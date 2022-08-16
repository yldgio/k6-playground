
/*
k6 run --vus 1000 --iterations 10000 simple-test.js

This command would create 1000 concurrent sessions (virtual users), 
and would run this single requests 10 times for each virtual user, hence 10,000 iterations.

*/

import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    // vus: 1,
    // duration: '30s',
    insecureSkipTLSVerify: true,
    noConnectionReuse: false
};
const url = 'https://localhost:7063/weatherforecast';
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
    http.get(url, params);
}