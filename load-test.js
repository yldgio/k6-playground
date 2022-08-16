/*

Load Test assesses the performance of the system in terms of concurrent users or requests per second.
the purpose of a Load test is to verify if the system meets some preset performance goal

Answers to the following:
- how a system behaves under typical and peek load of traffic
- if and how the system recovers after the spike, without manual intervention



*/
import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
      {duration: '5m', target: 100}, // upto -> 100 vus: ramp up of users over 5 minutes
      {duration: '10m', target: 100}, // keep load for 10 minutes
      {duration: '10s', target: 0},   // scale down. recovery stage
  ],
  thresholds:{
    http_req_duration:['p(99)<150'], //99% of reqs must complete under 150ms
  }
};
const url = 'https://localhost:7063/weatherforecast';
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
    http.get(url, params);
    sleep(1);
}