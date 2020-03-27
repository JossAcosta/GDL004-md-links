const fs = require('fs'),
      path = require('path'),
      fetch = require('node-fetch'),
      chalk = require('chalk');

const mdLink = {

validateFile :  pathUser => {
   return new Promise ((resolve, reject)=>{
    let extension = path.extname(pathUser);
    if (extension === '.md') {
      //console.log(chalk.bold.rgb(30, 166, 51).inverse('Correct File extension: ' + extension));
      resolve(pathUser)
    }else {
      reject('File no valid extension: '+ extension)
     // console.error(chalk.bold.rgb(255, 0, 0).inverse('File no valid extension: ' + extension));
    }
  })
  },

  readFile : async(pathUser )=> {
    return new Promise ((resolve, reject)=>{
      fs.readFile(pathUser,'utf8', (err, data) => {
        if(err){
       reject()
        } else {
        const expression = /(https?:\/\/[^\s\)]+)/g;
        const regex = new RegExp(expression);
         const links = data.match(regex);

         if(links){
          resolve(links);
          }else{
             console.error(chalk.bold.rgb(255, 0, 0).inverse('----No URLs to validate----'))
            }
        }

      });
    })
  },

  getLinks :  arr => {
    let arrayLinksAll=[];
    return new Promise (async(resolve, reject)=>{

      const promises = arr.map( async url => {
        try{
          const  statusUrl = await fetch(url)
         arrayLinksAll.push({ href: statusUrl.url, status : statusUrl.status})
           } catch (error){
         // console.error('No valido');
         }
      })
      await Promise.all(promises)
      resolve( arrayLinksAll  );
      reject('Error');
    } )
  },

  validateLinks :  arr => {
   let validLinks=[];
   let wrongLinks=[];
    return new Promise ((resolve, reject)=>{
      arr.forEach(singleLink => {
        if(singleLink.status < 400){
          validLinks.push( {href:singleLink.href, 'URL':'OK', status :singleLink.status })
        }else {
         wrongLinks.push( {href:singleLink.href, 'URL':'FAIL', status :singleLink.status })
        }
      })
   resolve( {wrongLinks} );
    reject('Error');
  } )
  },

  statsLinks : arr => {
    let UNIQUE =0;
    let  BROKEN=0;
   const TOTAL = arr.length;
       return new Promise ((resolve, reject)=>{
       for(let i=0; i<arr.length; i++){
        if (arr[i].status <400){
       UNIQUE +=1;
        }
        else {
          BROKEN ++;
        }
      }
   resolve({TOTAL,UNIQUE, BROKEN });
    reject('Error');
  } )
  },
  getLinksText : async(pathUser) => {
    return new Promise ((resolve, reject)=>{
      fs.readFile(pathUser,'utf8', (err, data) => {
        if(err){
       reject()
        } else {
          const regex = new RegExp(/\[(.*)\]\((https?:\/\/[^\s\){0}]+)\)/g);
          const getMatches = (data, regex, index) => {
              index || (index = 1);
              let matches = [];
              let match;
              while (match = regex.exec(data)) {
                  matches.push(match[index]);
              }
              return matches;
          }

          let links = getMatches(data, regex, 2);
          let text = getMatches(data, regex, 1);

         if(links){

          resolve({links,text});
          }else{
             console.error(chalk.bold.rgb(255, 0, 0).inverse('----No URLs to validate----'))
            }
        }

      });
    })
  },

  showLinksText : (linksTexArr,) => {
    let showLinksTextArray =[];
   const linksNum =linksTexArr.links
      return new Promise ((resolve, reject)=>{
      for(let i=0; i<linksNum.length; i++){
     showLinksTextArray.push({'HREF':linksTexArr.links[i],'TEXT':linksTexArr.text[i]})
       }
  resolve(showLinksTextArray);
   reject('Error');
 } )
  },

  getStatus :async(linksTexObj) =>{
    const arrayLinks=[];
    return new Promise (async(resolve, reject)=>{
      const promises = linksTexObj.map( async url => {
        try{
          const  statusUrl = await fetch(url.HREF)
         arrayLinks.push({ href: statusUrl.url, status : statusUrl.status, result: 'OK', text: url.TEXT})
           } catch (error){
         // console.error('No valido');
         }
      })
      await Promise.all(promises)
      resolve( arrayLinks);
      reject('Error');
    } )
  }

}

module.exports = mdLink;

