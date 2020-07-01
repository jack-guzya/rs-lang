// lodash
import get from 'lodash.get';
import shuffle from 'lodash.shuffle';

// domains
// import SettingsDomain from '../../../domain-models/Settings/Settings';
import WordsDomain from '../../../domain-models/Words/Words';

// Settings
import { getSettings } from '../../Settings/SettingsHandler';

// ===================== words =============================

const wordsDomain = new WordsDomain();
const { getFileLink } = wordsDomain;

function replaceWord(targetText, value) {
  const regExp = /(?<=<(b|i)>)(.*)(?=<\/(b|i)>)/g;
  const [word] = targetText.match(regExp);
  const text = targetText.replace(regExp, value);
  return { word, text };
}

function handleWords(data) {
  const res = data.map((wordData) => {
    const {
      image,
      textExample,
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning,
      textMeaningTranslate,
      _id,
      word,
    } = wordData;

    return {
      image: getFileLink(image),
      textExample: replaceWord(textExample, ' ... ').text,
      textExampleTranslate,
      transcription,
      wordTranslate,
      textMeaning: replaceWord(textMeaning, ' ... ').text,
      textMeaningTranslate,
      _id,
      word,
      cutWords: {
        textExample: replaceWord(textExample).word,
        textMeaning: replaceWord(textMeaning).word,
      },
    };
  });

  return res;
}

async function getDayWordsCollection(optional) {
  const {
    newWords,
    level,
    wordsPerDay,
    collectionWordsMode,
  } = optional;
  await wordsDomain.selectGroupWords(+level);

  const newWordsList = wordsDomain.newWords.slice(0, +newWords);
  const repeatWordList = wordsDomain.repeatWords.slice(0, (+wordsPerDay - +newWords));// !!!!
  let allWords = newWordsList.concat(repeatWordList);

  switch (collectionWordsMode) {
    case 'shuffle':
      allWords = newWordsList.concat(repeatWordList);
      break;

    case 'new':
      allWords = newWordsList;
      break;

    default:
      allWords = repeatWordList;
      break;
  }

  // if (allWords.length < +wordsPerDay) {
  //   const amount = +wordsPerDay - allWords.length;
  //   const additionalWords = shuffle(wordsDomain.groupWords)
  //     .slice(0, amount);
  //   allWords = allWords.concat(additionalWords);
  // }

  return shuffle(handleWords(allWords));
}

function getTrueWords(collection) {
  return collection.map((wordData) => {
    const { word, cutWords } = wordData;
    return { word, cutWords };
  })
    .reverse();
}

// ===================== buttons =============================

async function handleButtons(event, functionsList) {
  const buttonFunction = get(event, 'target.dataset.button');
  if (!buttonFunction) { return; }
  functionsList[buttonFunction]();
}

async function addWordDifficulty(event, wordId) {
  const difficulty = get(event, 'target.dataset.difficulty');
  if (!difficulty) { return; }
  await wordsDomain.createUserWord(wordId, difficulty);
}

async function addWordToVocabulary(event, wordId) {
  const vocabulary = get(event, 'target.dataset.vocabulary');
  if (!vocabulary) { return; }
  await wordsDomain.createUserWord(wordId, null, vocabulary);
}

// ===================== settings =============================

async function splitSettings() {
  // const settingsDomain = new SettingsDomain();
  // const settingsData = await settingsDomain.getSettings();
  // const { optional } = settingsData.data;
  const all = await getSettings();
  const enabled = Object.keys(all)
    .filter((setting) => all[setting] === true);
  return { enabled, all };
}

export {
  handleWords,
  getDayWordsCollection,
  getFileLink,
  replaceWord,
  handleButtons,
  addWordDifficulty,
  addWordToVocabulary,
  splitSettings,
  getTrueWords,
};
