const CircuitBreaker = require('opossum');
const express = require('express')
const axios = require('axios')

const app = express()

// simutate this is server from service providers
const requestFromServer = () => axios.get('https://jsonplaceholder.typicode.com/usersx').then((res) => res.data)
async function sendUser(req, res, next) {

  const breaker = new CircuitBreaker(requestFromServer, {
    timeout: 5000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
  })

  // all event exist in CircuitBreaker
  breaker.on('timeout', () => console.info('is timeout'))
  breaker.on('reject', () => console.info('is reject'))
  breaker.on('open', () => console.info('is open'))
  breaker.on('halfOpen', () => console.info('is halfOpen'))
  breaker.on('close', () => console.info('is closed'))
  breaker.on('fallback', () => console.info('is fallback'))
  breaker.on('success', () => console.info('is success'))
  breaker.on('failure', () => console.info('is failure'))

  // fail fast shutdown request if server from service providers is error
  breaker.fallback(() => Object.assign({}, { stat_code: 500, stat_msg: 'Internal Server Error' }))
  return breaker.fire('/').then((data) => res.status(200).json({ data }))
}

app.get('/', sendUser)
app.listen(3000, () => console.log('server is running'))
