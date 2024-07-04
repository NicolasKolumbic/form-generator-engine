import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const showHideAnimation: AnimationTriggerMetadata = trigger('showHide', [
  state(
    'show',
    style({
      opacity: 1,
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
    })
  ),
  transition('show => hide', [animate('0.4s')]),
  transition('hide => show', [animate('0.4s')]),
]);
