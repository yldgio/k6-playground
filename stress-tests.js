/*
Stress Test is used to determine the limits of the system.
the purpose of a stress test is to verify the stability and reliability of a system under stress.
During the test the number of requests/vus are gradually increased to reach and break the application limits.

Answers to the following:
- how a system behaves under extreme conditions
- what is the limit, the max capacity of the system (requests/s or users)
- determine the breaking point of a system and its failure behavior
- if and how the system recovers after the stress, without manual intervention

*/

import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
        {duration: '2m', target: 100}, // upto -> 100 vus, below normal load
        {duration: '5m', target: 100},
        {duration: '2m', target: 200}, // upto -> 200 vus, normal load
        {duration: '5m', target: 200},
        {duration: '2m', target: 300}, // upto -> 300 vus, near breaking point
        {duration: '5m', target: 300},
        {duration: '2m', target: 400}, // upto -> 400 vus, beyond breaking point
        {duration: '5m', target: 400},
        {duration: '2m', target: 0},   // scale down. recovery stage
    ]
};
const url = 'https://localhost:7063/weatherforecast';
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
    const res = http.get(url, params);
    sleep(1);
}