// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// loader
import Loader from 'components/Loader/Loader.View';

// router
import { onRouteChangeEvent, changeRoute } from 'router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES } from 'router/Router.Constants';

// domain
import Words from 'domainModels/Words/Words';
import { DIFFICULTY } from 'domainModels/Words/Words.Constants';
import Statistics from 'domainModels/Statistics/Statistics';

// styles
import './SprintGame.scss';

// icons
import correctIcon from 'assets/mini-games/img/correct-icon.svg';
import incorrectIcon from 'assets/mini-games/img/incorrect-icon.svg';

// audio
import startGameAudio from 'assets/mini-games/audio/start-game.mp3';
import correctAudio from 'assets/mini-games/audio/correct.mp3';
import errorAudio from 'assets/mini-games/audio/error.mp3';
import supersetAudio from 'assets/mini-games/audio/superset.mp3';

// layout
import get from 'lodash.get';
import getLayout from './SprintGame.Layout';

const wordsDomainModel = new Words();
const statisticsDomainModel = new Statistics();

class SprintGame extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.level = localStorage.getItem('sprint-level');
    this.gameIndex = 0;
    this.streakWinning = 0;
    this.superWinning = 4;
    this.score = 0;
    this.basePoints = 10;
    this.awardedPoints = this.basePoints;
    this.sound = true;
    this.keyUserWord = 'userWord';
    this.keyDifficulty = 'difficulty';
    this.repeatParameter = DIFFICULTY.AGAIN;
    this.keyId = '_id';
    this.keyActiveClassName = 'key_active';
    this.soundOffClassName = 'sprint-card__sound-off';
    this.shortStatistic = {
      incorrect: [],
      correct: [],
    };

    this.loader = new Loader();
    this.loader.show();

    this.setTimer = this.setTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSoundButton = this.handleSoundButton.bind(this);
    this.handleFalseButton = this.handleFalseButton.bind(this);
    this.handleTrueButton = this.handleTrueButton.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  async prepareData() {
    this.group = await wordsDomainModel.selectGroupWords(this.level);
    const { repeatWords } = wordsDomainModel;
    const { newWords } = wordsDomainModel;
    this.shuffleWords(this.group);
    this.shuffleWords(repeatWords);
    this.shuffleWords(newWords);
    this.gameArray = [];
    this.gameArray.push(...repeatWords, ...newWords, ...this.group);

    const { data } = await statisticsDomainModel.getStatistics();
    this.statistic = get(data, `optional.${GAMES_ROUTES.SPRINT}`); // Lodash

    if (!data || !this.statistic) {
      this.statistic = [Date.now(), 0, 0]; // [Date, Results, TotalGame]
    }

    [, , this.statisticTotal] = this.statistic;

    this.loader.hide();
  }

  createLayout() {
    [
      this.container,
      this.time,
      this.wordContainer,
      this.answerContainer,
      this.falseButton,
      this.trueButton,
      this.leftKey,
      this.rightKey,
      this.resultIcon,
      this.scoreContainer,
      this.soundButton,
      this.gamesButton,
    ] = getLayout();

    this.getNewWord();

    this.component.append(this.container);
    this.intervalID = setInterval(this.setTimer, 1000);
    this.playAudio(startGameAudio);
  }

  setTimer() {
    let currentTime = +this.time.textContent;
    currentTime -= 1;
    if (currentTime < 10) {
      this.time.textContent = `0${currentTime}`;
    } else {
      this.time.textContent = currentTime;
    }

    if (currentTime === 0) {
      clearInterval(this.intervalID);
      setTimeout(this.handleFinish, 500);
    }
  }

  getNewWord() {
    if (this.gameArray.length <= this.gameIndex) {
      this.handleFinish();
      return;
    }

    this.currentWord = this.gameArray[this.gameIndex];
    this.gameIndex += 1;

    this.wordContainer.textContent = this.currentWord.word;

    this.getNewAnswer();
  }

  getNewAnswer() {
    const rightAnswer = this.randomNumber(1) === 1;
    if (rightAnswer) {
      this.answerContainer.textContent = this.currentWord.wordTranslate;
    } else {
      const randomIndex = this.randomNumber(this.group.length - 1);
      const falseAnswer = this.group[randomIndex].wordTranslate;
      this.answerContainer.textContent = falseAnswer;
    }
  }

  randomNumber(number) {
    return Math.round(Math.random() * number);
  }

  /**
   * Fisher–Yates shuffle algorithm
   * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
   * @param {Array} words
   */
  shuffleWords(words) {
    const array = words;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (array.length));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  playAudio(src) {
    if (this.sound) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = `${src}`;
      audio.play();
    }
  }

  addListeners() {
    this.gamesButton.addEventListener('click', this.handleClick);
    this.soundButton.addEventListener('click', this.handleSoundButton);
    this.falseButton.addEventListener('click', this.handleFalseButton);
    this.trueButton.addEventListener('click', this.handleTrueButton);
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  removeListeners() {
    this.gamesButton.removeEventListener('click', this.handleClick);
    this.soundButton.removeEventListener('click', this.handleSoundButton);
    this.falseButton.removeEventListener('click', this.handleFalseButton);
    this.trueButton.removeEventListener('click', this.handleTrueButton);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    clearInterval(this.intervalID);
  }

  handleClick(event) {
    onRouteChangeEvent(event, ROUTERS.GAMES);
  }

  handleSoundButton() {
    this.sound = !this.sound;
    this.soundButton.classList.toggle(this.soundOffClassName);
  }

  handleFalseButton() {
    this.handleAnswer(false);
    this.getNewWord();
  }

  handleTrueButton() {
    this.handleAnswer(true);
    this.getNewWord();
  }

  handleKeyDown(event) {
    if (event.repeat) return;

    if (event.code === 'ArrowLeft') {
      this.leftKey.classList.add(this.keyActiveClassName);
      this.handleAnswer(false);
      this.getNewWord();
    }
    if (event.code === 'ArrowRight') {
      this.rightKey.classList.add(this.keyActiveClassName);
      this.handleAnswer(true);
      this.getNewWord();
    }
  }

  handleKeyUp(event) {
    if (event.code === 'ArrowRight') {
      this.rightKey.classList.remove(this.keyActiveClassName);
    }
    if (event.code === 'ArrowLeft') {
      this.leftKey.classList.remove(this.keyActiveClassName);
    }
  }

  handleAnswer(userAnswer) {
    const rightAnswer = this.currentWord.wordTranslate === this.answerContainer.textContent;
    const result = userAnswer === rightAnswer;
    if (result) {
      this.handleCorrectAnswer();
    } else {
      this.handleIncorrectAnswer();
    }
  }

  handleCorrectAnswer() {
    this.playAudio(correctAudio);
    this.streakWinning += 1;

    if (this.streakWinning === this.superWinning) {
      this.playAudio(supersetAudio);
      this.awardedPoints *= 2;
      this.streakWinning = 0;
    }

    this.score += this.awardedPoints;
    this.scoreContainer.textContent = this.score;

    this.resultIcon.style.backgroundImage = `url(${correctIcon})`;
    this.shortStatistic.correct.push(this.currentWord);
  }

  handleIncorrectAnswer() {
    this.playAudio(errorAudio);
    this.streakWinning = 0;
    this.awardedPoints = this.basePoints;
    this.resultIcon.style.backgroundImage = `url(${incorrectIcon})`;
    this.shortStatistic.incorrect.push(this.currentWord);

    if (
      this.keyUserWord in this.currentWord
      && (!(this.currentWord[this.keyUserWord][this.keyDifficulty] === this.repeatParameter))
    ) {
      wordsDomainModel.updateUserWord(this.currentWord[this.keyId], this.repeatParameter);
    }
  }

  handleFinish() {
    localStorage.setItem('sprint-score', this.score);
    localStorage.setItem('sprint-shortStatistic', JSON.stringify(this.shortStatistic));
    this.statisticFinish();
    changeRoute(GAMES_ROUTES.SPRINT_FINISH, ROUTERS.GAMES);
  }

  statisticFinish() {
    const date = Date.now();
    const res = this.score;
    const total = this.statisticTotal + 1;
    const data = [date, res, total];
    statisticsDomainModel.updateStatistics(GAMES_ROUTES.SPRINT, data);
  }
}

export default SprintGame;
