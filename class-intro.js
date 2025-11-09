import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MEDIA_QUERIES } from "./index";

gsap.registerPlugin(ScrollTrigger);

/**
 * The introductory scroll experience.
 */
export class Intro {
	wrapper = document.querySelector( '#intro' );
	cover = this.wrapper.querySelector( '#intro .wp-block-cover' );
	content =  this.wrapper.querySelector( '#intro-content' );
	instructions = this.wrapper.querySelector( '#intro-instructions' );
	titleAnimationDuration = 1.5;

	constructor( container ) {
		this.container = container;
		this.cloneCover();
		this.setupScrollTriggers();
		this.setupAnimations();
	}

	/**
	 * Clones the cover element and append it over the content element.
	 *
	 * This will be masked and animated to create the behind-the-tree reveal effect.
	 */
	cloneCover() {
		this.clonedCover = this.cover.cloneNode( true );
		this.clonedCover.classList.add( 'cloned-cover' );
		this.content.appendChild( this.clonedCover );
	}

	/**
	 * Sets up GSAP Timelines/ScrollTriggers.
	 *
	 * One timeline pins/animates content in from the left to its initial position.
	 * The other timeline pins the cover image in the left column until the intro experience has completed.
	 */
	setupScrollTriggers() {
		ScrollTrigger.create( {
			trigger: this.wrapper,
			pin: this.instructions,
		} );

		this.titleRevealTimeline = gsap.timeline( {
			scrollTrigger:  {
				trigger: this.wrapper,
				end: '+=6000',
				toggleActions: 'play none none reverse',
				scrub: 2,
				pin: this.content,
				//fastScrollEnd: true, // May be fixing the cover flashing on reverse scroll? But who even knows anymore
				anticipatePin: 1,
				snap: {
					snapTo: 1,
					duration: 6
				}
			}
		} );

		this.animateQuoteTimeline = gsap.timeline( {
			scrollTrigger: {
				trigger: '.wp-block-pullquote',
				start: 'top top',
				end: 'top+=2000 top',
				toggleActions: 'play none none reverse',
				pin: true,
				scrub: 2,
				snap: 1
			}
		} );

		ScrollTrigger.create( {
			trigger: this.wrapper,
			end: 'bottom bottom',
			pin: this.cover,
			//anticipatePin: 1, not sure if does something
		} );
	}

	/**
	 * Sets up GSAP animations, passing media query context.
	 */
	setupAnimations() {
		gsap.matchMedia().add( MEDIA_QUERIES , (context) => {
			this.isMobile = context.conditions.isMobile;
			this.animateInstructions();
			this.animateTitle();
			this.animateImage();
			this.fadeOutImage();
			this.animateDekAndMeta();
			if( context.conditions.isDesktop ) {
				this.animateHorizontally();
			}
		}, this.wrapper );
	}

	/**
	 * Bounce the "Scroll Down" instructions and fade them out when title animation begins.
	 */
	animateInstructions() {
		this.titleRevealTimeline.to( this.instructions, {
			opacity: 0,
			duration: 0.4
		}, 0 );
	}

	/**
	 * Shifts the image's positioning from top left to bottom right and fades in decorative gradient overlays.
	 */
	animateImage() {
		this.titleRevealTimeline.to( '.wp-block-cover__image-background, .wp-block-cover__background', {
			xPercent: -50,
			yPercent: -50,
			duration: this.titleAnimationDuration
		}, 0 );

		this.titleRevealTimeline.to( '.wp-block-cover__background', {
			opacity: 0.9,
			duration: this.titleAnimationDuration
		}, 0 );
	}

	/**
	 * After the image's shifting animation, fades it out.
	 */
	fadeOutImage() {
		this.titleRevealTimeline.to( this.clonedCover, {
			autoAlpha: 0
		}, this.titleAnimationDuration );

		if( this.isMobile ) {
			this.titleRevealTimeline.to( this.cover, {
				autoAlpha: 0
			}, this.titleAnimationDuration );
		}
	}

	/**
	 *  Moves the content group (containing title/dek/meta) from far left to its initial position.
	 *  Simultaneously, moves the masked & cloned cover to keep it stationary while content group is 'revealed'
	 *  from behind it.
	 */
	animateTitle() {
		this.titleRevealTimeline.from( this.content, {
			xPercent: this.isMobile ? -100 : -200,
			yPercent: -30,
			duration: this.titleAnimationDuration,
		}, 0 );

		this.titleRevealTimeline.fromTo( this.clonedCover, {
			xPercent: 100,
			yPercent: 30,
		}, {
			xPercent: this.isMobile ? 0 : -100,
			yPercent: 0,
			duration: this.titleAnimationDuration,
		}, 0 );
	}

	/**
	 * Fades in the dek and meta.
	 */
	animateDekAndMeta() {
		this.titleRevealTimeline.from( '.is-style-dek, .meta', {
			autoAlpha: 0,
			duration: this.titleAnimationDuration / 2.5
		}, this.titleAnimationDuration );
	}

	/**
	 * On desktop, animates the pull quote from its leftward position to the center of the screen and fades out
	 * the image.
	 */
	animateHorizontally() {
		this.animateQuoteTimeline.to( '.wp-block-cover', { opacity: 0 }, 0 );
		this.animateQuoteTimeline.to( '.wp-block-pullquote', { x: '-25vw' }, 0 );
	}
}

