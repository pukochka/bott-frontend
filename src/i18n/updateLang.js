const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 *
 * */
const link =
  'https://script.googleusercontent.com/macros/echo?user_content_key=w0dzy9c0htvHjaPSznPm_8WqQlm6BJn1EMzF9S8lxYcvHNymfXfd0RKEvpTGp_XOi3QDNWU_4atcqVWbv0q2y29HhVn7SYfFm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPcHXaftAhDX4ExqJskHtGOdR1UZ2QiyMRsisEzwKVw_iBhUAGmySsa5sgImqXZlmLS8PXbb0r5y4c9yHb_tcICnEz0T-5Wxwdz9Jw9Md8uu&lib=MB8MdcUkfiCmRFSNCkesHGjaZd42sAwC7';

console.log('*** Процесс обновления языков запущен ***');

axios.get(link).then((response) => {
  if (!response.data.result) return;

  const data = response.data.result;

  const langKeys = Object.keys(data);

  for (const lang of langKeys) {
    fs.writeFile(
      path.join(__dirname, lang + '.json'),
      JSON.stringify(data[lang]),
      (err) => {
        if (!err) {
          console.log('Обновлён файл для языка ' + lang);
        } else {
          console.log('Не удалось обновить файл для языка ' + lang);
        }
      }
    );
  }

  fs.writeFile(path.join(__dirname, 'index.ts'), write(langKeys), (err) => {
    if (!err) {
      console.log('Обновлён файл для импорта и экспорта');
    } else {
      console.log('Не удалось обновить файл для импорта и экспорта');
    }
  });
});

function writeImport(lang) {
  return 'import ' + lang + ' from "./' + lang + '.json" \n';
}

function write(langKeys) {
  let strImport = '';
  let strExport = '';

  for (const lang of langKeys) {
    strImport += writeImport(lang);

    strExport += lang + ':' + lang + ',';
  }
  return strImport + '\nexport default { ' + strExport + ' }';
}
