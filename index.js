import './scss/index.scss';

/**
 * Internal dependencies
 */
import { HorizontalTransition } from "./class-horizontal-transition";
import { Intro } from './class-intro';
import { ColorShift } from './class-color-shift';
import { AncientBeings } from "./class-ancient-beings";

export const MEDIA_QUERIES = {
	isDesktop: '(min-width: 960.1px)',
	isMobile: '(max-width:  960px)',
	//reduceMotion: "(prefers-reduced-motion: reduce)", // TODO look into reduced motion preference
};

const [ firstColorShift, secondColorShift ] = document.querySelectorAll( '.has-color-shift' );
const [ firstHorizontalContainer, secondHorizontalContainer ] = document.querySelectorAll( '.has-horizontal-transition' );

/**
 * ScrollTriggers must be created in the order they appear on the page to avoid janky behavior.
 */
new Intro();
new ColorShift( firstColorShift );
new HorizontalTransition( firstHorizontalContainer );
new ColorShift( secondColorShift );
new AncientBeings();
new HorizontalTransition( secondHorizontalContainer );
