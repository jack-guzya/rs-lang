// views
import BaseComponent from '../../BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from '../../../router/RouteHandler';

// constants
import { ROUTERS, GAMES_ROUTES, SPEAK_IT_ROUTERS } from '../../../router/Router.Constants';

class SpeakIt extends BaseComponent {
  static get name() {
    return GAMES_ROUTES.SPEAK_IT;
  }

  createLayout() {
    this.component.innerHTML = `
      <h1>SPEAKIT</h1>
      <p>Click on the words to hear them sound.<br>
        Click on the button and speak the words into the microphone.</p>
      <div>
        <button data-destination=${SPEAK_IT_ROUTERS.SPEAK_IT_MAIN}>Start</button>
        <button data-destination=${GAMES_ROUTES.GAMES_LIST}>Back to Games</button>
      </div>
    `;
  }

  addListeners() {
    this.component.addEventListener('click', (event) => onRouteChangeEvent(event, ROUTERS.GAMES));
  }
}

export default SpeakIt;