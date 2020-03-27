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
              console.log({'TOTAL' : stats.TOTAL, 'UNIQUE': stats.UNIQUE});
             } else if(options === '--validate'){
              const wrongLinks = await mdLink.validateLinks(getLinksArray);
              const getLinksText = await mdLink.getLinksText(pathFile)
              const showLinksText= await mdLink.showLinksText(getLinksText)
              const showStatus = await mdLink.getStatus(showLinksText);
              console.log({'ok':showStatus,'bad':wrongLinks.wrongLinks});
             } else if(options === '--validate--stats'){
               const stats = await mdLink.statsLinks(getLinksArray)
              console.log(stats);
            } else {
              const getLinksText = await mdLink.getLinksText(pathFile)
              const showLinksText= await mdLink.showLinksText(getLinksText)
              console.log(showLinksText);
            }
}

mdLinks(pathUser, options)

