import setDragondrop from 'components/Games/EnglishPuzzle/components/Game/EnglishPuzzle.Dragondrop';
import BOOKS from 'components/Games/EnglishPuzzle/ArrayOfAssets/ArrayOfData/books';
import LEVELS from 'components/Games/EnglishPuzzle/ArrayOfAssets/ArrayOfPaintings/levels';
import { getAbsoluteUrl } from 'services/helper';
import Statistics from 'domainModels/Statistics/Statistics';
import { GAMES_ROUTES } from 'router/Router.Constants';

class Controller {
  constructor() {
    this.playboard = document.querySelector('.playboard');
    this.ruSentence = document.querySelector('.game-screen__sentence');
    this.pieces = document.querySelector('.game-screen__puzzle-pieces');
    this.currentDroppable = 0;
    this.isEndRound = false;
    this.enSentence = document.querySelectorAll('.playboard__sentence');
    this.finalPic = document.querySelector('.final-pic');
    this.buttonCheck = document.querySelector('.button__check');
    this.buttonDknow = document.querySelector('.button__dont-know');
    this.levelSelector = document.getElementById('level');
    this.pageSelector = document.getElementById('page');
    this.buttonBack = document.querySelector('.button__back');
    this.buttonListen = document.querySelector('.button__listen');
    this.buttonMute = document.querySelector('.button__mute');
    this.modalWindow = document.querySelector('.modal-window');
    this.statics = document.querySelector('.button__results');
    this.statistics = new Statistics();
    this.buttonClose = document.querySelector('.close');

    this.setStatistics().then();
    this.updateFields();
  }

  async setStatistics() {
    try {
      const result = await this.statistics.getStatistics();
      this.currentStatistics = result.data.optional[GAMES_ROUTES.ENGLISH_PUZZLE];
    } catch (e) {
      this.currentStatistics = [];
    }
  }

  async updateStatistics(data) {
    await this.statistics.updateStatistics(GAMES_ROUTES.ENGLISH_PUZZLE, data);
  }

  updateFields() {
    if (this.pieces.childNodes.length > 0) {
      this.pieces.innerHTML = '';
    }

    this.currentLevel = parseInt(this.levelSelector.value, 10);
    this.currentPage = parseInt(this.pageSelector.value, 10);
    this.currentSentence = 0;
    this.count = 1;
    this.currentEngSentence = 0;
    this.piecesArr = [];
  }

  setCurrentRound() {
    if (this.currentSentence <= 9) {
      this.enSentence[this.currentSentence].classList.add('playboard__sentence_active');
      this.start();
    }

    if (this.currentSentence > 9) {
      this.buttonDknow.style.display = 'none';
      this.isEndRound = true;
      this.showPicture();
      this.buttonMute.style.display = 'none';
    }
  }

  showPicture() {
    this.finalPic.style.backgroundImage = `url('${getAbsoluteUrl(LEVELS[this.currentLevel - 1][this.currentPage].cutSrc)}')`;
    this.finalPic.style.visibility = 'visible';
    this.finalPic.textContent = `${LEVELS[this.currentLevel - 1][this.currentPage].name} ${LEVELS[this.currentLevel - 1][this.currentPage].author} ${LEVELS[this.currentLevel - 1][this.currentPage].year}`;

    this.buttonCheck.textContent = 'Next Round';
    this.buttonCheck.onclick = this.newRound.bind(this);
  }

  clearFields() {
    const rows = this.playboard.querySelectorAll('.playboard__sentence');
    this.currentSentence = 0;

    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i].classList.contains('playboard__sentence_active')) {
        rows[i].classList.remove('playboard__sentence_active');
      }

      rows[i].innerHTML = '';
    }
  }

  updateLevel() {
    if (this.pageSelector.length < this.currentPage + 1) {
      this.pageSelector.value = 1;
      this.levelSelector.value = this.levelSelector.length < this.currentLevel + 1
        ? 1
        : this.currentLevel + 1;
    } else {
      this.pageSelector.value = this.currentPage + 1;
    }
  }

  newRound() {
    this.updateLevel();
    this.clearFields();
    this.isEndRound = false;
    this.buttonDknow.style.display = 'block';
    this.finalPic.style.visibility = 'hidden';

    this.buttonCheck.onclick = this.checkSentence.bind(this);
    this.buttonCheck.textContent = 'Check';

    this.enSentence[this.currentSentence].classList.add('playboard__sentence_active');
    this.updateFields();
    this.start();
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  createRuSentence() {
    this.ruSentence.innerHTML = BOOKS[this.currentLevel - 1][(this.count * this.currentPage) - 1]
      .textExampleTranslate;
  }

  createPieces() {
    this.currentEngSentence = BOOKS[this.currentLevel - 1][(this.count * this.currentPage) - 1].textExample.split(' ');
    this.statics.style.display = 'none';
    this.piecesArr = [];

    for (let i = 0; i < this.currentEngSentence.length; i += 1) {
      const newElem = document.createElement('div');
      newElem.classList.add('puzzle-piece');
      newElem.setAttribute('data-order', i);
      newElem.setAttribute('draggable', true);
      newElem.innerHTML = this.currentEngSentence[i];
      this.piecesArr.push(newElem);
    }
  }

  determineWidth() {
    this.currentDroppable = document.querySelector('.playboard__sentence_active');
    const measurementSquare = document.querySelector('.measure');
    const width = this.currentDroppable.offsetWidth;
    const widthArr = [];
    const pieces = this.piecesArr;

    pieces.forEach((piece) => {
      measurementSquare.textContent = piece.textContent;
      widthArr.push(measurementSquare.offsetWidth);
    });

    const piecesWidth = widthArr.reduce((sum, a) => sum + a);
    const delta = Math.floor((width - piecesWidth) / pieces.length);
    const newWidthArr = widthArr.map((x) => x + delta);
    let reduced = 0;

    this.piecesArr.forEach((x, i) => {
      if (i > 0) {
        reduced += newWidthArr[i - 1];
      }

      this.piecesArr[i].style.width = `${newWidthArr[i]}px`;
      this.piecesArr[i].style.backgroundImage = `url('${getAbsoluteUrl(LEVELS[this.currentLevel - 1][this.currentPage].cutSrc)}')`;
      this.piecesArr[i].style.backgroundPosition = `-${reduced}px -${(this.currentSentence) * 30}px`;

      if (!this.buttonBack.classList.contains('button-active')) {
        this.piecesArr[i].classList.add('puzzle-piece_hidden');
      }
    });
  }

  addPieces() {
    const arr = this.piecesArr.slice();
    this.shuffle(arr);
    arr.forEach((a) => {
      this.pieces.append(a);
    });
  }

  checkSentence() {
    const nodes = this.currentDroppable.childNodes;
    const arr = Array.prototype.slice.call(nodes);
    let correct = 0;

    for (let i = 0; i < arr.length; i += 1) {
      if (i === Number(arr[i].getAttribute('data-order'))) {
        nodes[i].style.borderColor = '#00ff00';
        correct += 1;
      } else {
        nodes[i].style.borderColor = '#ff0000';
      }
    }

    if (correct === this.piecesArr.length) {
      this.saveLocalStorage(true);
      if (this.buttonListen.classList.contains('button-active')) {
        this.sound();
      }

      this.buttonCheck.textContent = 'Continue';
      this.buttonDknow.style.display = 'none';
      this.buttonCheck.onclick = this.continueGame.bind(this);
    }
  }

  saveLocalStorage(isCorrect) {
    if (!this.currentStatistics.some((el) => this.checkOnLevelAndPage(el))) {
      this.currentStatistics.push({
        currentLevel: this.currentLevel,
        currentPage: this.currentPage,
        data: [],
      });
    }

    const blockPuzzle = this.currentStatistics.find((el) => this.checkOnLevelAndPage(el));
    const sentenceBlock = blockPuzzle.data.find((el) => el.sentence === this.currentSentence);

    if (sentenceBlock) {
      sentenceBlock.isCorrect = isCorrect;
    } else {
      blockPuzzle.data.push({
        sentence: this.currentSentence,
        isCorrect,
      });
    }

    this.updateStatistics(this.currentStatistics).then();
  }

  checkOnLevelAndPage(el) {
    return el.currentLevel === this.currentLevel && el.currentPage === this.currentPage;
  }

  dontknow() {
    const arr = this.piecesArr;

    for (let i = 0; i < arr.length; i += 1) {
      arr[i].style.borderColor = '#0e1e40';
      this.enSentence[this.currentSentence].append(arr[i]);
    }

    this.saveLocalStorage(false);

    if (this.buttonListen.classList.contains('button-active')) {
      this.sound();
    }

    this.buttonCheck.textContent = 'Continue';
    this.buttonCheck.onclick = this.continueGame.bind(this);
  }

  continueGame() {
    this.buttonCheck.onclick = this.checkSentence.bind(this);
    this.buttonCheck.textContent = 'Check';
    this.buttonDknow.style.display = 'block';
    this.statics.style.display = 'block';

    this.enSentence[this.currentSentence].classList.remove('playboard__sentence_active');

    this.currentSentence += 1;
    this.count += 1;

    this.setCurrentRound();
  }

  soundCurrentAudio() {
    this.sound();
  }

  displayStatistics() {
    const containerPicture = document.querySelector('.container-picture');
    const currentLevel = LEVELS[this.currentLevel - 1][this.currentPage];

    this.buttonClose.onclick = this.closePopup.bind(this);

    containerPicture.innerHTML = `
        <img class="modal-picture" src="${getAbsoluteUrl(currentLevel.cutSrc)}">
        <p class="modal-name-of-picture">${currentLevel.author}-${currentLevel.name}(${currentLevel.year})</p>
    `;

    const sentences = this.currentStatistics;

    const currentSentences = sentences.find((sentence) => (
      sentence.currentLevel === this.currentLevel && sentence.currentPage === this.currentPage));
    document.querySelector('.list-of-right').innerHTML = '';
    document.querySelector('.list-of-error').innerHTML = '';
    document.querySelector('.num-of-error').innerHTML = currentSentences.data.filter((el) => !el.isCorrect).length;
    document.querySelector('.num-of-right').innerHTML = currentSentences.data.filter((el) => el.isCorrect).length;

    for (let i = 0; i < currentSentences.data.length; i += 1) {
      // eslint-disable-next-line max-len
      const sentence = BOOKS[currentSentences.currentLevel - 1][currentSentences.currentPage * currentSentences.data[i].sentence];
      const container = currentSentences.data[i].isCorrect
        ? document.querySelector('.list-of-right')
        : document.querySelector('.list-of-error');

      container.innerHTML += `
            <div class="item">
                <img src="./../../../../../assets/EnglishPuzzle/sound.svg" data-audio="${sentence.audioExample}" class="sound__icon">
                <p class="sentence">
                    ${sentence.textExample}
                </p>
            </div>
      `;
    }

    document.querySelectorAll('.sound__icon').forEach((el) => {
      el.addEventListener('click', () => {
        this.sound(el.getAttribute('data-audio'), false);
      });
    });
  }

  sound(
    url = BOOKS[this.currentLevel - 1][(this.count * this.currentPage) - 1].audioExample,
    isEndRound = this.isEndRound,
  ) {
    if (!isEndRound) {
      const audio = new Audio(getAbsoluteUrl(url));

      audio.play();
    }
  }

  openPopup() {
    this.modalWindow.style.display = 'flex';
    this.displayStatistics();
  }

  closePopup() {
    this.modalWindow.style.display = 'none';
  }

  gameStart() {
    this.start();
  }

  start() {
    this.createRuSentence();
    this.createPieces();
    this.determineWidth();
    this.addPieces();
    setDragondrop();
  }
}

export default Controller;
