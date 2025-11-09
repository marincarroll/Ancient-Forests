import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin( ScrollTrigger );

export class HorizontalTransition {
	constructor( element ) {
		this.element = element;
		this.pauseDuration = 0.2;

		this.timeline = this.setupTimeline();
		this.setupTweens();
	}

	setupTimeline() {
		return gsap.timeline({
			ease: "none",
			scrollTrigger: {
				trigger: this.element,
				start: 'bottom bottom',
				end: 'bottom+=150% bottom',
				pin: true,
				scrub: 1,
				snap: 1,
			}
		})
	}

	/**
	 * Tweens panels horizontally across the screen, with a brief pause after the transition.
	 */
	setupTweens() {
		this.timeline.to( this.element.children, {
			xPercent: -100,
			duration: 1 - this.pauseDuration
		} );

		// Empty tween creates pause
		this.timeline.to( {}, { duration: this.pauseDuration }, );
	}
}
