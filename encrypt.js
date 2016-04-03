'use strict'

const crypto = require('crypto')
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

function readFile () {
  rl.question('What file would you like to encrypt? \n', (fileName) => {
    let input = fs.createReadStream(fileName)

    input.on('error', () => {
      console.log('\nThis file does not exist! Please try again \n')
      readFile()
    })

    input.on('readable', () => {
      encryptFile(input, fileName)
    })
  })
}

function encryptFile (input, fileName) {
  rl.question('\nWhat password would you like to use? \n', (password) => {
    let cipher = crypto.createCipher('aes256', password)

    let newName = fileName + '.enc'
    let output = fs.createWriteStream(newName)

    let stream = input.pipe(cipher).pipe(output)

    stream.on('finish', () => {
      console.log(`\nYour file ${newName} has been encrypted`)
      rl.close()
    })
  })
}

module.exports = function encryptor () {
  readFile()
}
