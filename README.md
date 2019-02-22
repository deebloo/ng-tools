### IfAnimateDirective

Directive for showing and hiding elements with an enter and exit animation.
The element will wait to be removed from the view container until the exit animation is complete.

#### Attributes

| name  | type   | default  | description                                         |
| ----- | ------ | -------- | --------------------------------------------------- |
| enter | string | entering | the css class to add to the element when displaying |
| exit  | string | exiting  | the css class to add to the element when removing   |

#### Example

```TS
  @Component({
    template: `
      <button (click)="onClick()">Toggle</button>

      <p *ifAnimate="display">Hello World</p>
    `,
    styles: [
      `
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }

        @keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }

        .entering {
          animation: fadeIn .4s;
        }

        .exiting {
          animation: fadeOut .4s;
        }
      `
    ]
  })
  class AnimationComponent {
    display = true;

    onClick() {
      this.display = !this.display;
    }
  }
```
