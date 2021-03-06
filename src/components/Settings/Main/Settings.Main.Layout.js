import {
  SETTINGS_MAIN, VALIDATOR_GROUPS, BUTTONS,
} from '../Settings.Constants';

function getLayout() {
  return `
  <div class="main-settings__words">
  <form name="main-settings">

  <p class="words-title">Words</p>
    <div class="words__total-words">
    <label for="${SETTINGS_MAIN.WORDS_PER_DAY}">Total words per day: </label>
    <input class="input" type="number" id="${SETTINGS_MAIN.WORDS_PER_DAY}" name="total-words"
    data-settings="${SETTINGS_MAIN.WORDS_PER_DAY}"
    data-validator="${VALIDATOR_GROUPS.WORDS}">
    </div>

    <div class="words__new-words">
    <label for="${SETTINGS_MAIN.NEW_WORDS}">New words per day: </label>
    <input class="input" type="number" id="${SETTINGS_MAIN.NEW_WORDS}" name="new-words"
    data-settings="${SETTINGS_MAIN.NEW_WORDS}">
    </div>

    <div class="words__collection">
      <p class="collection-title">Collection words mode</p>

      <select id="words-mode"
      data-settings="${SETTINGS_MAIN.COLLECTION_WORDS_MODE}">
        <option value="shuffle">Shuffle</option>
        <option value="new">Only new words</option>
        <option value="repeated">Only repeated words</option>
      </select>
    </div>



    <div class="words__level">
      <p class="level-title">Level</p>

        <select id="level" data-settings="${SETTINGS_MAIN.LEVEL}">
          <option value=0>level 0</option>
          <option value=1>level 1</option>
          <option value=2>level 2</option>
          <option value=3>level 3</option>
          <option value=4>level 4</option>
          <option value=5>level 5</option>
        </select>
    </div>
  </div>

  <div class="main-settings__cards">
    <p class="cards__title">Display on cards</p>

    <div class="cards__image">
      <input type="checkbox" id="image" name="image"
      data-settings="${SETTINGS_MAIN.IMAGE}">
      <label for="image">Associative image</label>
    </div>



    <div class="cards__example">
      <input type="checkbox" id="example" name="example"
      data-settings="${SETTINGS_MAIN.EXAMPLE}"
      data-validator="${VALIDATOR_GROUPS.DISPLAYING}">
    <label for="example">Example</label>
    </div>


    <div class="cards__meaning">
      <input type="checkbox" id="meaning" name="meaning"
      data-settings="${SETTINGS_MAIN.MEANING}">
      <label for="meaning">Meaning</label>
    </div>


    <div class="cards__word-translation">
      <input type="checkbox" id="word-translation" name="wordTranslation"
      data-settings="${SETTINGS_MAIN.WORD_TRANSLATION}">
      <label for="word-translation">Word translation</label>
    </div>


    <div class="cards__transcription">
      <input type="checkbox" id="transcription" name="transcription"
      data-settings="${SETTINGS_MAIN.TRANSCRIPTION}">
      <label for="transcription">Transcription</label>
    </div>


    <div class="cards__translation">
      <input type="checkbox" id="translate" name="translate"
      data-settings="${SETTINGS_MAIN.TRANSLATION}">
      <label for="translate">Translation of offers</label>
    </div>


    <div class="cards__autoplay">
      <input type="checkbox" id="autoplay" name="autoplay"
      data-settings="${SETTINGS_MAIN.AUDIO_AUTOPLAY}">
      <label for="autoplay">Voice autoplay </label>
    </div>
  </div>

  <div class="main-settings__buttons">
  <p class="buttons__title">Buttons</p>

    <div class="buttons__difficulty">
      <input type="checkbox" id="difficulty" name="difficulty"
      data-settings="${SETTINGS_MAIN.DIFFICULTY_BUTTONS}">
      <label for="difficulty">Difficulty</label>
    </div>


    <div class="buttons__vocabulary">
      <input type="checkbox" id="vocabulary" name="vocabulary"
      data-settings="${SETTINGS_MAIN.VOCABULARY_BUTTONS}">
      <label for="vocabulary">Vocabulary</label>
    </div>

    <div class="buttons__skip">
      <input type="checkbox" id="answer" name="answer"
      data-settings="${SETTINGS_MAIN.ANSWER_BUTTON}">
      <label for="answer">Skip</label>
    </div>
  </div>
  </form>

  <div class="settings-page__control-block">
    <button class="button--light button-save-main-settings" data-button="${BUTTONS.SAVE_MAIN}">Save</button>
    <button class="button--light button-default-settings" data-button="${BUTTONS.DEFAULT_MAIN}">Default</button>
  </div>

`;
}

export default getLayout;
