import {
  style,
  animate,
} from '@angular/animations';

export const hideAnimation = (currentHeight: number) => {

  return [
    style({
      opacity: 1,
      height: currentHeight
    }),
    animate('0.4s', style({
      opacity: 0,
      height: 0
    })),
  ]
}

export const showAnimation = (currentHeight: number) => {

  return [
    style({
      opacity: 0,
      height: 0
    }),
    animate('0.4s', style({
      opacity: 1,
      height: currentHeight
    })),
  ]
}
