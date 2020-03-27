module.exports = async function getLinksFile (links) {
    const promises = await(links);
  const arrayPromises = await Promise.all(promises)
  //console.log(arrayPromises );
  return arrayPromises;
  }
  #!/usr/bin/env node

  const mdLink = require('./utils.js'),
        process = require('process');
        chalk = require('chalk');
  //const argv = require('./yargs.js').argv;
  const options = process.argv[3];
  let pathUser= process.argv[2];

  async function mdLinks(pathUser, options){
    let pathFile = '';
    let getLinks = '';
    try {
        pathFile = await mdLink.validateFile(pathUser);
        console.log(chalk.bold.rgb(30, 166, 51).inverse('Correct File extension '));
        getLinks = await mdLink.readFile(pathFile);
        getLinksArray = await mdLink.getLinks(getLinks);
    } catch (e) {
        console.error(e);
    }
            if(options === '--stats'){
                const stats = await mdLink.statsLinks(getLinksArray)
                return  {'TOTAL' : stats.TOTAL, 'UNIQUE': stats.UNIQUE};
               }
               else
               if(options === '--validate'){
                //  const showText = await mdLink.getText(pathFile)
                //  const validate = await mdLink.validateLinks(getLinksArray)
                //  const showLinksText = await mdLink.showLinksText(getLinksArray,showText)
                //  return validate;
              //   return    {'HREF': showlinksText.HREF, 'TEXT':showLinkText.TEXT, 'STATUS': validate.status};

            }
             else if(options === '--validate--stats'){
                 const stats = await mdLink.statsLinks(getLinksArray)
                 return stats;
              }
              else if(options = '--'){
               //  const showLinks = await mdLink.getLinks(getLinks)
                 const showText = await mdLink.getText(pathFile)
                 const showLinksText = await mdLink.showLinksText(getLinksArray,showText)
                return showLinksText;

              }
              else {
                throw new Error(console.log('Flag unrecognized'));
              }
  }
  mdLinks(pathUser, options)
   .then(res => console.log(res));


