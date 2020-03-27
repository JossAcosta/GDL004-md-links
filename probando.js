const fetch = require('node-fetch');
let validLinks=[];
let wrongLinks=[];
//let UNIQUE = 0;
//let BROKEN = 0;
//let TOTAL =0;

  async function validateLinksFlag(arr) {
    return new Promise (async(resolve, reject)=>{
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
    })
   const statusUrlsArray = await Promise.all(promises)
   resolve({ validLinks, wrongLinks});

  } )
  }

const statsValidateFlag = (arr) =>{
  return new Promise ((resolve, reject)=>{
  validateLinksFlag(arr).then(res =>{
    const TOTAL = arr.length;
    const UNIQUE = res.validLinks.length;
    const BROKEN = res.wrongLinks.length;
      resolve({TOTAL,UNIQUE,BROKEN})
    })
})

}
const statsFlag = arr =>{
  return new Promise ((resolve, reject)=>{
    statsValidateFlag(arr).then(res => {
      const TOTAL = res.TOTAL;
      const UNIQUE = res.UNIQUE;
      resolve({TOTAL, UNIQUE})
    })
  })
}
//validateLinksFlag(arrayLinks).then((res)=> console.log(res))
//statsValidateFlag(arrayLinks).then((res)=>{ console.log(res)})
//statsFlag(arrayLinks).then((res)=>{ console.log(res)})

module.exports = validateLinksFlag;
module.exports = statsValidateFlag;
module.exports =statsFlag;

//function bodyStream(url){
  const fetch = require('node-fetch');
  const fs = require('fs');
  const stream= require('stream');
  fetch('https://assets-cdn.github.com/images/modules/logos_page/Octocat.png')
    .then(res => {
        const dest = fs.createWriteStream('./octocat.png');
        res.body.pipe(dest);
    });
//}

function cambiarNombre(nombre){
  let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  let result = regex.exec(nombre)[0];
  console.log(result)
  
  }
  cambiarNombre("ñoñerías");