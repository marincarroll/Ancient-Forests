import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

/**
 * Animation for scroll experience where text fades in/curves around the tree slice illustration.
 */
export class AncientBeings {
	constructor() {
		gsap.context( () => {
			// TODO look into reduced motion preference
			this.timeline = gsap.timeline( { scrollTrigger: this.scrollTrigger } );

			this.animateText( 'p:first-of-type' );
			this.animateCurvedText();
			this.animateText( 'p:nth-of-type(2)' );
			this.animateText( [ 'p:nth-of-type(3)', 'p:last-of-type' ] );

			this.timeline.to({}, { duration: 3.5 } ); // pause at the end
		}, this.element );
	}

	element = document.querySelector('#ancient-beings' );

	scrollTrigger = {
		trigger: this.element,
		end: '+=5000',
		scrub: 2,
		pin: true,
		// anticipatePin: 1, not sure if does anything yet
	}

	/**
	 * Rotate in curved text elements around tree slice.
	 */
	animateCurvedText() {
		const duration = 3;
		this.timeline.to( 'text:first-of-type textPath', {
			attr: { "startOffset": '0%' },
			duration
		} );

		this.timeline.to( 'text:last-of-type textPath', {
			attr: { "startOffset": '1.5%' },
			duration
		} );
	}

	/**
	 * Fade in non-curved text elements.
	 *
	 * @param {string|HTMLElement|Array} target Selector or element(s) to target.
	 */
	animateText( target ) {
		this.timeline.from( target, {
			autoAlpha: 0,
			x: '2em',
			duration: 1
		} );
	}
}

