/*

Spike Test a particular type of stress test, where we want to measure the behavior of our system under sudden spikes of load.
The test will spike to extreme load over short period of time.
Answers to the following:
- how a system behaves under sudden surge of traffic
- if and how the system recovers after the spike, without manual intervention

How to measure success:
- Excellent: performance is not degraded during the surge of traffic, response time is similar.
- Good: response time is slower, but the system does not generate errors: all requests are handled.
- Poor: system produces errors but recovers to normal after the traffic subsides
- Bad: system crashes and does not recover after the traffic subsides

*/

import http from 'k6/http';
import { check, sleep } from 'k6';
export const options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages:[
        {duration: '10s', target: 100}, // upto -> 100 vus, below normal load
        {duration: '3m', target: 100}, // warmup
        {duration: '10s', target: 1400}, // upto -> 1400 vus, spike load
        {duration: '3m', target: 1400},
        {duration: '10s', target: 100}, // scale down. recovery stage
        {duration: '3m', target: 100},
        {duration: '10s', target: 0},   // scale down. recovery stage
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