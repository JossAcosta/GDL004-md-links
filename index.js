#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const process = require('process');
let pathUser= process.argv[2];
let validLinks=[];
let wrongLinks=[];

const validateFile = (pathUser) => {
    let extension = path.extname(pathUser);
    if (extension === '.md') {
      console.log('Correct File extension: ' + extension);
      readFile(pathUser);
    }else {
      console.error('File no valid. Extension: ' + extension)
    }
  }

  const readFile = pathUser => {
    fs.readFile(pathUser, 'utf8', (err, data) => {
      if (!err) {
        const expression = /(https?:\/\/[^\s]+)/g;
        const regex = new RegExp(expression);
         const links = data.match(regex);
         mapLoop(links);

        return links;

      } else {
        console.error(error.message);
      }
    })
  }

const mapLoop = async (arr) => {
  const promises = arr.map( async url => {
    try{
    const  statusUrl = await fetch(url)
    if(statusUrl.status < 400){
     return validLinks.push( statusUrl.url)
    } else {
      return wrongLinks.push( statusUrl.url)
    }
    } catch (error){
     // console.error('No valido');
    }
  } )

 const statusUrlsArray = await Promise.all(promises)
 //console.table(statusUrlsArray)
 if (process.argv[3] === '--validate') {
 console.group('Validate Links');
        console.table(validLinks);
 console.groupEnd('Validate Links');

 console.group('\n' + ' Broken Links');
    console.table(wrongLinks);
 console.groupEnd('Broken Links');
 }
 else if (process.argv[3] === '--stats' && process.argv[4] === '--validate') {

  console.group('Stats Links BROKEN/VALID');
    console.table('Total: ' + arr.length + '\n' + 'Unique: ' + validLinks.length);
    console.table('Broken: ' + wrongLinks.length);
  console.groupEnd('Valid Links');

}
else if (process.argv[3] === '--stats') {
console.group('Stats Links ');
      console.table('Total: ' + arr.length + '\n' + 'Unique: ' + validLinks.length);
console.groupEnd('Valid Links');
}
}

   validateFile(pathUser);
