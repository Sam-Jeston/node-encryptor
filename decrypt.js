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
  rl.question('What file would you like to decrypt? \n', (fileName) => {
    let input = fs.createReadStream(fileName)

    input.on('error', () => {
      console.log('\nThis file does not exist! Please try again \n')
      readFile()
    })

    input.on('readable', () => {
      decryptFile(input, fileName)
    })
  })
}

function decryptFile (input, fileName) {
  rl.question('\nWhat is the password for this file? \n', (password) => {
    let cipher = crypto.createDecipher('aes256', password)

    rl.question('\nWhat would you like to call the decrypted file? \n', (newName) => {
      let output = fs.createWriteStream(newName)

      let stream = input.pipe(cipher).pipe(output)

      stream.on('finish', () => {
        console.log(`\nYour file ${newName} has been decrypted`)
        rl.close()
      })

      cipher.on('error', () => {
        console.log('\n There was an issue with the decrypt operation. Either the password was incorrect or the file was not encrypted.')
        decryptFile(input, fileName)
      })
    })
  })
}

module.exports = function decryptor () {
  readFile()
}
