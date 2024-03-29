import React from "react";

export default function LOGO({ size = 24, color = "currentColor" }) {
	return (
		<svg width={size} height={size} viewBox="0 0 400 400">
			<g
				transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)"
				fill={color}
				stroke="none">
				<path
					d="M1608 3039 c-302 -44 -548 -291 -576 -577 l-7 -67 -66 -5 c-36 -3
                        -73 -11 -82 -19 -23 -18 -39 -84 -33 -127 l6 -34 -41 0 c-62 0 -79 -13 -79
                        -63 0 -58 11 -70 67 -76 l48 -6 2 -265 2 -265 31 -27 c27 -25 38 -28 100 -28
                        l70 0 0 -93 c0 -54 6 -115 15 -144 37 -123 149 -236 275 -274 64 -19 88 -20
                        666 -17 l599 3 68 32 c84 40 163 117 201 198 27 58 31 82 39 245 l2 45 103 5
                        c98 5 105 6 128 33 l24 28 0 265 0 264 36 0 c59 0 74 14 74 68 0 59 -12 72
                        -67 72 l-43 0 0 65 c0 57 -3 69 -25 90 -22 23 -32 25 -120 25 -82 0 -96 2
                        -101 18 -14 48 -55 110 -93 139 l-41 32 47 21 c114 50 158 113 157 225 0 52
                        -7 85 -26 130 -24 54 -48 83 -48 56 0 -21 -75 -94 -115 -112 -30 -14 -65 -19
                        -136 -19 -87 0 -115 5 -285 54 -364 104 -583 134 -776 105z m86 -805 c14 -13
                        16 -55 16 -299 0 -282 0 -284 -22 -299 -19 -14 -69 -16 -340 -16 -305 0 -319
                        1 -338 20 -19 19 -20 33 -20 297 0 243 2 279 17 295 15 17 39 18 344 18 284 0
                        330 -2 343 -16z m1318 -1 c17 -15 18 -37 18 -295 0 -265 -1 -279 -20 -298 -19
                        -19 -33 -20 -338 -20 -271 0 -321 2 -340 16 -22 15 -22 17 -22 299 0 244 2
                        286 16 299 13 14 58 16 341 16 290 0 328 -2 345 -17z"
				/>
			</g>
		</svg>
	);
}
