import React from "react";

interface NeonWorkspaceArtworkProps {
  className?: string;
}

export function NeonWorkspaceArtwork({ className = "" }: NeonWorkspaceArtworkProps) {
  return (
    <div className={`relative flex items-center justify-center w-full h-full select-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
        aria-label="Developer Workspace Neon Diagram"
      >
        <defs>
          {/* Intense Neon Cyan Glow Filter */}
          <filter id="neon-cyan" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Intense Neon Purple / Magenta Glow Filter */}
          <filter id="neon-purple" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Teal / Emerald Glow Filter */}
          <filter id="neon-teal" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Lamp Light Cone Gradient */}
          <radialGradient id="lamp-light" cx="390" cy="180" r="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#818cf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#050814" stopOpacity="0" />
          </radialGradient>

          {/* Screen Dark Gradient */}
          <linearGradient id="screen-grad" x1="550" y1="320" x2="550" y2="670" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#080e22" />
            <stop offset="100%" stopColor="#040612" />
          </linearGradient>

          {/* Ambient Desk Radial Gradient */}
          <radialGradient id="desk-ambient" cx="500" cy="650" r="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0b132b" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#050814" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020308" stopOpacity="1" />
          </radialGradient>
        </defs>

        <style>{`
          @keyframes subtlePulse {
            0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 6px #00f3ff); }
            50% { opacity: 1; filter: drop-shadow(0 0 11px #00f3ff); }
          }
          @keyframes steamWave {
            0% { transform: translateY(0px) scaleX(1); opacity: 0.7; }
            50% { transform: translateY(-7px) scaleX(1.08); opacity: 0.95; }
            100% { transform: translateY(-14px) scaleX(0.95); opacity: 0.5; }
          }
          @keyframes lampBreathe {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.55; }
          }
          .steam-anim {
            animation: steamWave 3s ease-in-out infinite alternate;
          }
          .lamp-anim {
            animation: lampBreathe 4s ease-in-out infinite;
          }
        `}</style>

        {/* Deep Dark Space Background */}
        <rect width="1000" height="1000" fill="#020307" />
        <rect width="1000" height="1000" fill="url(#desk-ambient)" />

        {/* 1. HANGING LAMP (Top Center) */}
        <g id="hanging-lamp">
          {/* Radial Light Cone shining downward */}
          <ellipse cx="390" cy="205" rx="140" ry="100" fill="url(#lamp-light)" className="lamp-anim" />
          
          {/* Ceiling Cord */}
          <line x1="390" y1="0" x2="390" y2="100" stroke="#00f3ff" strokeWidth="2.5" filter="url(#neon-cyan)" />
          
          {/* Small Top Fixture */}
          <rect x="382" y="94" width="16" height="8" rx="2" stroke="#00f3ff" strokeWidth="2" fill="#050814" filter="url(#neon-cyan)" />
          
          {/* Lamp Shade Dome */}
          <path
            d="M 322 178 C 326 122, 358 102, 390 102 C 422 102, 454 122, 458 178 Z"
            stroke="#00f3ff"
            strokeWidth="3.2"
            fill="#05091a"
            filter="url(#neon-cyan)"
          />
          {/* Outer glow stroke for the dome */}
          <path
            d="M 322 178 C 326 122, 358 102, 390 102 C 422 102, 454 122, 458 178 Z"
            stroke="#00f3ff"
            strokeWidth="1"
            fill="none"
          />

          {/* Lamp Shade Bottom Opening (Rim) */}
          <ellipse cx="390" cy="178" rx="68" ry="16" stroke="#00f3ff" strokeWidth="3" fill="#070c24" filter="url(#neon-cyan)" />
          
          {/* Glowing Purple Bulb Inside */}
          <ellipse cx="390" cy="175" rx="26" ry="11" stroke="#e879f9" strokeWidth="2.5" fill="#c084fc" filter="url(#neon-purple)" />
          <ellipse cx="390" cy="175" rx="14" ry="6" fill="#ffffff" />
        </g>

        {/* 2. POSTER ON WALL (Top Right) */}
        <g id="wall-poster">
          {/* Frame Outer Cyan Neon */}
          <rect
            x="760"
            y="50"
            width="180"
            height="250"
            rx="12"
            stroke="#00f3ff"
            strokeWidth="3.2"
            fill="#050918"
            filter="url(#neon-cyan)"
          />
          {/* Frame Inner Purple Accent */}
          <rect
            x="768"
            y="58"
            width="164"
            height="234"
            rx="8"
            stroke="#c084fc"
            strokeWidth="1.2"
            fill="none"
            opacity="0.6"
            filter="url(#neon-purple)"
          />

          {/* Text: Good Code Better You */}
          <text
            x="798"
            y="124"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="36"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
            filter="url(#neon-cyan)"
          >
            Good
          </text>
          <text
            x="798"
            y="168"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="36"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
            filter="url(#neon-cyan)"
          >
            Code
          </text>
          <text
            x="798"
            y="212"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="36"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
            filter="url(#neon-cyan)"
          >
            Better
          </text>
          <text
            x="798"
            y="256"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="36"
            fontWeight="700"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="0.5"
            filter="url(#neon-cyan)"
          >
            You
          </text>

          {/* Underline Bar beneath 'You' */}
          <line
            x1="880"
            y1="276"
            x2="924"
            y2="276"
            stroke="#00f3ff"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#neon-cyan)"
          />
        </g>

        {/* 3. BOOK STACK AND POTTED PLANT (Left) */}
        <g id="books-and-plant">
          {/* BOOK 1 (Bottom Book) */}
          <g id="book-1">
            {/* Book Spine (left curve) */}
            <path
              d="M 18 600 C 14 624, 14 644, 18 664 L 84 664 L 246 620 L 246 558 L 84 600 Z"
              stroke="#c084fc"
              strokeWidth="3"
              fill="#060918"
              filter="url(#neon-purple)"
            />
            {/* Spine Ribs */}
            <line x1="20" y1="616" x2="84" y2="616" stroke="#c084fc" strokeWidth="1.6" opacity="0.8" />
            <line x1="20" y1="648" x2="84" y2="648" stroke="#c084fc" strokeWidth="1.6" opacity="0.8" />
            {/* Pages Edge on Right */}
            <path
              d="M 84 664 L 246 620 L 246 560 L 84 600 Z"
              stroke="#00f3ff"
              strokeWidth="2"
              fill="#080e22"
              opacity="0.9"
              filter="url(#neon-cyan)"
            />
          </g>

          {/* BOOK 2 (Middle Book) */}
          <g id="book-2">
            <path
              d="M 18 534 C 14 556, 14 576, 18 596 L 84 596 L 246 552 L 246 492 L 84 534 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#060918"
              filter="url(#neon-cyan)"
            />
            {/* Spine Ribs */}
            <line x1="20" y1="550" x2="84" y2="550" stroke="#00f3ff" strokeWidth="1.6" opacity="0.8" />
            <line x1="20" y1="580" x2="84" y2="580" stroke="#00f3ff" strokeWidth="1.6" opacity="0.8" />
            {/* Pages Edge on Right */}
            <path
              d="M 84 596 L 246 552 L 246 494 L 84 534 Z"
              stroke="#c084fc"
              strokeWidth="2"
              fill="#080e22"
              opacity="0.9"
              filter="url(#neon-purple)"
            />
          </g>

          {/* BOOK 3 (Top Book where pot rests) */}
          <g id="book-3">
            <path
              d="M 22 470 C 18 492, 18 512, 22 530 L 88 530 L 250 486 L 250 428 L 88 470 Z"
              stroke="#c084fc"
              strokeWidth="3"
              fill="#060918"
              filter="url(#neon-purple)"
            />
            {/* Spine Ribs */}
            <line x1="24" y1="486" x2="88" y2="486" stroke="#c084fc" strokeWidth="1.6" opacity="0.8" />
            <line x1="24" y1="514" x2="88" y2="514" stroke="#c084fc" strokeWidth="1.6" opacity="0.8" />
            {/* Top Plane Cover */}
            <polygon
              points="22,470 88,470 250,428 184,428"
              stroke="#00f3ff"
              strokeWidth="2.2"
              fill="#080d20"
              filter="url(#neon-cyan)"
            />
          </g>

          {/* PLANT POT */}
          <g id="plant-pot">
            {/* Pot Body */}
            <path
              d="M 112 376 L 126 470 C 126 478, 208 478, 208 470 L 222 376 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#070c20"
              filter="url(#neon-cyan)"
            />
            {/* Base Ellipse */}
            <ellipse cx="167" cy="470" rx="41" ry="8" stroke="#00f3ff" strokeWidth="2.2" fill="#040714" filter="url(#neon-cyan)" />
            {/* Top Rim Ellipse */}
            <ellipse cx="167" cy="376" rx="56" ry="14" stroke="#00f3ff" strokeWidth="3" fill="#0a1028" filter="url(#neon-cyan)" />
          </g>

          {/* LUSH NEON PLANT */}
          <g id="neon-plant">
            {/* Main Center Stem */}
            <path
              d="M 167 374 Q 165 300 170 236"
              stroke="#00f3ff"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
              filter="url(#neon-cyan)"
            />

            {/* Leaf 1: Lower-Left */}
            <path
              d="M 166 354 C 130 354, 88 340, 70 324 C 88 298, 140 308, 166 334 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#061224"
              filter="url(#neon-cyan)"
            />
            <path d="M 166 344 Q 120 334 70 324" stroke="#00f3ff" strokeWidth="1.8" fill="none" filter="url(#neon-cyan)" />

            {/* Leaf 2: Upper-Left */}
            <path
              d="M 167 304 C 125 288, 84 242, 92 214 C 125 214, 155 244, 168 278 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#061224"
              filter="url(#neon-cyan)"
            />
            <path d="M 167 288 Q 130 254 92 214" stroke="#00f3ff" strokeWidth="1.8" fill="none" filter="url(#neon-cyan)" />

            {/* Leaf 3: Top-Center (Pointing up) */}
            <path
              d="M 168 248 C 144 208, 154 168, 185 158 C 215 168, 226 208, 172 248 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#061224"
              filter="url(#neon-cyan)"
            />
            <path d="M 170 248 Q 178 198 185 158" stroke="#00f3ff" strokeWidth="1.8" fill="none" filter="url(#neon-cyan)" />

            {/* Leaf 4: Upper-Right */}
            <path
              d="M 170 288 C 205 258, 255 234, 275 250 C 265 284, 225 304, 172 314 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#061224"
              filter="url(#neon-cyan)"
            />
            <path d="M 171 298 Q 225 274 275 250" stroke="#00f3ff" strokeWidth="1.8" fill="none" filter="url(#neon-cyan)" />

            {/* Leaf 5: Lower-Right */}
            <path
              d="M 168 338 C 202 322, 246 328, 252 352 C 230 374, 186 364, 168 354 Z"
              stroke="#00f3ff"
              strokeWidth="3"
              fill="#061224"
              filter="url(#neon-cyan)"
            />
            <path d="M 168 346 Q 212 344 252 352" stroke="#00f3ff" strokeWidth="1.8" fill="none" filter="url(#neon-cyan)" />
          </g>
        </g>

        {/* 4. LAPTOP (Center Main Element) */}
        <g id="laptop-center">
          {/* Laptop Base (Perspective) */}
          {/* Outer Deck with Purple Neon Stroke */}
          <path
            d="M 55 752 L 638 820 C 650 822, 662 814, 668 804 L 818 682 C 822 676, 818 670, 810 670 L 260 656 C 250 656, 242 662, 238 672 L 48 740 C 42 745, 46 752, 55 752 Z"
            stroke="#c084fc"
            strokeWidth="3.2"
            fill="#060918"
            filter="url(#neon-purple)"
          />

          {/* Inner Deck Rim with Cyan Neon Stroke */}
          <path
            d="M 66 746 L 626 810 L 798 680 L 268 664 Z"
            stroke="#00f3ff"
            strokeWidth="2.2"
            fill="#080e24"
            filter="url(#neon-cyan)"
          />

          {/* Centered Trackpad */}
          <polygon
            points="228,730 492,746 458,784 176,764"
            stroke="#00f3ff"
            strokeWidth="2.2"
            fill="#050814"
            filter="url(#neon-cyan)"
          />

          {/* Keyboard Tray Recess */}
          <polygon
            points="185,674 748,688 692,734 125,718"
            stroke="#00f3ff"
            strokeWidth="2"
            fill="#040612"
            filter="url(#neon-cyan)"
          />

          {/* Keyboard Keys in Perspective Grid */}
          <g id="keyboard-keys" stroke="#00f3ff" strokeWidth="1.5" fill="#070c20" opacity="0.9" filter="url(#neon-cyan)">
            {/* Function Row */}
            <line x1="184" y1="679" x2="740" y2="692" strokeWidth="1.2" />
            
            {/* Number Row Keys */}
            <polygon points="175,683 205,684 198,691 168,690" />
            <polygon points="212,684 242,685 235,692 205,691" />
            <polygon points="248,685 278,686 272,693 242,692" />
            <polygon points="285,686 315,687 308,694 278,693" />
            <polygon points="322,687 352,688 345,695 315,694" />
            <polygon points="358,688 388,689 382,696 352,695" />
            <polygon points="395,689 425,690 418,697 388,696" />
            <polygon points="432,690 462,691 455,698 425,697" />
            <polygon points="468,691 498,692 492,699 462,698" />
            <polygon points="505,692 535,693 528,700 498,699" />
            <polygon points="542,693 572,694 565,701 535,700" />
            <polygon points="578,694 608,695 602,702 572,701" />
            <polygon points="615,695 645,696 638,703 608,702" />
            <polygon points="652,696 730,698 722,705 645,703" />

            {/* QWERTY Row Keys */}
            <polygon points="163,694 200,695 192,703 155,702" />
            <polygon points="206,695 238,696 230,704 198,703" />
            <polygon points="244,696 276,697 268,705 236,704" />
            <polygon points="282,697 314,698 306,706 274,705" />
            <polygon points="320,698 352,699 344,707 312,706" />
            <polygon points="358,699 390,700 382,708 350,707" />
            <polygon points="396,700 428,701 420,709 388,708" />
            <polygon points="434,701 466,702 458,710 426,709" />
            <polygon points="472,702 504,703 496,711 464,710" />
            <polygon points="510,703 542,704 534,712 502,711" />
            <polygon points="548,704 580,705 572,713 540,712" />
            <polygon points="586,705 618,706 610,714 578,713" />
            <polygon points="624,706 718,708 710,716 616,714" />

            {/* ASDF Row Keys */}
            <polygon points="150,706 195,707 186,716 140,715" />
            <polygon points="202,707 236,708 227,717 193,716" />
            <polygon points="242,708 276,709 267,718 233,717" />
            <polygon points="282,709 316,710 307,719 273,718" />
            <polygon points="322,710 356,711 347,720 313,719" />
            <polygon points="362,711 396,712 387,721 353,720" />
            <polygon points="402,712 436,713 427,722 393,721" />
            <polygon points="442,713 476,714 467,723 433,722" />
            <polygon points="482,714 516,715 507,724 473,723" />
            <polygon points="522,715 556,716 547,725 513,724" />
            <polygon points="562,716 596,717 587,726 553,725" />
            <polygon points="602,717 706,719 696,728 593,726" />

            {/* Bottom Row / Spacebar */}
            <polygon points="135,719 180,720 172,729 126,728" />
            <polygon points="186,720 220,721 211,730 178,729" />
            {/* Wide Spacebar Key */}
            <polygon points="226,721 480,727 470,736 217,730" strokeWidth="2" />
            <polygon points="486,727 520,728 511,737 477,736" />
            <polygon points="526,728 560,729 551,738 517,737" />
            <polygon points="566,729 690,732 680,741 557,738" />
          </g>

          {/* Laptop Screen (Display in Perspective) */}
          <g id="laptop-screen">
            {/* Outer Cyan Screen Bezel */}
            <polygon
              points="265,308 835,322 785,672 252,658"
              stroke="#00f3ff"
              strokeWidth="4"
              fill="url(#screen-grad)"
              filter="url(#neon-cyan)"
            />

            {/* Inner Purple Screen Accent Bezel */}
            <polygon
              points="276,322 824,334 776,662 262,650"
              stroke="#c084fc"
              strokeWidth="1.6"
              fill="#060b1e"
              opacity="0.8"
              filter="url(#neon-purple)"
            />

            {/* Window Titlebar Controls */}
            {/* 3 Circular macOS-style Dots on Top-Left */}
            <circle cx="334" cy="354" r="5" stroke="#00f3ff" strokeWidth="2" fill="none" filter="url(#neon-cyan)" />
            <circle cx="354" cy="354" r="5" stroke="#00f3ff" strokeWidth="2" fill="none" filter="url(#neon-cyan)" />
            <circle cx="374" cy="354" r="5" stroke="#00f3ff" strokeWidth="2" fill="none" filter="url(#neon-cyan)" />

            {/* Action Icons on Top-Right: o + o */}
            <circle cx="715" cy="370" r="5" stroke="#00f3ff" strokeWidth="2" fill="none" filter="url(#neon-cyan)" />
            {/* Plus Icon */}
            <path d="M 742 371 L 752 371 M 747 366 L 747 376" stroke="#00f3ff" strokeWidth="2" filter="url(#neon-cyan)" />
            <circle cx="780" cy="372" r="5" stroke="#00f3ff" strokeWidth="2" fill="none" filter="url(#neon-cyan)" />

            {/* Horizontal Header Divider Line */}
            <line
              x1="300"
              y1="388"
              x2="800"
              y2="400"
              stroke="#c084fc"
              strokeWidth="1.5"
              opacity="0.5"
              filter="url(#neon-purple)"
            />

            {/* Screen Sidebar (4 Nav Items on the Left) */}
            <g id="screen-sidebar">
              {/* Item 1 */}
              <circle cx="330" cy="475" r="7" stroke="#c084fc" strokeWidth="2.5" fill="none" filter="url(#neon-purple)" />
              <line x1="350" y1="475" x2="410" y2="475" stroke="#c084fc" strokeWidth="2.8" strokeLinecap="round" filter="url(#neon-purple)" />

              {/* Item 2 */}
              <circle cx="325" cy="510" r="7" stroke="#c084fc" strokeWidth="2.5" fill="none" filter="url(#neon-purple)" />
              <line x1="345" y1="510" x2="410" y2="510" stroke="#c084fc" strokeWidth="2.8" strokeLinecap="round" filter="url(#neon-purple)" />

              {/* Item 3 */}
              <circle cx="320" cy="545" r="7" stroke="#c084fc" strokeWidth="2.5" fill="none" filter="url(#neon-purple)" />
              <line x1="340" y1="545" x2="410" y2="545" stroke="#c084fc" strokeWidth="2.8" strokeLinecap="round" filter="url(#neon-purple)" />

              {/* Item 4 */}
              <circle cx="315" cy="580" r="7" stroke="#c084fc" strokeWidth="2.5" fill="none" filter="url(#neon-purple)" />
              <line x1="335" y1="580" x2="410" y2="580" stroke="#c084fc" strokeWidth="2.8" strokeLinecap="round" filter="url(#neon-purple)" />
            </g>

            {/* Screen Main Content (Dashboard / Overview Cards) */}
            <g id="screen-main-cards">
              {/* Top Search / Metric Card */}
              <rect
                x="472"
                y="404"
                width="310"
                height="56"
                rx="10"
                stroke="#00f3ff"
                strokeWidth="2.2"
                fill="#080e24"
                filter="url(#neon-cyan)"
              />
              <line x1="492" y1="424" x2="645" y2="424" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />
              <line x1="492" y1="440" x2="590" y2="440" stroke="#00f3ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" filter="url(#neon-cyan)" />

              {/* CARD 1: Fundamental / Green-Teal Row */}
              <rect
                x="450"
                y="468"
                width="324"
                height="54"
                rx="10"
                stroke="#00f3ff"
                strokeWidth="2.2"
                fill="#070d22"
                filter="url(#neon-cyan)"
              />
              {/* Neon Green/Teal Circle Icon */}
              <circle cx="490" cy="495" r="13" stroke="#2dd4bf" strokeWidth="3" fill="#042f2e" filter="url(#neon-teal)" />
              <line x1="524" y1="490" x2="655" y2="490" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />
              <line x1="524" y1="504" x2="624" y2="504" stroke="#00f3ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" filter="url(#neon-cyan)" />
              {/* Right Status Pill */}
              <line x1="718" y1="495" x2="745" y2="495" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />

              {/* CARD 2: Intermediate / Cyan Row */}
              <rect
                x="450"
                y="528"
                width="324"
                height="54"
                rx="10"
                stroke="#00f3ff"
                strokeWidth="2.2"
                fill="#070d22"
                filter="url(#neon-cyan)"
              />
              {/* Neon Cyan Circle Icon */}
              <circle cx="490" cy="555" r="13" stroke="#00f3ff" strokeWidth="3" fill="#082f49" filter="url(#neon-cyan)" />
              <line x1="524" y1="550" x2="625" y2="550" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />
              <line x1="524" y1="564" x2="585" y2="564" stroke="#00f3ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" filter="url(#neon-cyan)" />
              {/* Right Status Pill */}
              <line x1="718" y1="555" x2="745" y2="555" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />

              {/* CARD 3: Advanced / Purple Row */}
              <rect
                x="450"
                y="588"
                width="324"
                height="54"
                rx="10"
                stroke="#00f3ff"
                strokeWidth="2.2"
                fill="#070d22"
                filter="url(#neon-cyan)"
              />
              {/* Neon Purple Circle Icon */}
              <circle cx="490" cy="615" r="13" stroke="#c084fc" strokeWidth="3" fill="#3b0764" filter="url(#neon-purple)" />
              <line x1="524" y1="610" x2="585" y2="610" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />
              <line x1="524" y1="624" x2="555" y2="624" stroke="#00f3ff" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" filter="url(#neon-cyan)" />
              {/* Right Status Pill */}
              <line x1="718" y1="615" x2="745" y2="615" stroke="#00f3ff" strokeWidth="3.2" strokeLinecap="round" filter="url(#neon-cyan)" />
            </g>
          </g>
        </g>

        {/* 5. SPIRAL NOTEBOOK AND PEN (Bottom Left) */}
        <g id="notebook-and-pen">
          {/* Angled Notebook Base (Purple Neon Border) */}
          <polygon
            points="38,804 394,834 322,976 12,940"
            stroke="#c084fc"
            strokeWidth="3.2"
            fill="#060a1a"
            filter="url(#neon-purple)"
          />
          {/* Inner Page Border (Cyan Neon Accent) */}
          <polygon
            points="54,812 378,840 312,962 26,928"
            stroke="#00f3ff"
            strokeWidth="1.5"
            fill="#080e24"
            opacity="0.8"
            filter="url(#neon-cyan)"
          />

          {/* 9 Spiral Rings along Left Edge */}
          <g stroke="#ffffff" strokeWidth="2.2" fill="none" filter="url(#neon-purple)">
            <ellipse cx="28" cy="932" rx="6" ry="14" transform="rotate(-32 28 932)" />
            <ellipse cx="42" cy="916" rx="6" ry="14" transform="rotate(-32 42 916)" />
            <ellipse cx="56" cy="900" rx="6" ry="14" transform="rotate(-32 56 900)" />
            <ellipse cx="70" cy="884" rx="6" ry="14" transform="rotate(-32 70 884)" />
            <ellipse cx="84" cy="868" rx="6" ry="14" transform="rotate(-32 84 868)" />
            <ellipse cx="98" cy="852" rx="6" ry="14" transform="rotate(-32 98 852)" />
            <ellipse cx="112" cy="836" rx="6" ry="14" transform="rotate(-32 112 836)" />
            <ellipse cx="126" cy="820" rx="6" ry="14" transform="rotate(-32 126 820)" />
          </g>

          {/* Notebook Checklist Items */}
          {/* Item 1: [] Small */}
          <rect x="126" y="836" width="22" height="22" rx="4" stroke="#ffffff" strokeWidth="2.2" fill="none" filter="url(#neon-cyan)" />
          <text
            x="170"
            y="854"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="26"
            fontFamily="system-ui, cursive, sans-serif"
            fontWeight="bold"
            filter="url(#neon-cyan)"
          >
            Small
          </text>

          {/* Item 2: [] Commits */}
          <rect x="106" y="868" width="22" height="22" rx="4" stroke="#ffffff" strokeWidth="2.2" fill="none" filter="url(#neon-cyan)" />
          <text
            x="150"
            y="886"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="26"
            fontFamily="system-ui, cursive, sans-serif"
            fontWeight="bold"
            filter="url(#neon-cyan)"
          >
            Commits
          </text>

          {/* Item 3: [X] Big Progress */}
          <rect x="86" y="900" width="22" height="22" rx="4" stroke="#ffffff" strokeWidth="2.2" fill="#042f2e" filter="url(#neon-teal)" />
          {/* Green-Cyan Checkmark */}
          <path
            d="M 89 912 L 95 918 L 107 904"
            stroke="#00f3ff"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#neon-cyan)"
          />
          <text
            x="130"
            y="918"
            fill="#ffffff"
            stroke="#00f3ff"
            strokeWidth="0.8"
            fontSize="26"
            fontFamily="system-ui, cursive, sans-serif"
            fontWeight="bold"
            filter="url(#neon-cyan)"
          >
            Big Progress
          </text>

          {/* Stylus / Pen resting next to notebook */}
          <g id="pen" filter="url(#neon-cyan)">
            {/* Pen Barrel */}
            <path
              d="M 354 964 L 460 854 L 474 868 L 368 978 Z"
              stroke="#00f3ff"
              strokeWidth="2.6"
              fill="#060918"
            />
            {/* Pen Nib */}
            <polygon points="354,964 368,978 344,984" stroke="#00f3ff" strokeWidth="2" fill="#00f3ff" />
            {/* Pen Clip (Purple) */}
            <path d="M 444 870 L 464 890" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" filter="url(#neon-purple)" />
          </g>
        </g>

        {/* 6. COFFEE MUG WITH STEAM (Bottom Right) */}
        <g id="coffee-mug">
          {/* Glowing Purple Coaster Ellipse */}
          <ellipse
            cx="890"
            cy="746"
            rx="90"
            ry="18"
            stroke="#c084fc"
            strokeWidth="3"
            fill="#060918"
            filter="url(#neon-purple)"
          />

          {/* Mug Body Cylinder */}
          <path
            d="M 830 568 L 830 710 C 830 736, 952 736, 952 710 L 952 568 Z"
            stroke="#00f3ff"
            strokeWidth="3.2"
            fill="#060b1e"
            filter="url(#neon-cyan)"
          />

          {/* Mug Rim Top Ellipse */}
          <ellipse cx="891" cy="568" rx="61" ry="15" stroke="#00f3ff" strokeWidth="3" fill="#0a122e" filter="url(#neon-cyan)" />
          {/* Coffee Liquid Surface */}
          <ellipse cx="891" cy="571" rx="53" ry="11" fill="#040612" stroke="#c084fc" strokeWidth="1" />

          {/* Mug Handle */}
          <path
            d="M 952 594 C 998 604, 998 682, 952 692"
            stroke="#00f3ff"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
            filter="url(#neon-cyan)"
          />

          {/* Steam Wisps rising from coffee */}
          <g className="steam-anim">
            {/* Steam Wisp 1 */}
            <path
              d="M 875 548 C 858 506, 892 474, 880 436"
              stroke="#00f3ff"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              filter="url(#neon-cyan)"
            />
            {/* Steam Wisp 2 */}
            <path
              d="M 915 544 C 936 502, 904 466, 924 426"
              stroke="#c084fc"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              filter="url(#neon-purple)"
            />
          </g>
        </g>

        {/* 7. COMPUTER MOUSE (Bottom Right) */}
        <g id="computer-mouse">
          {/* Ergonomic Curved Mouse Top Shell (Cyan Neon) */}
          <path
            d="M 688 854 C 684 808, 724 784, 786 784 C 848 784, 898 808, 892 854 C 886 896, 842 912, 792 912 C 742 912, 694 896, 688 854 Z"
            stroke="#00f3ff"
            strokeWidth="3.2"
            fill="#060b1e"
            filter="url(#neon-cyan)"
          />

          {/* Mouse Bottom Rim Base (Purple Neon) */}
          <path
            d="M 694 864 C 734 906, 844 906, 886 864"
            stroke="#c084fc"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            filter="url(#neon-purple)"
          />

          {/* Mouse Button Center Divider */}
          <line
            x1="786"
            y1="788"
            x2="786"
            y2="826"
            stroke="#00f3ff"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.8"
            filter="url(#neon-cyan)"
          />
        </g>
      </svg>
    </div>
  );
}
