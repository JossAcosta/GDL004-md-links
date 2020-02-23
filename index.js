#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const process = require('process');
let pathUser= process.argv[2];
let validLinks=[];
let wrongLinks=[];
const color = require('paint-console');

var chalk = require('chalk');



const validateFile = (pathUser) => {
    let extension = path.extname(pathUser);
    if (extension === '.md') {
      console.log(chalk.rgb(30, 166, 51).underline('Correct File extension: ' + extension));
      readFile(pathUser);
    }else {
      console.error('File no valid extension: ' + extension)
    }
  }

  const readFile = pathUser => {
    fs.readFile(pathUser, 'utf8', (err, data) => {
      if (!err) {
        const expression = /(https?:\/\/[^\s\)]+)/g;
        const regex = new RegExp(expression);
         const links = data.match(regex);
         if(links){
         mapLoop(links);

        return links;
         } else{
           console.error('No URLs to validate ')}
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
      console.error('Could not find the IP address of the server: '+ url);
    }
  } )

 const statusUrlsArray = await Promise.all(promises)
 //console.table(statusUrlsArray)
 if (process.argv[3] === '--validate') {
 console.group(chalk.bold.rgb(30, 166, 51).inverse('Validate Links'));
        console.table(validLinks);
 console.groupEnd('Validate Links');

 console.group(chalk.bold.rgb(255, 5, 5).inverse('\n' + ' Broken Links'));
    console.table(wrongLinks);
 console.groupEnd('Broken Links');
 }
 else if (process.argv[3] === '--stats' && process.argv[4] === '--validate') {

  console.group(chalk.bold.rgb(255, 255, 255).inverse('Stats Links BROKEN/VALID'));
    console.table(chalk.bold.rgb(245, 218, 15)('Total: ' + arr.length ));
    console.table(chalk.rgb(30, 166, 51)('Unique: ' + validLinks.length))
    console.table(chalk.rgb(255, 5, 5)('Broken: ' + wrongLinks.length));
  console.groupEnd('Stats Links BROKEN/VALID');

}
else if (process.argv[3] === '--stats') {
console.group(chalk.bold.rgb(255, 255, 255).inverse('Stats Links '));
      console.table(chalk.bold.rgb(245, 218, 15)('Total: ' + arr.length ));
      console.table(chalk.rgb(30, 166, 51)( 'Unique: ' + validLinks.length));
console.groupEnd('Stats Links ');
}
}

   validateFile(pathUser);

