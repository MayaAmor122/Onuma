const ms = (d, visible) => visible
  ? {
      transformBox: 'fill-box',
      transformOrigin: '50% 50%',
      animation: `mandalaPopIn 0.55s cubic-bezier(0.32, 0.72, 0, 1) ${d}s both`,
    }
  : { opacity: 0 };

export default function WelcomeDecorationTop({ visible }) {
  return (
    <svg width="100%" viewBox="0 0 353 175" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* Mandala 1 — Pink */}
      <g style={ms(0.10, visible)}>
        <g id="t1a"><circle cx="39.7891" cy="112.739" r="2.91211" fill="#FFC8CE"/></g>
        <use href="#t1a" transform="translate(48.4286 -5.49244) rotate(20)"/>
        <use href="#t1a" transform="translate(95.8152 5.90992) rotate(40)"/>
        <use href="#t1a" transform="translate(136.444 32.8318) rotate(60)"/>
        <use href="#t1a" transform="translate(165.415 72.026) rotate(80)"/>
        <use href="#t1a" transform="translate(179.234 118.765) rotate(100)"/>
        <use href="#t1a" transform="translate(176.233 167.412) rotate(120)"/>
        <use href="#t1a" transform="translate(156.775 212.098) rotate(140)"/>
        <use href="#t1a" transform="translate(123.207 247.435) rotate(160)"/>
        <use href="#t1a" transform="translate(79.5778 269.16) rotate(180)"/>
        <use href="#t1a" transform="translate(31.1492 274.652) rotate(-160)"/>
        <use href="#t1a" transform="translate(-16.2374 263.25) rotate(-140)"/>
        <use href="#t1a" transform="translate(-56.8663 236.328) rotate(-120)"/>
        <use href="#t1a" transform="translate(-85.8372 197.134) rotate(-100)"/>
        <use href="#t1a" transform="translate(-99.6558 150.395) rotate(-80)"/>
        <use href="#t1a" transform="translate(-96.6552 101.748) rotate(-60)"/>
        <use href="#t1a" transform="translate(-77.1975 57.0616) rotate(-40)"/>
        <use href="#t1a" transform="translate(-43.6295 21.7248) rotate(-20)"/>
        <g id="t1b"><circle cx="39.7883" cy="119.644" r="1.99141" fill="#FFC8CE"/></g>
        <use href="#t1b" transform="translate(48.4284 -5.49229) rotate(20)"/>
        <use href="#t1b" transform="translate(95.8147 5.91012) rotate(40)"/>
        <use href="#t1b" transform="translate(136.443 32.832) rotate(60)"/>
        <use href="#t1b" transform="translate(165.414 72.026) rotate(80)"/>
        <use href="#t1b" transform="translate(179.232 118.765) rotate(100)"/>
        <use href="#t1b" transform="translate(176.232 167.411) rotate(120)"/>
        <use href="#t1b" transform="translate(156.774 212.098) rotate(140)"/>
        <use href="#t1b" transform="translate(123.206 247.434) rotate(160)"/>
        <use href="#t1b" transform="translate(79.5767 269.159) rotate(180)"/>
        <use href="#t1b" transform="translate(31.1484 274.651) rotate(-160)"/>
        <use href="#t1b" transform="translate(-16.2379 263.249) rotate(-140)"/>
        <use href="#t1b" transform="translate(-56.8666 236.327) rotate(-120)"/>
        <use href="#t1b" transform="translate(-85.8373 197.133) rotate(-100)"/>
        <use href="#t1b" transform="translate(-99.6556 150.394) rotate(-80)"/>
        <use href="#t1b" transform="translate(-96.655 101.747) rotate(-60)"/>
        <use href="#t1b" transform="translate(-77.1973 57.0611) rotate(-40)"/>
        <use href="#t1b" transform="translate(-43.6294 21.7246) rotate(-20)"/>
        <g id="t1c"><circle cx="39.7877" cy="124.673" r="1.32093" fill="#FFC8CE"/></g>
        <use href="#t1c" transform="translate(41.4358 -5.74859) rotate(17.1429)"/>
        <use href="#t1c" transform="translate(82.7251 0.971633) rotate(34.2857)"/>
        <use href="#t1c" transform="translate(120.199 19.5635) rotate(51.4286)"/>
        <use href="#t1c" transform="translate(150.528 48.3752) rotate(68.5714)"/>
        <use href="#t1c" transform="translate(171.018 84.8465) rotate(85.7143)"/>
        <use href="#t1c" transform="translate(179.847 125.737) rotate(102.857)"/>
        <use href="#t1c" transform="translate(176.231 167.413) rotate(120)"/>
        <use href="#t1c" transform="translate(160.492 206.172) rotate(137.143)"/>
        <use href="#t1c" transform="translate(134.027 238.569) rotate(154.286)"/>
        <use href="#t1c" transform="translate(99.1888 261.727) rotate(171.429)"/>
        <use href="#t1c" transform="translate(59.0726 273.587) rotate(-171.429)"/>
        <use href="#t1c" transform="translate(17.2429 273.095) rotate(-154.286)"/>
        <use href="#t1c" transform="translate(-22.5837 260.296) rotate(-137.143)"/>
        <use href="#t1c" transform="translate(-56.8683 236.327) rotate(-120)"/>
        <use href="#t1c" transform="translate(-82.5646 203.317) rotate(-102.857)"/>
        <use href="#t1c" transform="translate(-97.3894 164.199) rotate(-85.7143)"/>
        <use href="#t1c" transform="translate(-100.025 122.45) rotate(-68.5714)"/>
        <use href="#t1c" transform="translate(-90.2384 81.7779) rotate(-51.4286)"/>
        <use href="#t1c" transform="translate(-68.898 45.7979) rotate(-34.2857)"/>
        <use href="#t1c" transform="translate(-37.9004 17.7066) rotate(-17.1428)"/>
        <g id="t1d"><circle cx="39.788" cy="128.864" r="0.762088" fill="#FFC8CE"/></g>
        <use href="#t1d" transform="translate(33.3631 -5.61127) rotate(13.8462)"/>
        <use href="#t1d" transform="translate(67.0996 -3.07517) rotate(27.6923)"/>
        <use href="#t1d" transform="translate(99.2489 7.46091) rotate(41.5385)"/>
        <use href="#t1d" transform="translate(127.943 25.3847) rotate(55.3846)"/>
        <use href="#t1d" transform="translate(151.513 49.6544) rotate(69.2308)"/>
        <use href="#t1d" transform="translate(168.59 78.8597) rotate(83.0769)"/>
        <use href="#t1d" transform="translate(178.182 111.303) rotate(96.9231)"/>
        <use href="#t1d" transform="translate(179.731 145.099) rotate(110.769)"/>
        <use href="#t1d" transform="translate(173.147 178.284) rotate(124.615)"/>
        <use href="#t1d" transform="translate(158.812 208.929) rotate(138.462)"/>
        <use href="#t1d" transform="translate(137.561 235.253) rotate(152.308)"/>
        <use href="#t1d" transform="translate(110.627 255.726) rotate(166.154)"/>
        <use href="#t1d" transform="translate(79.5761 269.159) rotate(180)"/>
        <use href="#t1d" transform="translate(46.213 274.77) rotate(-166.154)"/>
        <use href="#t1d" transform="translate(12.4765 272.234) rotate(-152.308)"/>
        <use href="#t1d" transform="translate(-19.6728 261.698) rotate(-138.462)"/>
        <use href="#t1d" transform="translate(-48.3664 243.774) rotate(-124.615)"/>
        <use href="#t1d" transform="translate(-71.9368 219.504) rotate(-110.769)"/>
        <use href="#t1d" transform="translate(-89.0142 190.299) rotate(-96.9231)"/>
        <use href="#t1d" transform="translate(-98.606 157.856) rotate(-83.0769)"/>
        <use href="#t1d" transform="translate(-100.155 124.059) rotate(-69.2308)"/>
        <use href="#t1d" transform="translate(-93.5708 90.8745) rotate(-55.3846)"/>
        <use href="#t1d" transform="translate(-79.2364 60.2296) rotate(-41.5385)"/>
        <use href="#t1d" transform="translate(-57.9847 33.9057) rotate(-27.6923)"/>
        <use href="#t1d" transform="translate(-31.0508 13.4325) rotate(-13.8461)"/>
        <g id="t1e"><circle cx="39.7878" cy="101.412" r="6.1423" fill="#FFC8CE"/></g>
        <use href="#t1e" transform="translate(95.8152 5.91081) rotate(40)"/>
        <use href="#t1e" transform="translate(165.415 72.0276) rotate(80)"/>
        <use href="#t1e" transform="translate(176.232 167.414) rotate(120)"/>
        <use href="#t1e" transform="translate(123.205 247.437) rotate(160)"/>
        <use href="#t1e" transform="translate(31.1467 274.653) rotate(-160)"/>
        <use href="#t1e" transform="translate(-56.8686 236.328) rotate(-120)"/>
        <use href="#t1e" transform="translate(-99.6573 150.394) rotate(-80)"/>
        <use href="#t1e" transform="translate(-77.1981 57.0609) rotate(-40)"/>
      </g>

      {/* Mandala 2 — Light Blue */}
      <g style={ms(0.25, visible)}>
        <g id="t2a"><circle cx="221.365" cy="112.262" r="2.91211" fill="#B6CDFF"/></g>
        <use href="#t2a" transform="translate(59.2158 -67.6237) rotate(20)"/>
        <use href="#t2a" transform="translate(137.989 -110.916) rotate(40)"/>
        <use href="#t2a" transform="translate(226.819 -124.656) rotate(60)"/>
        <use href="#t2a" transform="translate(314.991 -107.185) rotate(80)"/>
        <use href="#t2a" transform="translate(391.87 -60.6118) rotate(100)"/>
        <use href="#t2a" transform="translate(448.184 9.44715) rotate(120)"/>
        <use href="#t2a" transform="translate(477.139 94.5414) rotate(140)"/>
        <use href="#t2a" transform="translate(475.245 184.407) rotate(160)"/>
        <use href="#t2a" transform="translate(442.729 268.206) rotate(180)"/>
        <use href="#t2a" transform="translate(383.513 335.83) rotate(-160)"/>
        <use href="#t2a" transform="translate(304.74 379.122) rotate(-140)"/>
        <use href="#t2a" transform="translate(215.91 392.862) rotate(-120)"/>
        <use href="#t2a" transform="translate(127.738 375.391) rotate(-100)"/>
        <use href="#t2a" transform="translate(50.8594 328.818) rotate(-80)"/>
        <use href="#t2a" transform="translate(-5.45429 258.759) rotate(-60)"/>
        <use href="#t2a" transform="translate(-34.4103 173.665) rotate(-40)"/>
        <use href="#t2a" transform="translate(-32.516 83.7986) rotate(-20)"/>
        <g id="t2b"><circle cx="221.363" cy="119.167" r="1.99141" fill="#B6CDFF"/></g>
        <use href="#t2b" transform="translate(59.2156 -67.6234) rotate(20)"/>
        <use href="#t2b" transform="translate(137.989 -110.916) rotate(40)"/>
        <use href="#t2b" transform="translate(226.818 -124.655) rotate(60)"/>
        <use href="#t2b" transform="translate(314.989 -107.185) rotate(80)"/>
        <use href="#t2b" transform="translate(391.868 -60.6115) rotate(100)"/>
        <use href="#t2b" transform="translate(448.181 9.44713) rotate(120)"/>
        <use href="#t2b" transform="translate(477.137 94.541) rotate(140)"/>
        <use href="#t2b" transform="translate(475.243 184.407) rotate(160)"/>
        <use href="#t2b" transform="translate(442.727 268.205) rotate(180)"/>
        <use href="#t2b" transform="translate(383.512 335.828) rotate(-160)"/>
        <use href="#t2b" transform="translate(304.739 379.121) rotate(-140)"/>
        <use href="#t2b" transform="translate(215.909 392.86) rotate(-120)"/>
        <use href="#t2b" transform="translate(127.738 375.39) rotate(-100)"/>
        <use href="#t2b" transform="translate(50.8591 328.816) rotate(-80)"/>
        <use href="#t2b" transform="translate(-5.45429 258.758) rotate(-60)"/>
        <use href="#t2b" transform="translate(-34.4101 173.664) rotate(-40)"/>
        <use href="#t2b" transform="translate(-32.5159 83.7982) rotate(-20)"/>
        <g id="t2c"><circle cx="221.363" cy="124.196" r="1.32093" fill="#B6CDFF"/></g>
        <use href="#t2c" transform="translate(49.362 -59.2901) rotate(17.1429)"/>
        <use href="#t2c" transform="translate(114.007 -101.396) rotate(34.2857)"/>
        <use href="#t2c" transform="translate(188.191 -122.577) rotate(51.4286)"/>
        <use href="#t2c" transform="translate(265.323 -120.951) rotate(68.5714)"/>
        <use href="#t2c" transform="translate(338.548 -96.6627) rotate(85.7143)"/>
        <use href="#t2c" transform="translate(401.361 -51.8694) rotate(102.857)"/>
        <use href="#t2c" transform="translate(448.181 9.4483) rotate(120)"/>
        <use href="#t2c" transform="translate(474.847 81.8421) rotate(137.143)"/>
        <use href="#t2c" transform="translate(478.989 158.88) rotate(154.286)"/>
        <use href="#t2c" transform="translate(460.24 233.715) rotate(171.429)"/>
        <use href="#t2c" transform="translate(420.266 299.7) rotate(-171.429)"/>
        <use href="#t2c" transform="translate(362.619 350.971) rotate(-154.286)"/>
        <use href="#t2c" transform="translate(292.42 382.972) rotate(-137.143)"/>
        <use href="#t2c" transform="translate(215.908 392.86) rotate(-120)"/>
        <use href="#t2c" transform="translate(139.88 379.756) rotate(-102.857)"/>
        <use href="#t2c" transform="translate(71.0926 344.825) rotate(-85.7143)"/>
        <use href="#t2c" transform="translate(15.6572 291.171) rotate(-68.5714)"/>
        <use href="#t2c" transform="translate(-21.5004 223.56) rotate(-51.4286)"/>
        <use href="#t2c" transform="translate(-37.0785 148) rotate(-34.2857)"/>
        <use href="#t2c" transform="translate(-29.6929 71.2056) rotate(-17.1428)"/>
        <g id="t2d"><circle cx="221.363" cy="128.387" r="0.762088" fill="#B6CDFF"/></g>
        <use href="#t2d" transform="translate(38.5252 -49.0789) rotate(13.8462)"/>
        <use href="#t2d" transform="translate(87.6763 -87.512) rotate(27.6923)"/>
        <use href="#t2d" transform="translate(144.597 -113.066) rotate(41.5385)"/>
        <use href="#t2d" transform="translate(205.979 -124.255) rotate(55.3846)"/>
        <use href="#t2d" transform="translate(268.255 -120.429) rotate(69.2308)"/>
        <use href="#t2d" transform="translate(327.805 -101.811) rotate(83.0769)"/>
        <use href="#t2d" transform="translate(381.17 -69.4826) rotate(96.9231)"/>
        <use href="#t2d" transform="translate(425.248 -25.3225) rotate(110.769)"/>
        <use href="#t2d" transform="translate(457.476 28.1028) rotate(124.615)"/>
        <use href="#t2d" transform="translate(475.982 87.6885) rotate(138.462)"/>
        <use href="#t2d" transform="translate(479.691 149.971) rotate(152.308)"/>
        <use href="#t2d" transform="translate(468.387 211.332) rotate(166.154)"/>
        <use href="#t2d" transform="translate(442.726 268.205) rotate(180)"/>
        <use href="#t2d" transform="translate(404.201 317.284) rotate(-166.154)"/>
        <use href="#t2d" transform="translate(355.05 355.717) rotate(-152.308)"/>
        <use href="#t2d" transform="translate(298.13 381.27) rotate(-138.462)"/>
        <use href="#t2d" transform="translate(236.748 392.46) rotate(-124.615)"/>
        <use href="#t2d" transform="translate(174.472 388.634) rotate(-110.769)"/>
        <use href="#t2d" transform="translate(114.921 370.016) rotate(-96.9231)"/>
        <use href="#t2d" transform="translate(61.5562 337.687) rotate(-83.0769)"/>
        <use href="#t2d" transform="translate(17.4789 293.527) rotate(-69.2308)"/>
        <use href="#t2d" transform="translate(-14.7495 240.102) rotate(-55.3846)"/>
        <use href="#t2d" transform="translate(-33.2558 180.516) rotate(-41.5385)"/>
        <use href="#t2d" transform="translate(-36.9647 118.233) rotate(-27.6923)"/>
        <use href="#t2d" transform="translate(-25.6604 56.8724) rotate(-13.8461)"/>
        <g id="t2e"><circle cx="221.363" cy="100.935" r="6.1423" fill="#B6CDFF"/></g>
        <use href="#t2e" transform="translate(137.989 -110.915) rotate(40)"/>
        <use href="#t2e" transform="translate(314.99 -107.184) rotate(80)"/>
        <use href="#t2e" transform="translate(448.182 9.44898) rotate(120)"/>
        <use href="#t2e" transform="translate(475.243 184.409) rotate(160)"/>
        <use href="#t2e" transform="translate(383.511 335.83) rotate(-160)"/>
        <use href="#t2e" transform="translate(215.908 392.862) rotate(-120)"/>
        <use href="#t2e" transform="translate(50.8579 328.817) rotate(-80)"/>
        <use href="#t2e" transform="translate(-34.4109 173.664) rotate(-40)"/>
      </g>

      {/* Mandala 3 — Navy */}
      <g style={ms(0.40, visible)}>
        <g id="t3a"><circle cx="130.799" cy="18.4235" r="2.91211" fill="#183497"/></g>
        <use href="#t3a" transform="translate(21.6593 -42.3075) rotate(20)"/>
        <use href="#t3a" transform="translate(56.4825 -74.6557) rotate(40)"/>
        <use href="#t3a" transform="translate(100.269 -93.1428) rotate(60)"/>
        <use href="#t3a" transform="translate(147.738 -95.5391) rotate(80)"/>
        <use href="#t3a" transform="translate(193.164 -81.5554) rotate(100)"/>
        <use href="#t3a" transform="translate(231.068 -52.8785) rotate(120)"/>
        <use href="#t3a" transform="translate(256.878 -12.9672) rotate(140)"/>
        <use href="#t3a" transform="translate(267.48 33.3646) rotate(160)"/>
        <use href="#t3a" transform="translate(261.597 80.5286) rotate(180)"/>
        <use href="#t3a" transform="translate(239.938 122.836) rotate(-160)"/>
        <use href="#t3a" transform="translate(205.115 155.184) rotate(-140)"/>
        <use href="#t3a" transform="translate(161.328 173.671) rotate(-120)"/>
        <use href="#t3a" transform="translate(113.859 176.068) rotate(-100)"/>
        <use href="#t3a" transform="translate(68.4331 162.084) rotate(-80)"/>
        <use href="#t3a" transform="translate(30.5294 133.407) rotate(-60)"/>
        <use href="#t3a" transform="translate(4.71968 93.4959) rotate(-40)"/>
        <use href="#t3a" transform="translate(-5.88308 47.164) rotate(-20)"/>
        <g id="t3b"><circle cx="130.798" cy="25.3282" r="1.99141" fill="#183497"/></g>
        <use href="#t3b" transform="translate(21.6591 -42.3074) rotate(20)"/>
        <use href="#t3b" transform="translate(56.482 -74.6555) rotate(40)"/>
        <use href="#t3b" transform="translate(100.269 -93.1426) rotate(60)"/>
        <use href="#t3b" transform="translate(147.737 -95.539) rotate(80)"/>
        <use href="#t3b" transform="translate(193.163 -81.5555) rotate(100)"/>
        <use href="#t3b" transform="translate(231.067 -52.8788) rotate(120)"/>
        <use href="#t3b" transform="translate(256.876 -12.9678) rotate(140)"/>
        <use href="#t3b" transform="translate(267.479 33.3637) rotate(160)"/>
        <use href="#t3b" transform="translate(261.596 80.5275) rotate(180)"/>
        <use href="#t3b" transform="translate(239.937 122.835) rotate(-160)"/>
        <use href="#t3b" transform="translate(205.114 155.183) rotate(-140)"/>
        <use href="#t3b" transform="translate(161.328 173.67) rotate(-120)"/>
        <use href="#t3b" transform="translate(113.859 176.067) rotate(-100)"/>
        <use href="#t3b" transform="translate(68.4332 162.083) rotate(-80)"/>
        <use href="#t3b" transform="translate(30.5296 133.406) rotate(-60)"/>
        <use href="#t3b" transform="translate(4.71991 93.4954) rotate(-40)"/>
        <use href="#t3b" transform="translate(-5.88293 47.1638) rotate(-20)"/>
        <g id="t3c"><circle cx="130.796" cy="30.3574" r="1.32093" fill="#183497"/></g>
        <use href="#t3c" transform="translate(17.679 -36.764) rotate(17.1429)"/>
        <use href="#t3c" transform="translate(45.409 -66.6837) rotate(34.2857)"/>
        <use href="#t3c" transform="translate(80.726 -87.1005) rotate(51.4286)"/>
        <use href="#t3c" transform="translate(120.492 -96.2005) rotate(68.5714)"/>
        <use href="#t3c" transform="translate(161.173 -93.1749) rotate(85.7143)"/>
        <use href="#t3c" transform="translate(199.156 -78.2927) rotate(102.857)"/>
        <use href="#t3c" transform="translate(231.064 -52.8761) rotate(120)"/>
        <use href="#t3c" transform="translate(254.063 -19.1836) rotate(137.143)"/>
        <use href="#t3c" transform="translate(266.109 19.7911) rotate(154.286)"/>
        <use href="#t3c" transform="translate(266.132 60.5849) rotate(171.429)"/>
        <use href="#t3c" transform="translate(254.13 99.5732) rotate(-171.429)"/>
        <use href="#t3c" transform="translate(231.169 133.292) rotate(-154.286)"/>
        <use href="#t3c" transform="translate(199.29 158.744) rotate(-137.143)"/>
        <use href="#t3c" transform="translate(161.324 173.669) rotate(-120)"/>
        <use href="#t3c" transform="translate(120.646 176.741) rotate(-102.857)"/>
        <use href="#t3c" transform="translate(80.8698 167.686) rotate(-85.7143)"/>
        <use href="#t3c" transform="translate(45.5298 147.309) rotate(-68.5714)"/>
        <use href="#t3c" transform="translate(17.7661 117.42) rotate(-51.4286)"/>
        <use href="#t3c" transform="translate(0.045549 80.6764) rotate(-34.2857)"/>
        <use href="#t3c" transform="translate(-6.05723 40.3416) rotate(-17.1428)"/>
        <g id="t3d"><circle cx="130.796" cy="34.5482" r="0.762088" fill="#183497"/></g>
        <use href="#t3d" transform="translate(13.4365 -30.1315) rotate(13.8462)"/>
        <use href="#t3d" transform="translate(33.6934 -56.1719) rotate(27.6923)"/>
        <use href="#t3d" transform="translate(59.5936 -76.6078) rotate(41.5385)"/>
        <use href="#t3d" transform="translate(89.6318 -90.2515) rotate(55.3846)"/>
        <use href="#t3d" transform="translate(122.062 -96.3102) rotate(69.2308)"/>
        <use href="#t3d" transform="translate(155 -94.4317) rotate(83.0769)"/>
        <use href="#t3d" transform="translate(186.532 -84.7251) rotate(96.9231)"/>
        <use href="#t3d" transform="translate(214.824 -67.7547) rotate(110.769)"/>
        <use href="#t3d" transform="translate(238.233 -44.5066) rotate(124.615)"/>
        <use href="#t3d" transform="translate(255.398 -16.332) rotate(138.462)"/>
        <use href="#t3d" transform="translate(265.321 15.1318) rotate(152.308)"/>
        <use href="#t3d" transform="translate(267.427 48.0561) rotate(166.154)"/>
        <use href="#t3d" transform="translate(261.592 80.5276) rotate(180)"/>
        <use href="#t3d" transform="translate(248.155 110.659) rotate(-166.154)"/>
        <use href="#t3d" transform="translate(227.898 136.699) rotate(-152.308)"/>
        <use href="#t3d" transform="translate(201.998 157.135) rotate(-138.462)"/>
        <use href="#t3d" transform="translate(171.96 170.779) rotate(-124.615)"/>
        <use href="#t3d" transform="translate(139.529 176.838) rotate(-110.769)"/>
        <use href="#t3d" transform="translate(106.591 174.959) rotate(-96.9231)"/>
        <use href="#t3d" transform="translate(75.0599 165.253) rotate(-83.0769)"/>
        <use href="#t3d" transform="translate(46.7677 148.282) rotate(-69.2308)"/>
        <use href="#t3d" transform="translate(23.3589 125.034) rotate(-55.3846)"/>
        <use href="#t3d" transform="translate(6.19391 96.8596) rotate(-41.5385)"/>
        <use href="#t3d" transform="translate(-3.72965 65.3958) rotate(-27.6923)"/>
        <use href="#t3d" transform="translate(-5.83507 32.4715) rotate(-13.8461)"/>
        <g id="t3e"><circle cx="130.798" cy="7.09628" r="6.1423" fill="#183497"/></g>
        <use href="#t3e" transform="translate(56.4824 -74.6548) rotate(40)"/>
        <use href="#t3e" transform="translate(147.738 -95.5376) rotate(80)"/>
        <use href="#t3e" transform="translate(231.066 -52.8769) rotate(120)"/>
        <use href="#t3e" transform="translate(267.478 33.3657) rotate(160)"/>
        <use href="#t3e" transform="translate(239.936 122.836) rotate(-160)"/>
        <use href="#t3e" transform="translate(161.326 173.671) rotate(-120)"/>
        <use href="#t3e" transform="translate(68.4318 162.083) rotate(-80)"/>
        <use href="#t3e" transform="translate(4.71916 93.4952) rotate(-40)"/>
      </g>

      {/* Mandala 4 — Yellow */}
      <g style={ms(0.55, visible)}>
        <g id="t4a"><circle cx="312.819" cy="111.785" r="2.91211" fill="#FFDC60"/></g>
        <use href="#t4a" transform="translate(64.568 -98.9317) rotate(20)"/>
        <use href="#t4a" transform="translate(159.079 -169.813) rotate(40)"/>
        <use href="#t4a" transform="translate(272.133 -204.096) rotate(60)"/>
        <use href="#t4a" transform="translate(390.094 -197.644) rotate(80)"/>
        <use href="#t4a" transform="translate(498.735 -151.236) rotate(100)"/>
        <use href="#t4a" transform="translate(584.952 -70.47) rotate(120)"/>
        <use href="#t4a" transform="translate(638.345 34.9134) rotate(140)"/>
        <use href="#t4a" transform="translate(652.475 152.203) rotate(160)"/>
        <use href="#t4a" transform="translate(625.637 267.252) rotate(180)"/>
        <use href="#t4a" transform="translate(561.069 366.184) rotate(-160)"/>
        <use href="#t4a" transform="translate(466.559 437.065) rotate(-140)"/>
        <use href="#t4a" transform="translate(353.505 471.348) rotate(-120)"/>
        <use href="#t4a" transform="translate(235.543 464.896) rotate(-100)"/>
        <use href="#t4a" transform="translate(126.902 418.488) rotate(-80)"/>
        <use href="#t4a" transform="translate(40.6859 337.722) rotate(-60)"/>
        <use href="#t4a" transform="translate(-12.7074 232.339) rotate(-40)"/>
        <use href="#t4a" transform="translate(-26.8375 115.049) rotate(-20)"/>
        <g id="t4b"><circle cx="312.818" cy="118.69" r="1.99141" fill="#FFDC60"/></g>
        <use href="#t4b" transform="translate(64.5678 -98.9315) rotate(20)"/>
        <use href="#t4b" transform="translate(159.078 -169.813) rotate(40)"/>
        <use href="#t4b" transform="translate(272.132 -204.096) rotate(60)"/>
        <use href="#t4b" transform="translate(390.093 -197.644) rotate(80)"/>
        <use href="#t4b" transform="translate(498.734 -151.237) rotate(100)"/>
        <use href="#t4b" transform="translate(584.95 -70.4703) rotate(120)"/>
        <use href="#t4b" transform="translate(638.344 34.9128) rotate(140)"/>
        <use href="#t4b" transform="translate(652.474 152.202) rotate(160)"/>
        <use href="#t4b" transform="translate(625.636 267.251) rotate(180)"/>
        <use href="#t4b" transform="translate(561.069 366.182) rotate(-160)"/>
        <use href="#t4b" transform="translate(466.558 437.064) rotate(-140)"/>
        <use href="#t4b" transform="translate(353.504 471.347) rotate(-120)"/>
        <use href="#t4b" transform="translate(235.543 464.895) rotate(-100)"/>
        <use href="#t4b" transform="translate(126.903 418.487) rotate(-80)"/>
        <use href="#t4b" transform="translate(40.6861 337.721) rotate(-60)"/>
        <use href="#t4b" transform="translate(-12.7072 232.338) rotate(-40)"/>
        <use href="#t4b" transform="translate(-26.8373 115.049) rotate(-20)"/>
        <g id="t4c"><circle cx="312.816" cy="123.719" r="1.32093" fill="#FFDC60"/></g>
        <use href="#t4c" transform="translate(53.2845 -86.2675) rotate(17.1429)"/>
        <use href="#t4c" transform="translate(129.629 -152.997) rotate(34.2857)"/>
        <use href="#t4c" transform="translate(222.251 -194.258) rotate(51.4286)"/>
        <use href="#t4c" transform="translate(322.92 -206.385) rotate(68.5714)"/>
        <use href="#t4c" transform="translate(422.692 -188.301) rotate(85.7143)"/>
        <use href="#t4c" transform="translate(512.7 -141.613) rotate(102.857)"/>
        <use href="#t4c" transform="translate(584.948 -70.4677) rotate(120)"/>
        <use href="#t4c" transform="translate(633.015 18.8118) rotate(137.143)"/>
        <use href="#t4c" transform="translate(652.632 118.293) rotate(154.286)"/>
        <use href="#t4c" transform="translate(642.054 219.137) rotate(171.429)"/>
        <use href="#t4c" transform="translate(602.222 312.382) rotate(-171.429)"/>
        <use href="#t4c" transform="translate(536.675 389.745) rotate(-154.286)"/>
        <use href="#t4c" transform="translate(451.238 444.35) rotate(-137.143)"/>
        <use href="#t4c" transform="translate(353.501 471.346) rotate(-120)"/>
        <use href="#t4c" transform="translate(252.148 468.334) rotate(-102.857)"/>
        <use href="#t4c" transform="translate(156.187 435.581) rotate(-85.7143)"/>
        <use href="#t4c" transform="translate(74.1426 375.999) rotate(-68.5714)"/>
        <use href="#t4c" transform="translate(13.3054 294.881) rotate(-51.4286)"/>
        <use href="#t4c" transform="translate(-20.9189 199.435) rotate(-34.2857)"/>
        <use href="#t4c" transform="translate(-25.4894 98.1407) rotate(-17.1428)"/>
        <g id="t4d"><circle cx="312.816" cy="127.91" r="0.762088" fill="#FFDC60"/></g>
        <use href="#t4d" transform="translate(41.0685 -70.9788) rotate(13.8462)"/>
        <use href="#t4d" transform="translate(97.93 -130.067) rotate(27.6923)"/>
        <use href="#t4d" transform="translate(167.28 -173.83) rotate(41.5385)"/>
        <use href="#t4d" transform="translate(245.088 -199.725) rotate(55.3846)"/>
        <use href="#t4d" transform="translate(326.832 -206.247) rotate(69.2308)"/>
        <use href="#t4d" transform="translate(407.761 -193.016) rotate(83.0769)"/>
        <use href="#t4d" transform="translate(483.173 -160.803) rotate(96.9231)"/>
        <use href="#t4d" transform="translate(548.684 -111.478) rotate(110.769)"/>
        <use href="#t4d" transform="translate(600.487 -47.9092) rotate(124.615)"/>
        <use href="#t4d" transform="translate(635.572 26.2101) rotate(138.462)"/>
        <use href="#t4d" transform="translate(651.899 106.572) rotate(152.308)"/>
        <use href="#t4d" transform="translate(648.521 188.506) rotate(166.154)"/>
        <use href="#t4d" transform="translate(625.632 267.251) rotate(180)"/>
        <use href="#t4d" transform="translate(584.563 338.23) rotate(-166.154)"/>
        <use href="#t4d" transform="translate(527.702 397.318) rotate(-152.308)"/>
        <use href="#t4d" transform="translate(458.352 441.081) rotate(-138.462)"/>
        <use href="#t4d" transform="translate(380.544 466.976) rotate(-124.615)"/>
        <use href="#t4d" transform="translate(298.8 473.498) rotate(-110.769)"/>
        <use href="#t4d" transform="translate(217.871 460.267) rotate(-96.9231)"/>
        <use href="#t4d" transform="translate(142.459 428.054) rotate(-83.0769)"/>
        <use href="#t4d" transform="translate(76.948 378.729) rotate(-69.2308)"/>
        <use href="#t4d" transform="translate(25.1447 315.16) rotate(-55.3846)"/>
        <use href="#t4d" transform="translate(-9.94018 241.041) rotate(-41.5385)"/>
        <use href="#t4d" transform="translate(-26.2676 160.679) rotate(-27.6923)"/>
        <use href="#t4d" transform="translate(-22.8888 78.7446) rotate(-13.8461)"/>
        <g id="t4e"><circle cx="312.818" cy="100.458" r="6.1423" fill="#FFDC60"/></g>
        <use href="#t4e" transform="translate(159.079 -169.813) rotate(40)"/>
        <use href="#t4e" transform="translate(390.094 -197.643) rotate(80)"/>
        <use href="#t4e" transform="translate(584.95 -70.4681) rotate(120)"/>
        <use href="#t4e" transform="translate(652.473 152.204) rotate(160)"/>
        <use href="#t4e" transform="translate(561.067 366.184) rotate(-160)"/>
        <use href="#t4e" transform="translate(353.502 471.348) rotate(-120)"/>
        <use href="#t4e" transform="translate(126.901 418.488) rotate(-80)"/>
        <use href="#t4e" transform="translate(-12.7081 232.338) rotate(-40)"/>
      </g>

      {/* Mandala 5 — Green */}
      <g style={ms(0.70, visible)}>
        <g id="t5a"><circle cx="312.817" cy="17.9465" r="2.91211" fill="#00BE4A"/></g>
        <use href="#t5a" transform="translate(32.4733 -104.59) rotate(20)"/>
        <use href="#t5a" transform="translate(98.7601 -191.767) rotate(40)"/>
        <use href="#t5a" transform="translate(190.865 -251.014) rotate(60)"/>
        <use href="#t5a" transform="translate(297.68 -275.187) rotate(80)"/>
        <use href="#t5a" transform="translate(406.32 -261.369) rotate(100)"/>
        <use href="#t5a" transform="translate(503.683 -211.227) rotate(120)"/>
        <use href="#t5a" transform="translate(578.024 -130.809) rotate(140)"/>
        <use href="#t5a" transform="translate(620.377 -29.8146) rotate(160)"/>
        <use href="#t5a" transform="translate(625.634 79.5746) rotate(180)"/>
        <use href="#t5a" transform="translate(593.161 184.165) rotate(-160)"/>
        <use href="#t5a" transform="translate(526.874 271.341) rotate(-140)"/>
        <use href="#t5a" transform="translate(434.769 330.589) rotate(-120)"/>
        <use href="#t5a" transform="translate(327.954 354.761) rotate(-100)"/>
        <use href="#t5a" transform="translate(219.314 340.943) rotate(-80)"/>
        <use href="#t5a" transform="translate(121.952 290.801) rotate(-60)"/>
        <use href="#t5a" transform="translate(47.6106 210.384) rotate(-40)"/>
        <use href="#t5a" transform="translate(5.25714 109.389) rotate(-20)"/>
        <g id="t5b"><circle cx="312.817" cy="24.8512" r="1.99141" fill="#00BE4A"/></g>
        <use href="#t5b" transform="translate(32.473 -104.59) rotate(20)"/>
        <use href="#t5b" transform="translate(98.7597 -191.767) rotate(40)"/>
        <use href="#t5b" transform="translate(190.865 -251.014) rotate(60)"/>
        <use href="#t5b" transform="translate(297.679 -275.187) rotate(80)"/>
        <use href="#t5b" transform="translate(406.32 -261.369) rotate(100)"/>
        <use href="#t5b" transform="translate(503.682 -211.228) rotate(120)"/>
        <use href="#t5b" transform="translate(578.023 -130.81) rotate(140)"/>
        <use href="#t5b" transform="translate(620.377 -29.8158) rotate(160)"/>
        <use href="#t5b" transform="translate(625.634 79.5734) rotate(180)"/>
        <use href="#t5b" transform="translate(593.161 184.164) rotate(-160)"/>
        <use href="#t5b" transform="translate(526.875 271.34) rotate(-140)"/>
        <use href="#t5b" transform="translate(434.769 330.588) rotate(-120)"/>
        <use href="#t5b" transform="translate(327.955 354.76) rotate(-100)"/>
        <use href="#t5b" transform="translate(219.315 340.943) rotate(-80)"/>
        <use href="#t5b" transform="translate(121.952 290.801) rotate(-60)"/>
        <use href="#t5b" transform="translate(47.6109 210.383) rotate(-40)"/>
        <use href="#t5b" transform="translate(5.25734 109.389) rotate(-20)"/>
        <g id="t5c"><circle cx="312.816" cy="29.8804" r="1.32093" fill="#00BE4A"/></g>
        <use href="#t5c" transform="translate(25.625 -90.4364) rotate(17.1429)"/>
        <use href="#t5c" transform="translate(76.7682 -169.302) rotate(34.2857)"/>
        <use href="#t5c" transform="translate(148.885 -229.589) rotate(51.4286)"/>
        <use href="#t5c" transform="translate(235.568 -265.94) rotate(68.5714)"/>
        <use href="#t5c" transform="translate(329.115 -275.127) rotate(85.7143)"/>
        <use href="#t5c" transform="translate(421.213 -256.332) rotate(102.857)"/>
        <use href="#t5c" transform="translate(503.68 -211.225) rotate(120)"/>
        <use href="#t5c" transform="translate(569.188 -143.815) rotate(137.143)"/>
        <use href="#t5c" transform="translate(611.916 -60.0911) rotate(154.286)"/>
        <use href="#t5c" transform="translate(628.067 32.5076) rotate(171.429)"/>
        <use href="#t5c" transform="translate(616.207 125.753) rotate(-171.429)"/>
        <use href="#t5c" transform="translate(577.39 211.36) rotate(-154.286)"/>
        <use href="#t5c" transform="translate(515.063 281.722) rotate(-137.143)"/>
        <use href="#t5c" transform="translate(434.767 330.587) rotate(-120)"/>
        <use href="#t5c" transform="translate(343.634 353.613) rotate(-102.857)"/>
        <use href="#t5c" transform="translate(249.763 348.755) rotate(-85.7143)"/>
        <use href="#t5c" transform="translate(161.494 316.443) rotate(-68.5714)"/>
        <use href="#t5c" transform="translate(86.6712 259.549) rotate(-51.4286)"/>
        <use href="#t5c" transform="translate(31.9422 183.129) rotate(-34.2857)"/>
        <use href="#t5c" transform="translate(2.16998 93.9715) rotate(-17.1428)"/>
        <g id="t5d"><circle cx="312.816" cy="34.0711" r="0.762088" fill="#00BE4A"/></g>
        <use href="#t5d" transform="translate(18.6115 -73.7056) rotate(13.8462)"/>
        <use href="#t5d" transform="translate(54.321 -140.815) rotate(27.6923)"/>
        <use href="#t5d" transform="translate(105.053 -197.429) rotate(41.5385)"/>
        <use href="#t5d" transform="translate(167.86 -240.257) rotate(55.3846)"/>
        <use href="#t5d" transform="translate(239.091 -266.81) rotate(69.2308)"/>
        <use href="#t5d" transform="translate(314.607 -275.544) rotate(83.0769)"/>
        <use href="#t5d" transform="translate(390.018 -265.953) rotate(96.9231)"/>
        <use href="#t5d" transform="translate(460.943 -238.593) rotate(110.769)"/>
        <use href="#t5d" transform="translate(523.259 -195.054) rotate(124.615)"/>
        <use href="#t5d" transform="translate(573.345 -137.868) rotate(138.462)"/>
        <use href="#t5d" transform="translate(608.29 -70.3566) rotate(152.308)"/>
        <use href="#t5d" transform="translate(626.063 3.55565) rotate(166.154)"/>
        <use href="#t5d" transform="translate(625.632 79.5735) rotate(180)"/>
        <use href="#t5d" transform="translate(607.02 153.279) rotate(-166.154)"/>
        <use href="#t5d" transform="translate(571.311 220.389) rotate(-152.308)"/>
        <use href="#t5d" transform="translate(520.578 277.003) rotate(-138.462)"/>
        <use href="#t5d" transform="translate(457.772 319.831) rotate(-124.615)"/>
        <use href="#t5d" transform="translate(386.541 346.383) rotate(-110.769)"/>
        <use href="#t5d" transform="translate(311.025 355.118) rotate(-96.9231)"/>
        <use href="#t5d" transform="translate(235.613 345.526) rotate(-83.0769)"/>
        <use href="#t5d" transform="translate(164.689 318.166) rotate(-69.2308)"/>
        <use href="#t5d" transform="translate(102.372 274.628) rotate(-55.3846)"/>
        <use href="#t5d" transform="translate(52.2863 217.441) rotate(-41.5385)"/>
        <use href="#t5d" transform="translate(17.3413 149.93) rotate(-27.6923)"/>
        <use href="#t5d" transform="translate(-0.431738 76.0178) rotate(-13.8461)"/>
        <g id="t5e"><circle cx="312.816" cy="6.61929" r="6.1423" fill="#00BE4A"/></g>
        <use href="#t5e" transform="translate(98.7601 -191.766) rotate(40)"/>
        <use href="#t5e" transform="translate(297.679 -275.185) rotate(80)"/>
        <use href="#t5e" transform="translate(503.681 -211.225) rotate(120)"/>
        <use href="#t5e" transform="translate(620.375 -29.8135) rotate(160)"/>
        <use href="#t5e" transform="translate(593.159 184.165) rotate(-160)"/>
        <use href="#t5e" transform="translate(434.767 330.588) rotate(-120)"/>
        <use href="#t5e" transform="translate(219.313 340.942) rotate(-80)"/>
        <use href="#t5e" transform="translate(47.61 210.383) rotate(-40)"/>
      </g>

    </svg>
  );
}
