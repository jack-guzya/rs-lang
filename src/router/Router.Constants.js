const ROUTERS = {
  HEADER: 'HEADER',
  MAIN: 'MAIN',
  GAMES: 'GAMES',
  VOCABULARY: 'VOCABULARY',
  MAIN_PAGE: 'MAIN_PAGE',
  SETTINGS: 'SETTINGS',
};

const MAIN_ROUTES = {
  MAIN_PAGE: 'MAIN_PAGE',
  GAMES: 'GAMES',
  VOCABULARY: 'VOCABULARY',
  STATISTIC: 'STATISTIC',
  PROMO: 'PROMO',
  ABOUT_TEAM: 'ABOUT_TEAM',
  SETTINGS: 'SETTINGS',
  SIGN_UP: 'SIGN_UP',
  SIGN_IN: 'SIGN_IN',
  // LOG_OUT: 'LOG_OUT',
};

const HEADER_ROUTES = {
  HEADER_AUTHORIZED: MAIN_ROUTES.MAIN_PAGE, // 'HEADER_AUTHORIZED',
  HEADER_GUEST: MAIN_ROUTES.PROMO, // 'HEADER_GUEST',
  // SIGN_UP: 'SIGN_UP',
  // SIGN_IN: 'SIGN_IN',
  // LOG_OUT: 'LOG_OUT',
};

const GAMES_ROUTES = {
  GAMES_LIST: 'GAMES_LIST',
  SPEAK_IT: 'SPEAK_IT',
  ENGLISH_PUZZLE: 'ENGLISH_PUZZLE',
  SAVANNAH: 'SAVANNAH',
  SAVANNAH_GET_READY: 'SAVANNAH_GET_READY',
  SAVANNAH_GAME: 'SAVANNAH_GAME',
  SAVANNAH_RESULT_GAME: 'SAVANNAH_RESULT_GAME',
  SPRINT: 'SPRINT',
  SPRINT_GAME: 'SPRINT_GAME',
  SPRINT_FINISH: 'SPRINT_FINISH',
  AUDIO_CHALLENGE: 'AUDIO_CHALLENGE',
  MYSTERIOUS: 'MYSTERIOUS',
};

const MAIN_PAGE_ROUTES = {
  START_MENU: 'START_MENU',
  LEARNING_WORDS: 'LEARNING_WORDS',
  NOTIFICATION: 'NOTIFICATION',
};

const SETTINGS_ROUTES = {
  MAIN: 'MAIN',
  USER: 'USER',
  REPETITION: 'REPETITION',
};

const SPEAK_IT_ROUTERS = {
  SPEAK_IT_MAIN: 'SPEAK_IT_MAIN',
};

const VOCABULARY_ROUTERS = {
  VOCABULARY_LEARNING: 'VOCABULARY_LEARNING',
  VOCABULARY_DIFFICULT: 'VOCABULARY_DIFFICULT',
  VOCABULARY_DELETED: 'VOCABULARY_DELETED',
};

const ENGLISH_PUZZLE_ROUTES = {
  ENGLISH_PUZZLE_GAME: 'ENGLISH_PUZZLE_GAME',
  ENGLISH_PUZZLE_MAIN_STATISTICS: 'ENGLISH_PUZZLE_MAIN_STATISTICS',
};

export {
  ROUTERS,
  HEADER_ROUTES,
  MAIN_ROUTES,
  GAMES_ROUTES,
  ENGLISH_PUZZLE_ROUTES,
  MAIN_PAGE_ROUTES,
  SPEAK_IT_ROUTERS,
  VOCABULARY_ROUTERS,
  SETTINGS_ROUTES,
};
