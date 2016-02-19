/**
 * @module Loading Window
 * @copyright Roman Zino 2016
 */

import Blackout from './blackout';

let LoadingScreen = new Blackout($('[data-el="loading-screen"]'));

export default LoadingScreen;