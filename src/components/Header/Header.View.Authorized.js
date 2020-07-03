// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// router
import { onRouteChangeEvent } from 'router/RouteHandler';

// constants
import { ROUTERS } from 'router/Router.Constants';

// layout
import getLayout from './Header.Layout';

// styles
import './Header.scss';

// burger
import handleBurgerButton from './Header.BurgerMenu';

// user domain
import user from '../../domain-models/User/User';

class HeaderAuthorized extends BaseComponent {
  constructor(parent, tagName) {
    super(parent, tagName);

    this.isAuthorized = true;

    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleButtonOutClick = this.handleButtonOutClick.bind(this);
  }

  createLayout() {
    [
      this.menu,
      this.emailContainer,
      this.buttonOut,
      this.buttonBurgerMenu] = getLayout(this.isAuthorized, user.userName);

    this.component.className = 'header-authorized';

    this.component.append(
      this.menu, this.emailContainer, this.buttonOut, this.buttonBurgerMenu,
    );
  }

  addListeners() {
    this.menu.addEventListener('click', this.handleMenuClick);
    this.buttonOut.addEventListener('click', this.handleButtonOutClick);
    this.buttonBurgerMenu.addEventListener(
      'input', (event) => handleBurgerButton(event, this.menu),
    );
    document.body.addEventListener('route', (event) => this.switchActive(event));
  }

  removeListeners() {
    this.menu.removeEventListener('click', this.handleMenuClick);
    this.buttonOut.removeEventListener('click', this.handleButtonOutClick);
  }

  handleMenuClick(event) {
    onRouteChangeEvent(event, ROUTERS.MAIN);
  }

  switchActive(event) {
    const previousItem = this.menu
      .querySelector(`button[data-destination="${event.detail.previous}"]`);
    if (previousItem) {
      previousItem.classList.remove('active');
    }
    const currentItem = this.menu
      .querySelector(`button[data-destination="${event.detail.current}"]`);
    if (currentItem) {
      currentItem.classList.add('active');
    }
  }

  handleButtonOutClick(event) {
    user.logOut();
    onRouteChangeEvent(event, ROUTERS.HEADER);
  }
}

export default HeaderAuthorized;
