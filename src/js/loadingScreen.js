/**
 * @module Loading Window
 * @copyright Roman Zino 2016
 */

import Blackout from './blackout';

let LoadingScreen = new Blackout($('[data-el="loading-screen"]'));

window.Kvak = window.Kvak || {};
Kvak.LoadingScreen = LoadingScreen;

export default LoadingScreen;