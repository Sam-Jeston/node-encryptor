'use strict'

const encrypt = require('./encrypt')
const decrypt = require('./decrypt')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Would you like to encrypt (e) or decrypt (d) a file? \n', (answer) => {
  if (answer === 'e') {
    encrypt()
  } else {
    decrypt()
  }
})
