const ms = (d, visible) => visible
  ? {
      transformBox: 'fill-box',
      transformOrigin: '50% 50%',
      animation: `mandalaPopIn 0.55s cubic-bezier(0.32, 0.72, 0, 1) ${d}s both`,
    }
  : { opacity: 0 };

export default function WelcomeDecorationBottom({ visible }) {
  return (
    <svg width="100%" viewBox="0 0 353 174" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* Mandala 1 — Small Blue */}
      <g style={ms(0.15, visible)}>
        <g id="b1a"><circle cx="39.7891" cy="17.9465" r="2.91211" fill="#B6CDFF"/></g>
        <use href="#b1a" transform="translate(16.0077 -11.2091) rotate(20)"/>
        <use href="#b1a" transform="translate(34.8837 -16.2673) rotate(40)"/>
        <use href="#b1a" transform="translate(54.3513 -14.5645) rotate(60)"/>
        <use href="#b1a" transform="translate(72.0626 -6.30605) rotate(80)"/>
        <use href="#b1a" transform="translate(85.8811 7.51196) rotate(100)"/>
        <use href="#b1a" transform="translate(94.1403 25.2229) rotate(120)"/>
        <use href="#b1a" transform="translate(95.8438 44.6905) rotate(140)"/>
        <use href="#b1a" transform="translate(90.7863 63.5667) rotate(160)"/>
        <use href="#b1a" transform="translate(79.5778 79.5748) rotate(180)"/>
        <use href="#b1a" transform="translate(63.5702 90.7839) rotate(-160)"/>
        <use href="#b1a" transform="translate(44.6942 95.8421) rotate(-140)"/>
        <use href="#b1a" transform="translate(25.2265 94.1393) rotate(-120)"/>
        <use href="#b1a" transform="translate(7.51526 85.8808) rotate(-100)"/>
        <use href="#b1a" transform="translate(-6.30329 72.0628) rotate(-80)"/>
        <use href="#b1a" transform="translate(-14.5624 54.3519) rotate(-60)"/>
        <use href="#b1a" transform="translate(-16.266 34.8843) rotate(-40)"/>
        <use href="#b1a" transform="translate(-11.2085 16.0081) rotate(-20)"/>
        <g id="b1b"><circle cx="39.7883" cy="24.8512" r="1.99141" fill="#B6CDFF"/></g>
        <use href="#b1b" transform="translate(16.0074 -11.209) rotate(20)"/>
        <use href="#b1b" transform="translate(34.8832 -16.2671) rotate(40)"/>
        <use href="#b1b" transform="translate(54.3505 -14.5643) rotate(60)"/>
        <use href="#b1b" transform="translate(72.0615 -6.30602) rotate(80)"/>
        <use href="#b1b" transform="translate(85.8799 7.51178) rotate(100)"/>
        <use href="#b1b" transform="translate(94.1389 25.2224) rotate(120)"/>
        <use href="#b1b" transform="translate(95.8425 44.6897) rotate(140)"/>
        <use href="#b1b" transform="translate(90.7851 63.5657) rotate(160)"/>
        <use href="#b1b" transform="translate(79.5767 79.5735) rotate(180)"/>
        <use href="#b1b" transform="translate(63.5693 90.7825) rotate(-160)"/>
        <use href="#b1b" transform="translate(44.6936 95.8407) rotate(-140)"/>
        <use href="#b1b" transform="translate(25.2262 94.1379) rotate(-120)"/>
        <use href="#b1b" transform="translate(7.51521 85.8796) rotate(-100)"/>
        <use href="#b1b" transform="translate(-6.30314 72.0618) rotate(-80)"/>
        <use href="#b1b" transform="translate(-14.5622 54.3511) rotate(-60)"/>
        <use href="#b1b" transform="translate(-16.2657 34.8838) rotate(-40)"/>
        <use href="#b1b" transform="translate(-11.2084 16.0079) rotate(-20)"/>
        <g id="b1c"><circle cx="39.7877" cy="29.8804" r="1.32093" fill="#B6CDFF"/></g>
        <use href="#b1c" transform="translate(13.4952 -9.95996) rotate(17.1429)"/>
        <use href="#b1c" transform="translate(29.3265 -15.4996) rotate(34.2857)"/>
        <use href="#b1c" transform="translate(46.0874 -16.1268) rotate(51.4286)"/>
        <use href="#b1c" transform="translate(62.2885 -11.7858) rotate(68.5714)"/>
        <use href="#b1c" transform="translate(76.4903 -2.8623) rotate(85.7143)"/>
        <use href="#b1c" transform="translate(87.4309 9.85083) rotate(102.857)"/>
        <use href="#b1c" transform="translate(94.1382 25.224) rotate(120)"/>
        <use href="#b1c" transform="translate(96.0162 41.8911) rotate(137.143)"/>
        <use href="#b1c" transform="translate(92.898 58.3713) rotate(154.286)"/>
        <use href="#b1c" transform="translate(85.0608 73.2003) rotate(171.429)"/>
        <use href="#b1c" transform="translate(73.2008 85.0603) rotate(-171.429)"/>
        <use href="#b1c" transform="translate(58.3719 92.8977) rotate(-154.286)"/>
        <use href="#b1c" transform="translate(41.8917 96.0159) rotate(-137.143)"/>
        <use href="#b1c" transform="translate(25.2245 94.1381) rotate(-120)"/>
        <use href="#b1c" transform="translate(9.85135 87.4309) rotate(-102.857)"/>
        <use href="#b1c" transform="translate(-2.86184 76.4903) rotate(-85.7143)"/>
        <use href="#b1c" transform="translate(-11.7854 62.2886) rotate(-68.5714)"/>
        <use href="#b1c" transform="translate(-16.1266 46.0875) rotate(-51.4286)"/>
        <use href="#b1c" transform="translate(-15.4995 29.3266) rotate(-34.2857)"/>
        <use href="#b1c" transform="translate(-9.95986 13.4952) rotate(-17.1428)"/>
        <g id="b1d"><circle cx="39.788" cy="34.0711" r="0.762088" fill="#B6CDFF"/></g>
        <use href="#b1d" transform="translate(10.6778 -8.36577) rotate(13.8462)"/>
        <use href="#b1d" transform="translate(23.0473 -13.9331) rotate(27.6923)"/>
        <use href="#b1d" transform="translate(36.3898 -16.3784) rotate(41.5385)"/>
        <use href="#b1d" transform="translate(49.9297 -15.5596) rotate(55.3846)"/>
        <use href="#b1d" transform="translate(62.8803 -11.5243) rotate(69.2308)"/>
        <use href="#b1d" transform="translate(74.4888 -4.50695) rotate(83.0769)"/>
        <use href="#b1d" transform="translate(84.0806 5.08458) rotate(96.9231)"/>
        <use href="#b1d" transform="translate(91.0983 16.6929) rotate(110.769)"/>
        <use href="#b1d" transform="translate(95.1341 29.6433) rotate(124.615)"/>
        <use href="#b1d" transform="translate(95.9533 43.1832) rotate(138.462)"/>
        <use href="#b1d" transform="translate(93.5084 56.5258) rotate(152.308)"/>
        <use href="#b1d" transform="translate(87.9415 68.8955) rotate(166.154)"/>
        <use href="#b1d" transform="translate(79.5761 79.5735) rotate(180)"/>
        <use href="#b1d" transform="translate(68.8983 87.9393) rotate(-166.154)"/>
        <use href="#b1d" transform="translate(56.5288 93.5066) rotate(-152.308)"/>
        <use href="#b1d" transform="translate(43.1863 95.9519) rotate(-138.462)"/>
        <use href="#b1d" transform="translate(29.6464 95.1331) rotate(-124.615)"/>
        <use href="#b1d" transform="translate(16.6958 91.0978) rotate(-110.769)"/>
        <use href="#b1d" transform="translate(5.08729 84.0805) rotate(-96.9231)"/>
        <use href="#b1d" transform="translate(-4.50455 74.4889) rotate(-83.0769)"/>
        <use href="#b1d" transform="translate(-11.5223 62.8807) rotate(-69.2308)"/>
        <use href="#b1d" transform="translate(-15.558 49.9302) rotate(-55.3846)"/>
        <use href="#b1d" transform="translate(-16.3772 36.3903) rotate(-41.5385)"/>
        <use href="#b1d" transform="translate(-13.9324 23.0478) rotate(-27.6923)"/>
        <use href="#b1d" transform="translate(-8.36543 10.678) rotate(-13.8461)"/>
        <g id="b1e"><circle cx="39.7878" cy="6.61944" r="6.1423" fill="#B6CDFF"/></g>
        <use href="#b1e" transform="translate(34.8837 -16.2664) rotate(40)"/>
        <use href="#b1e" transform="translate(72.062 -6.30445) rotate(80)"/>
        <use href="#b1e" transform="translate(94.1389 25.2247) rotate(120)"/>
        <use href="#b1e" transform="translate(90.7842 63.5681) rotate(160)"/>
        <use href="#b1e" transform="translate(63.5677 90.7844) rotate(-160)"/>
        <use href="#b1e" transform="translate(25.2242 94.139) rotate(-120)"/>
        <use href="#b1e" transform="translate(-6.30477 72.062) rotate(-80)"/>
        <use href="#b1e" transform="translate(-16.2666 34.8836) rotate(-40)"/>
      </g>

      {/* Mandala 2 — Green */}
      <g style={ms(0.30, visible)}>
        <g id="b2a"><circle cx="221.365" cy="112.262" r="2.91211" fill="#00BE4A"/></g>
        <use href="#b2a" transform="translate(59.2158 -67.6237) rotate(20)"/>
        <use href="#b2a" transform="translate(137.989 -110.916) rotate(40)"/>
        <use href="#b2a" transform="translate(226.819 -124.656) rotate(60)"/>
        <use href="#b2a" transform="translate(314.991 -107.185) rotate(80)"/>
        <use href="#b2a" transform="translate(391.87 -60.6118) rotate(100)"/>
        <use href="#b2a" transform="translate(448.184 9.44715) rotate(120)"/>
        <use href="#b2a" transform="translate(477.139 94.5414) rotate(140)"/>
        <use href="#b2a" transform="translate(475.245 184.407) rotate(160)"/>
        <use href="#b2a" transform="translate(442.729 268.206) rotate(180)"/>
        <use href="#b2a" transform="translate(383.513 335.83) rotate(-160)"/>
        <use href="#b2a" transform="translate(304.74 379.122) rotate(-140)"/>
        <use href="#b2a" transform="translate(215.91 392.862) rotate(-120)"/>
        <use href="#b2a" transform="translate(127.738 375.391) rotate(-100)"/>
        <use href="#b2a" transform="translate(50.8594 328.818) rotate(-80)"/>
        <use href="#b2a" transform="translate(-5.45429 258.759) rotate(-60)"/>
        <use href="#b2a" transform="translate(-34.4103 173.665) rotate(-40)"/>
        <use href="#b2a" transform="translate(-32.516 83.7986) rotate(-20)"/>
        <g id="b2b"><circle cx="221.363" cy="119.167" r="1.99141" fill="#00BE4A"/></g>
        <use href="#b2b" transform="translate(59.2156 -67.6234) rotate(20)"/>
        <use href="#b2b" transform="translate(137.989 -110.916) rotate(40)"/>
        <use href="#b2b" transform="translate(226.818 -124.655) rotate(60)"/>
        <use href="#b2b" transform="translate(314.989 -107.185) rotate(80)"/>
        <use href="#b2b" transform="translate(391.868 -60.6115) rotate(100)"/>
        <use href="#b2b" transform="translate(448.181 9.44713) rotate(120)"/>
        <use href="#b2b" transform="translate(477.137 94.541) rotate(140)"/>
        <use href="#b2b" transform="translate(475.243 184.407) rotate(160)"/>
        <use href="#b2b" transform="translate(442.727 268.205) rotate(180)"/>
        <use href="#b2b" transform="translate(383.512 335.828) rotate(-160)"/>
        <use href="#b2b" transform="translate(304.739 379.121) rotate(-140)"/>
        <use href="#b2b" transform="translate(215.909 392.86) rotate(-120)"/>
        <use href="#b2b" transform="translate(127.738 375.39) rotate(-100)"/>
        <use href="#b2b" transform="translate(50.8591 328.816) rotate(-80)"/>
        <use href="#b2b" transform="translate(-5.45429 258.758) rotate(-60)"/>
        <use href="#b2b" transform="translate(-34.4101 173.664) rotate(-40)"/>
        <use href="#b2b" transform="translate(-32.5159 83.7982) rotate(-20)"/>
        <g id="b2c"><circle cx="221.363" cy="124.196" r="1.32093" fill="#00BE4A"/></g>
        <use href="#b2c" transform="translate(49.362 -59.2901) rotate(17.1429)"/>
        <use href="#b2c" transform="translate(114.007 -101.396) rotate(34.2857)"/>
        <use href="#b2c" transform="translate(188.191 -122.577) rotate(51.4286)"/>
        <use href="#b2c" transform="translate(265.323 -120.951) rotate(68.5714)"/>
        <use href="#b2c" transform="translate(338.548 -96.6627) rotate(85.7143)"/>
        <use href="#b2c" transform="translate(401.361 -51.8694) rotate(102.857)"/>
        <use href="#b2c" transform="translate(448.181 9.4483) rotate(120)"/>
        <use href="#b2c" transform="translate(474.847 81.8421) rotate(137.143)"/>
        <use href="#b2c" transform="translate(478.989 158.88) rotate(154.286)"/>
        <use href="#b2c" transform="translate(460.24 233.715) rotate(171.429)"/>
        <use href="#b2c" transform="translate(420.266 299.7) rotate(-171.429)"/>
        <use href="#b2c" transform="translate(362.619 350.971) rotate(-154.286)"/>
        <use href="#b2c" transform="translate(292.42 382.972) rotate(-137.143)"/>
        <use href="#b2c" transform="translate(215.908 392.86) rotate(-120)"/>
        <use href="#b2c" transform="translate(139.88 379.756) rotate(-102.857)"/>
        <use href="#b2c" transform="translate(71.0926 344.825) rotate(-85.7143)"/>
        <use href="#b2c" transform="translate(15.6572 291.171) rotate(-68.5714)"/>
        <use href="#b2c" transform="translate(-21.5004 223.56) rotate(-51.4286)"/>
        <use href="#b2c" transform="translate(-37.0785 148) rotate(-34.2857)"/>
        <use href="#b2c" transform="translate(-29.6929 71.2056) rotate(-17.1428)"/>
        <g id="b2d"><circle cx="221.363" cy="128.387" r="0.762088" fill="#00BE4A"/></g>
        <use href="#b2d" transform="translate(38.5252 -49.0789) rotate(13.8462)"/>
        <use href="#b2d" transform="translate(87.6763 -87.512) rotate(27.6923)"/>
        <use href="#b2d" transform="translate(144.597 -113.066) rotate(41.5385)"/>
        <use href="#b2d" transform="translate(205.979 -124.255) rotate(55.3846)"/>
        <use href="#b2d" transform="translate(268.255 -120.429) rotate(69.2308)"/>
        <use href="#b2d" transform="translate(327.805 -101.811) rotate(83.0769)"/>
        <use href="#b2d" transform="translate(381.17 -69.4826) rotate(96.9231)"/>
        <use href="#b2d" transform="translate(425.248 -25.3225) rotate(110.769)"/>
        <use href="#b2d" transform="translate(457.476 28.1028) rotate(124.615)"/>
        <use href="#b2d" transform="translate(475.982 87.6885) rotate(138.462)"/>
        <use href="#b2d" transform="translate(479.691 149.971) rotate(152.308)"/>
        <use href="#b2d" transform="translate(468.387 211.332) rotate(166.154)"/>
        <use href="#b2d" transform="translate(442.726 268.205) rotate(180)"/>
        <use href="#b2d" transform="translate(404.201 317.284) rotate(-166.154)"/>
        <use href="#b2d" transform="translate(355.05 355.717) rotate(-152.308)"/>
        <use href="#b2d" transform="translate(298.13 381.27) rotate(-138.462)"/>
        <use href="#b2d" transform="translate(236.748 392.46) rotate(-124.615)"/>
        <use href="#b2d" transform="translate(174.472 388.634) rotate(-110.769)"/>
        <use href="#b2d" transform="translate(114.921 370.016) rotate(-96.9231)"/>
        <use href="#b2d" transform="translate(61.5562 337.687) rotate(-83.0769)"/>
        <use href="#b2d" transform="translate(17.4789 293.527) rotate(-69.2308)"/>
        <use href="#b2d" transform="translate(-14.7495 240.102) rotate(-55.3846)"/>
        <use href="#b2d" transform="translate(-33.2558 180.516) rotate(-41.5385)"/>
        <use href="#b2d" transform="translate(-36.9647 118.233) rotate(-27.6923)"/>
        <use href="#b2d" transform="translate(-25.6604 56.8724) rotate(-13.8461)"/>
        <g id="b2e"><circle cx="221.363" cy="100.935" r="6.1423" fill="#00BE4A"/></g>
        <use href="#b2e" transform="translate(137.989 -110.915) rotate(40)"/>
        <use href="#b2e" transform="translate(314.99 -107.184) rotate(80)"/>
        <use href="#b2e" transform="translate(448.182 9.44898) rotate(120)"/>
        <use href="#b2e" transform="translate(475.243 184.409) rotate(160)"/>
        <use href="#b2e" transform="translate(383.511 335.83) rotate(-160)"/>
        <use href="#b2e" transform="translate(215.908 392.862) rotate(-120)"/>
        <use href="#b2e" transform="translate(50.8579 328.817) rotate(-80)"/>
        <use href="#b2e" transform="translate(-34.4109 173.664) rotate(-40)"/>
      </g>

      {/* Mandala 3 — Navy */}
      <g style={ms(0.45, visible)}>
        <g id="b3a"><circle cx="130.799" cy="18.4235" r="2.91211" fill="#183497"/></g>
        <use href="#b3a" transform="translate(21.6593 -42.3075) rotate(20)"/>
        <use href="#b3a" transform="translate(56.4825 -74.6557) rotate(40)"/>
        <use href="#b3a" transform="translate(100.269 -93.1428) rotate(60)"/>
        <use href="#b3a" transform="translate(147.738 -95.5391) rotate(80)"/>
        <use href="#b3a" transform="translate(193.164 -81.5554) rotate(100)"/>
        <use href="#b3a" transform="translate(231.068 -52.8785) rotate(120)"/>
        <use href="#b3a" transform="translate(256.878 -12.9672) rotate(140)"/>
        <use href="#b3a" transform="translate(267.48 33.3646) rotate(160)"/>
        <use href="#b3a" transform="translate(261.597 80.5286) rotate(180)"/>
        <use href="#b3a" transform="translate(239.938 122.836) rotate(-160)"/>
        <use href="#b3a" transform="translate(205.115 155.184) rotate(-140)"/>
        <use href="#b3a" transform="translate(161.328 173.671) rotate(-120)"/>
        <use href="#b3a" transform="translate(113.859 176.068) rotate(-100)"/>
        <use href="#b3a" transform="translate(68.4331 162.084) rotate(-80)"/>
        <use href="#b3a" transform="translate(30.5294 133.407) rotate(-60)"/>
        <use href="#b3a" transform="translate(4.71968 93.4959) rotate(-40)"/>
        <use href="#b3a" transform="translate(-5.88308 47.164) rotate(-20)"/>
        <g id="b3b"><circle cx="130.798" cy="25.3282" r="1.99141" fill="#183497"/></g>
        <use href="#b3b" transform="translate(21.6591 -42.3074) rotate(20)"/>
        <use href="#b3b" transform="translate(56.482 -74.6555) rotate(40)"/>
        <use href="#b3b" transform="translate(100.269 -93.1426) rotate(60)"/>
        <use href="#b3b" transform="translate(147.737 -95.539) rotate(80)"/>
        <use href="#b3b" transform="translate(193.163 -81.5555) rotate(100)"/>
        <use href="#b3b" transform="translate(231.067 -52.8788) rotate(120)"/>
        <use href="#b3b" transform="translate(256.876 -12.9678) rotate(140)"/>
        <use href="#b3b" transform="translate(267.479 33.3638) rotate(160)"/>
        <use href="#b3b" transform="translate(261.596 80.5276) rotate(180)"/>
        <use href="#b3b" transform="translate(239.937 122.835) rotate(-160)"/>
        <use href="#b3b" transform="translate(205.114 155.183) rotate(-140)"/>
        <use href="#b3b" transform="translate(161.328 173.67) rotate(-120)"/>
        <use href="#b3b" transform="translate(113.859 176.067) rotate(-100)"/>
        <use href="#b3b" transform="translate(68.4332 162.083) rotate(-80)"/>
        <use href="#b3b" transform="translate(30.5296 133.406) rotate(-60)"/>
        <use href="#b3b" transform="translate(4.71989 93.4954) rotate(-40)"/>
        <use href="#b3b" transform="translate(-5.88294 47.1638) rotate(-20)"/>
        <g id="b3c"><circle cx="130.796" cy="30.3574" r="1.32093" fill="#183497"/></g>
        <use href="#b3c" transform="translate(17.679 -36.764) rotate(17.1429)"/>
        <use href="#b3c" transform="translate(45.409 -66.6837) rotate(34.2857)"/>
        <use href="#b3c" transform="translate(80.726 -87.1005) rotate(51.4286)"/>
        <use href="#b3c" transform="translate(120.492 -96.2005) rotate(68.5714)"/>
        <use href="#b3c" transform="translate(161.173 -93.1749) rotate(85.7143)"/>
        <use href="#b3c" transform="translate(199.156 -78.2927) rotate(102.857)"/>
        <use href="#b3c" transform="translate(231.064 -52.8761) rotate(120)"/>
        <use href="#b3c" transform="translate(254.063 -19.1836) rotate(137.143)"/>
        <use href="#b3c" transform="translate(266.109 19.7911) rotate(154.286)"/>
        <use href="#b3c" transform="translate(266.132 60.5849) rotate(171.429)"/>
        <use href="#b3c" transform="translate(254.13 99.5732) rotate(-171.429)"/>
        <use href="#b3c" transform="translate(231.169 133.292) rotate(-154.286)"/>
        <use href="#b3c" transform="translate(199.29 158.744) rotate(-137.143)"/>
        <use href="#b3c" transform="translate(161.324 173.669) rotate(-120)"/>
        <use href="#b3c" transform="translate(120.646 176.741) rotate(-102.857)"/>
        <use href="#b3c" transform="translate(80.8698 167.686) rotate(-85.7143)"/>
        <use href="#b3c" transform="translate(45.5298 147.309) rotate(-68.5714)"/>
        <use href="#b3c" transform="translate(17.7661 117.42) rotate(-51.4286)"/>
        <use href="#b3c" transform="translate(0.045549 80.6764) rotate(-34.2857)"/>
        <use href="#b3c" transform="translate(-6.05723 40.3416) rotate(-17.1428)"/>
        <g id="b3d"><circle cx="130.796" cy="34.5482" r="0.762088" fill="#183497"/></g>
        <use href="#b3d" transform="translate(13.4365 -30.1315) rotate(13.8462)"/>
        <use href="#b3d" transform="translate(33.6934 -56.1719) rotate(27.6923)"/>
        <use href="#b3d" transform="translate(59.5936 -76.6078) rotate(41.5385)"/>
        <use href="#b3d" transform="translate(89.6318 -90.2515) rotate(55.3846)"/>
        <use href="#b3d" transform="translate(122.062 -96.3102) rotate(69.2308)"/>
        <use href="#b3d" transform="translate(155 -94.4317) rotate(83.0769)"/>
        <use href="#b3d" transform="translate(186.532 -84.7251) rotate(96.9231)"/>
        <use href="#b3d" transform="translate(214.824 -67.7547) rotate(110.769)"/>
        <use href="#b3d" transform="translate(238.233 -44.5066) rotate(124.615)"/>
        <use href="#b3d" transform="translate(255.398 -16.332) rotate(138.462)"/>
        <use href="#b3d" transform="translate(265.321 15.1318) rotate(152.308)"/>
        <use href="#b3d" transform="translate(267.427 48.0561) rotate(166.154)"/>
        <use href="#b3d" transform="translate(261.592 80.5276) rotate(180)"/>
        <use href="#b3d" transform="translate(248.155 110.659) rotate(-166.154)"/>
        <use href="#b3d" transform="translate(227.898 136.699) rotate(-152.308)"/>
        <use href="#b3d" transform="translate(201.998 157.135) rotate(-138.462)"/>
        <use href="#b3d" transform="translate(171.96 170.779) rotate(-124.615)"/>
        <use href="#b3d" transform="translate(139.529 176.838) rotate(-110.769)"/>
        <use href="#b3d" transform="translate(106.591 174.959) rotate(-96.9231)"/>
        <use href="#b3d" transform="translate(75.0599 165.253) rotate(-83.0769)"/>
        <use href="#b3d" transform="translate(46.7677 148.282) rotate(-69.2308)"/>
        <use href="#b3d" transform="translate(23.3589 125.034) rotate(-55.3846)"/>
        <use href="#b3d" transform="translate(6.19391 96.8596) rotate(-41.5385)"/>
        <use href="#b3d" transform="translate(-3.72965 65.3958) rotate(-27.6923)"/>
        <use href="#b3d" transform="translate(-5.83507 32.4715) rotate(-13.8461)"/>
        <g id="b3e"><circle cx="130.798" cy="7.09625" r="6.1423" fill="#183497"/></g>
        <use href="#b3e" transform="translate(56.4824 -74.6548) rotate(40)"/>
        <use href="#b3e" transform="translate(147.738 -95.5376) rotate(80)"/>
        <use href="#b3e" transform="translate(231.066 -52.8769) rotate(120)"/>
        <use href="#b3e" transform="translate(267.478 33.3657) rotate(160)"/>
        <use href="#b3e" transform="translate(239.936 122.836) rotate(-160)"/>
        <use href="#b3e" transform="translate(161.326 173.671) rotate(-120)"/>
        <use href="#b3e" transform="translate(68.4318 162.083) rotate(-80)"/>
        <use href="#b3e" transform="translate(4.71916 93.4952) rotate(-40)"/>
      </g>

      {/* Mandala 4 — Yellow */}
      <g style={ms(0.60, visible)}>
        <g id="b4a"><circle cx="39.7891" cy="111.785" r="2.91211" fill="#FFDC60"/></g>
        <use href="#b4a" transform="translate(48.1023 -5.54998) rotate(20)"/>
        <use href="#b4a" transform="translate(95.2019 5.68671) rotate(40)"/>
        <use href="#b4a" transform="translate(135.618 32.3548) rotate(60)"/>
        <use href="#b4a" transform="translate(164.476 71.2376) rotate(80)"/>
        <use href="#b4a" transform="translate(178.294 117.645) rotate(100)"/>
        <use href="#b4a" transform="translate(175.407 165.981) rotate(120)"/>
        <use href="#b4a" transform="translate(156.162 210.414) rotate(140)"/>
        <use href="#b4a" transform="translate(122.881 245.585) rotate(160)"/>
        <use href="#b4a" transform="translate(79.5778 267.252) rotate(180)"/>
        <use href="#b4a" transform="translate(31.4755 272.802) rotate(-160)"/>
        <use href="#b4a" transform="translate(-15.6241 261.565) rotate(-140)"/>
        <use href="#b4a" transform="translate(-56.0401 234.897) rotate(-120)"/>
        <use href="#b4a" transform="translate(-84.8977 196.014) rotate(-100)"/>
        <use href="#b4a" transform="translate(-98.7162 149.606) rotate(-80)"/>
        <use href="#b4a" transform="translate(-95.829 101.271) rotate(-60)"/>
        <use href="#b4a" transform="translate(-76.5843 56.8384) rotate(-40)"/>
        <use href="#b4a" transform="translate(-43.3032 21.6673) rotate(-20)"/>
        <g id="b4b"><circle cx="39.7883" cy="118.69" r="1.99141" fill="#FFDC60"/></g>
        <use href="#b4b" transform="translate(48.1021 -5.54982) rotate(20)"/>
        <use href="#b4b" transform="translate(95.2015 5.68694) rotate(40)"/>
        <use href="#b4b" transform="translate(135.617 32.355) rotate(60)"/>
        <use href="#b4b" transform="translate(164.475 71.2377) rotate(80)"/>
        <use href="#b4b" transform="translate(178.293 117.645) rotate(100)"/>
        <use href="#b4b" transform="translate(175.406 165.98) rotate(120)"/>
        <use href="#b4b" transform="translate(156.161 210.413) rotate(140)"/>
        <use href="#b4b" transform="translate(122.88 245.584) rotate(160)"/>
        <use href="#b4b" transform="translate(79.5767 267.251) rotate(180)"/>
        <use href="#b4b" transform="translate(31.4746 272.801) rotate(-160)"/>
        <use href="#b4b" transform="translate(-15.6247 261.564) rotate(-140)"/>
        <use href="#b4b" transform="translate(-56.0405 234.896) rotate(-120)"/>
        <use href="#b4b" transform="translate(-84.8978 196.013) rotate(-100)"/>
        <use href="#b4b" transform="translate(-98.7161 149.605) rotate(-80)"/>
        <use href="#b4b" transform="translate(-95.8288 101.27) rotate(-60)"/>
        <use href="#b4b" transform="translate(-76.5841 56.8379) rotate(-40)"/>
        <use href="#b4b" transform="translate(-43.3031 21.667) rotate(-20)"/>
        <g id="b4c"><circle cx="39.7863" cy="123.719" r="1.32093" fill="#FFDC60"/></g>
        <use href="#b4c" transform="translate(41.1545 -5.79059) rotate(17.1429)"/>
        <use href="#b4c" transform="translate(82.1875 0.806597) rotate(34.2857)"/>
        <use href="#b4c" transform="translate(119.453 19.2054) rotate(51.4286)"/>
        <use href="#b4c" transform="translate(149.64 47.7709) rotate(68.5714)"/>
        <use href="#b4c" transform="translate(170.065 83.965) rotate(85.7143)"/>
        <use href="#b4c" transform="translate(178.915 124.572) rotate(102.857)"/>
        <use href="#b4c" transform="translate(175.403 165.983) rotate(120)"/>
        <use href="#b4c" transform="translate(159.84 204.519) rotate(137.143)"/>
        <use href="#b4c" transform="translate(133.611 236.756) rotate(154.286)"/>
        <use href="#b4c" transform="translate(99.0441 259.83) rotate(171.429)"/>
        <use href="#b4c" transform="translate(59.2122 271.689) rotate(-171.429)"/>
        <use href="#b4c" transform="translate(17.6544 271.281) rotate(-154.286)"/>
        <use href="#b4c" transform="translate(-21.937 258.642) rotate(-137.143)"/>
        <use href="#b4c" transform="translate(-56.044 234.895) rotate(-120)"/>
        <use href="#b4c" transform="translate(-81.6361 202.149) rotate(-102.857)"/>
        <use href="#b4c" transform="translate(-96.4393 163.315) rotate(-85.7143)"/>
        <use href="#b4c" transform="translate(-99.1382 121.843) rotate(-68.5714)"/>
        <use href="#b4c" transform="translate(-89.493 81.4177) rotate(-51.4286)"/>
        <use href="#b4c" transform="translate(-68.3609 45.6314) rotate(-34.2857)"/>
        <use href="#b4c" transform="translate(-37.6193 17.6638) rotate(-17.1428)"/>
        <g id="b4d"><circle cx="39.786" cy="127.91" r="0.762088" fill="#FFDC60"/></g>
        <use href="#b4d" transform="translate(33.1348 -5.63852) rotate(13.8462)"/>
        <use href="#b4d" transform="translate(66.6561 -3.18354) rotate(27.6923)"/>
        <use href="#b4d" transform="translate(98.6158 7.22229) rotate(41.5385)"/>
        <use href="#b4d" transform="translate(127.157 24.9742) rotate(55.3846)"/>
        <use href="#b4d" transform="translate(150.62 49.0405) rotate(69.2308)"/>
        <use href="#b4d" transform="translate(167.642 78.0226) rotate(83.0769)"/>
        <use href="#b4d" transform="translate(177.233 110.236) rotate(96.9231)"/>
        <use href="#b4d" transform="translate(178.836 143.809) rotate(110.769)"/>
        <use href="#b4d" transform="translate(172.359 176.79) rotate(124.615)"/>
        <use href="#b4d" transform="translate(158.176 207.262) rotate(138.462)"/>
        <use href="#b4d" transform="translate(137.114 233.455) rotate(152.308)"/>
        <use href="#b4d" transform="translate(110.395 253.846) rotate(166.154)"/>
        <use href="#b4d" transform="translate(79.5722 267.251) rotate(180)"/>
        <use href="#b4d" transform="translate(46.4374 272.889) rotate(-166.154)"/>
        <use href="#b4d" transform="translate(12.9161 270.434) rotate(-152.308)"/>
        <use href="#b4d" transform="translate(-19.0436 260.028) rotate(-138.462)"/>
        <use href="#b4d" transform="translate(-47.5843 242.277) rotate(-124.615)"/>
        <use href="#b4d" transform="translate(-71.0475 218.21) rotate(-110.769)"/>
        <use href="#b4d" transform="translate(-88.0693 189.228) rotate(-96.9231)"/>
        <use href="#b4d" transform="translate(-97.6607 157.015) rotate(-83.0769)"/>
        <use href="#b4d" transform="translate(-99.2642 123.442) rotate(-69.2308)"/>
        <use href="#b4d" transform="translate(-92.7865 90.4609) rotate(-55.3846)"/>
        <use href="#b4d" transform="translate(-78.6043 59.9884) rotate(-41.5385)"/>
        <use href="#b4d" transform="translate(-57.5416 33.7955) rotate(-27.6923)"/>
        <use href="#b4d" transform="translate(-30.8225 13.4043) rotate(-13.8461)"/>
        <g id="b4e"><circle cx="39.7878" cy="100.458" r="6.1423" fill="#FFDC60"/></g>
        <use href="#b4e" transform="translate(95.202 5.68762) rotate(40)"/>
        <use href="#b4e" transform="translate(164.475 71.2392) rotate(80)"/>
        <use href="#b4e" transform="translate(175.405 165.983) rotate(120)"/>
        <use href="#b4e" transform="translate(122.879 245.586) rotate(160)"/>
        <use href="#b4e" transform="translate(31.473 272.802) rotate(-160)"/>
        <use href="#b4e" transform="translate(-56.0424 234.897) rotate(-120)"/>
        <use href="#b4e" transform="translate(-98.7177 149.606) rotate(-80)"/>
        <use href="#b4e" transform="translate(-76.5849 56.8377) rotate(-40)"/>
      </g>

      {/* Mandala 5 — Large Blue */}
      <g style={ms(0.75, visible)}>
        <g id="b5a"><circle cx="312.817" cy="17.9465" r="2.91211" fill="#B6CDFF"/></g>
        <use href="#b5a" transform="translate(32.4733 -104.59) rotate(20)"/>
        <use href="#b5a" transform="translate(98.7601 -191.767) rotate(40)"/>
        <use href="#b5a" transform="translate(190.865 -251.014) rotate(60)"/>
        <use href="#b5a" transform="translate(297.68 -275.187) rotate(80)"/>
        <use href="#b5a" transform="translate(406.32 -261.369) rotate(100)"/>
        <use href="#b5a" transform="translate(503.683 -211.227) rotate(120)"/>
        <use href="#b5a" transform="translate(578.024 -130.809) rotate(140)"/>
        <use href="#b5a" transform="translate(620.377 -29.8146) rotate(160)"/>
        <use href="#b5a" transform="translate(625.634 79.5746) rotate(180)"/>
        <use href="#b5a" transform="translate(593.161 184.165) rotate(-160)"/>
        <use href="#b5a" transform="translate(526.874 271.341) rotate(-140)"/>
        <use href="#b5a" transform="translate(434.769 330.589) rotate(-120)"/>
        <use href="#b5a" transform="translate(327.954 354.761) rotate(-100)"/>
        <use href="#b5a" transform="translate(219.314 340.943) rotate(-80)"/>
        <use href="#b5a" transform="translate(121.952 290.801) rotate(-60)"/>
        <use href="#b5a" transform="translate(47.6106 210.384) rotate(-40)"/>
        <use href="#b5a" transform="translate(5.25714 109.389) rotate(-20)"/>
        <g id="b5b"><circle cx="312.817" cy="24.8511" r="1.99141" fill="#B6CDFF"/></g>
        <use href="#b5b" transform="translate(32.473 -104.59) rotate(20)"/>
        <use href="#b5b" transform="translate(98.7597 -191.767) rotate(40)"/>
        <use href="#b5b" transform="translate(190.865 -251.014) rotate(60)"/>
        <use href="#b5b" transform="translate(297.679 -275.187) rotate(80)"/>
        <use href="#b5b" transform="translate(406.32 -261.369) rotate(100)"/>
        <use href="#b5b" transform="translate(503.682 -211.228) rotate(120)"/>
        <use href="#b5b" transform="translate(578.023 -130.81) rotate(140)"/>
        <use href="#b5b" transform="translate(620.377 -29.8159) rotate(160)"/>
        <use href="#b5b" transform="translate(625.634 79.5733) rotate(180)"/>
        <use href="#b5b" transform="translate(593.161 184.164) rotate(-160)"/>
        <use href="#b5b" transform="translate(526.875 271.34) rotate(-140)"/>
        <use href="#b5b" transform="translate(434.769 330.588) rotate(-120)"/>
        <use href="#b5b" transform="translate(327.955 354.76) rotate(-100)"/>
        <use href="#b5b" transform="translate(219.315 340.943) rotate(-80)"/>
        <use href="#b5b" transform="translate(121.952 290.801) rotate(-60)"/>
        <use href="#b5b" transform="translate(47.611 210.383) rotate(-40)"/>
        <use href="#b5b" transform="translate(5.25735 109.389) rotate(-20)"/>
        <g id="b5c"><circle cx="312.816" cy="29.8803" r="1.32093" fill="#B6CDFF"/></g>
        <use href="#b5c" transform="translate(25.625 -90.4364) rotate(17.1429)"/>
        <use href="#b5c" transform="translate(76.7682 -169.302) rotate(34.2857)"/>
        <use href="#b5c" transform="translate(148.885 -229.589) rotate(51.4286)"/>
        <use href="#b5c" transform="translate(235.568 -265.94) rotate(68.5714)"/>
        <use href="#b5c" transform="translate(329.115 -275.127) rotate(85.7143)"/>
        <use href="#b5c" transform="translate(421.213 -256.332) rotate(102.857)"/>
        <use href="#b5c" transform="translate(503.68 -211.225) rotate(120)"/>
        <use href="#b5c" transform="translate(569.188 -143.815) rotate(137.143)"/>
        <use href="#b5c" transform="translate(611.916 -60.0911) rotate(154.286)"/>
        <use href="#b5c" transform="translate(628.067 32.5076) rotate(171.429)"/>
        <use href="#b5c" transform="translate(616.207 125.753) rotate(-171.429)"/>
        <use href="#b5c" transform="translate(577.39 211.36) rotate(-154.286)"/>
        <use href="#b5c" transform="translate(515.063 281.722) rotate(-137.143)"/>
        <use href="#b5c" transform="translate(434.767 330.587) rotate(-120)"/>
        <use href="#b5c" transform="translate(343.634 353.613) rotate(-102.857)"/>
        <use href="#b5c" transform="translate(249.763 348.755) rotate(-85.7143)"/>
        <use href="#b5c" transform="translate(161.494 316.443) rotate(-68.5714)"/>
        <use href="#b5c" transform="translate(86.6712 259.549) rotate(-51.4286)"/>
        <use href="#b5c" transform="translate(31.9422 183.129) rotate(-34.2857)"/>
        <use href="#b5c" transform="translate(2.16998 93.9715) rotate(-17.1428)"/>
        <g id="b5d"><circle cx="312.816" cy="34.0711" r="0.762088" fill="#B6CDFF"/></g>
        <use href="#b5d" transform="translate(18.6114 -73.7056) rotate(13.8462)"/>
        <use href="#b5d" transform="translate(54.321 -140.815) rotate(27.6923)"/>
        <use href="#b5d" transform="translate(105.053 -197.429) rotate(41.5385)"/>
        <use href="#b5d" transform="translate(167.86 -240.257) rotate(55.3846)"/>
        <use href="#b5d" transform="translate(239.091 -266.81) rotate(69.2308)"/>
        <use href="#b5d" transform="translate(314.607 -275.544) rotate(83.0769)"/>
        <use href="#b5d" transform="translate(390.018 -265.953) rotate(96.9231)"/>
        <use href="#b5d" transform="translate(460.943 -238.593) rotate(110.769)"/>
        <use href="#b5d" transform="translate(523.259 -195.054) rotate(124.615)"/>
        <use href="#b5d" transform="translate(573.345 -137.868) rotate(138.462)"/>
        <use href="#b5d" transform="translate(608.29 -70.3567) rotate(152.308)"/>
        <use href="#b5d" transform="translate(626.063 3.55559) rotate(166.154)"/>
        <use href="#b5d" transform="translate(625.632 79.5734) rotate(180)"/>
        <use href="#b5d" transform="translate(607.02 153.279) rotate(-166.154)"/>
        <use href="#b5d" transform="translate(571.311 220.389) rotate(-152.308)"/>
        <use href="#b5d" transform="translate(520.578 277.003) rotate(-138.462)"/>
        <use href="#b5d" transform="translate(457.772 319.831) rotate(-124.615)"/>
        <use href="#b5d" transform="translate(386.541 346.383) rotate(-110.769)"/>
        <use href="#b5d" transform="translate(311.025 355.118) rotate(-96.9231)"/>
        <use href="#b5d" transform="translate(235.613 345.526) rotate(-83.0769)"/>
        <use href="#b5d" transform="translate(164.689 318.166) rotate(-69.2308)"/>
        <use href="#b5d" transform="translate(102.372 274.628) rotate(-55.3846)"/>
        <use href="#b5d" transform="translate(52.2864 217.441) rotate(-41.5385)"/>
        <use href="#b5d" transform="translate(17.3414 149.93) rotate(-27.6923)"/>
        <use href="#b5d" transform="translate(-0.43173 76.0178) rotate(-13.8461)"/>
        <g id="b5e"><circle cx="312.816" cy="6.61926" r="6.1423" fill="#B6CDFF"/></g>
        <use href="#b5e" transform="translate(98.7601 -191.766) rotate(40)"/>
        <use href="#b5e" transform="translate(297.679 -275.185) rotate(80)"/>
        <use href="#b5e" transform="translate(503.681 -211.225) rotate(120)"/>
        <use href="#b5e" transform="translate(620.375 -29.8135) rotate(160)"/>
        <use href="#b5e" transform="translate(593.159 184.165) rotate(-160)"/>
        <use href="#b5e" transform="translate(434.767 330.588) rotate(-120)"/>
        <use href="#b5e" transform="translate(219.313 340.942) rotate(-80)"/>
        <use href="#b5e" transform="translate(47.61 210.383) rotate(-40)"/>
      </g>

    </svg>
  );
}
