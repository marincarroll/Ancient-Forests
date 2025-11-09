import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

/**
 *  Toggles .is-color-shifted on the element when the specified child element enters/leaves the viewport.
 */
export class ColorShift {
	constructor( element ) {
		this.timeline = gsap.timeline( {
			scrollTrigger: {
				trigger: element.querySelector( '.color-shift-trigger' ),
				onEnter: () => element.classList.add( 'is-color-shifted' ),
				onLeaveBack: () => element.classList.remove( 'is-color-shifted' ),
				start: '+=1',
			}
		} )
	}
}
