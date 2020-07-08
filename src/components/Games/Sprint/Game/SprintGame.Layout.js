import BaseComponent from 'components/BaseComponent/BaseComponent';

export default function getLayout() {
  const container = BaseComponent.createElement({ tag: 'div', className: 'sprint-container' });
  const card = BaseComponent.createElement({ tag: 'div', className: 'sprint-card' });

  const time = BaseComponent.createElement({ tag: 'div', className: 'timer', content: '60' });
  const resultIcon = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__result-icon' });

  const scoreIcon = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__score-icon' });
  const scoreContainer = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__score', content: '0' });
  const scoreWrapper = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__score-wrapper' });
  scoreWrapper.append(scoreIcon, scoreContainer);

  const wordContainer = BaseComponent.createElement({ tag: 'p', className: 'sprint-card__word' });
  const answerContainer = BaseComponent.createElement({ tag: 'p', className: 'sprint-card__word' });

  const buttonContainer = BaseComponent.createElement({ tag: 'div', className: 'sprint-card__button-container' });
  const falseButton = BaseComponent.createElement({
    tag: 'button',
    className: 'sprint-card__button sprint-card__button_incorrect',
    content: 'incorrect',
  });
  const trueButton = BaseComponent.createElement({
    tag: 'button',
    className: 'sprint-card__button sprint-card__button_correct',
    content: 'correct',
  });
  buttonContainer.append(falseButton, trueButton);

  const keyContainer = BaseComponent.createElement({ tag: 'div', className: 'key-container' });
  const leftKey = BaseComponent.createElement({ tag: 'div', className: 'key key_incorrect' });
  const rightKey = BaseComponent.createElement({ tag: 'div', className: 'key key_correct' });
  keyContainer.append(leftKey, rightKey);

  card.append(time, resultIcon, scoreWrapper, wordContainer, answerContainer, buttonContainer);
  container.append(card, keyContainer);
  return [
    container,
    time,
    wordContainer,
    answerContainer,
    falseButton,
    trueButton,
    leftKey,
    rightKey,
    resultIcon,
    scoreContainer,
  ];
}