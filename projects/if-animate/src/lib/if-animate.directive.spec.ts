import { Component, ViewChild, ElementRef } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgtIfAnimateModule } from './if-animate.module';

describe('IfAnimateDirective', () => {
  @Component({
    template: `
      <button *ngtIfAnimate="open; delay: delay" #btn>Hello World</button>
    `
  })
  class AnimationComponent {
    open = true;
    delay = 0;

    @ViewChild('btn') btn: ElementRef;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgtIfAnimateModule],
      declarations: [AnimationComponent]
    });
  });

  it('should add the default class when creating a new instance of the template', () => {
    const fixture = TestBed.createComponent(AnimationComponent);
    const instance = fixture.componentInstance;

    fixture.detectChanges();

    expect(instance.btn.nativeElement.classList.contains('entering')).toBe(true);

    instance.btn.nativeElement.dispatchEvent(new Event('animationend'));

    fixture.detectChanges();

    expect(instance.btn.nativeElement.classList.contains('entering')).toBe(false);
  });

  it('should add the default class when destroying an instance', () => {
    const fixture = TestBed.createComponent(AnimationComponent);
    const instance = fixture.componentInstance;

    fixture.detectChanges();

    instance.open = false;

    fixture.detectChanges();

    expect((instance.btn.nativeElement as HTMLButtonElement).classList.contains('exiting')).toBe(
      true
    );

    instance.btn.nativeElement.dispatchEvent(new Event('animationend'));

    fixture.detectChanges();

    expect((instance.btn.nativeElement as HTMLButtonElement).classList.contains('exiting')).toBe(
      false
    );
  });

  it('should not display the template until the defined delay', fakeAsync(() => {
    const fixture = TestBed.createComponent(AnimationComponent);
    const instance = fixture.componentInstance;

    instance.delay = 1000;

    fixture.detectChanges();

    expect(instance.btn).toBeUndefined();

    tick(1000);

    fixture.detectChanges();

    expect(instance.btn).toBeDefined();
  }));
});
