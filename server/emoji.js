const fs = require('fs');
const path = require('path');

const assetDir = './emojis';
const metadataFile = 'metadata.json';

async function getMetadataList() {
  return new Promise((resolve, reject) => {
    fs.readdir(assetDir, (err, folders) => {
      if (err) {
        console.error(`Error reading directory ${assetDir}: ${err}`);
        reject(err);
        return;
      }

      const metadataList = [];

      folders.forEach((folder, index) => {
        const folderPath = path.join(assetDir, folder);

        fs.stat(folderPath, (err, stats) => {
          if (err) {
            console.error(`Error getting stats for ${folderPath}: ${err}`);
            reject(err);
            return;
          }

          if (stats.isDirectory()) {
            const metadataPath = path.join(folderPath, metadataFile);

            fs.readFile(metadataPath, 'utf8', (err, data) => {
              if (err) {
                console.error(`Error reading ${metadataPath}: ${err}`);
                reject(err);
                return;
              }

              const metadata = JSON.parse(data);
              metadata.folderName = folder; // Add folderName property
              metadataList.push(metadata);

              // If this is the last folder, resolve the Promise with the metadataList.
              if (index === folders.length - 1) {
                resolve(metadataList);
              }
            });
          }
        });
      });
    });
  });
}

async function getEmojiMetadata(string) {
  const metadataList = await getMetadataList();
  const emojiMetadataList = [];

  for (const char of string) {
    const hex = char.codePointAt(0).toString(16);
    const emojiMetadata = metadataList.find((metadata) => metadata.unicode === hex);
    if (emojiMetadata) {
      emojiMetadataList.push(emojiMetadata);
    }
  }

  return emojiMetadataList;
}

async function getEmojiImages(emojiString) {
  const emojiMetadataList = await getEmojiMetadata(emojiString);
  let imgList = [];
  emojiMetadataList.forEach(element => {
    imgList.push(`${element.folderName}/${element.cldr.toLowerCase().replaceAll(' ', '_')}.png`);
  });
  return imgList;
}

module.exports = {
  getEmojiImages,
};
