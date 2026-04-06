'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export const CrystalButton = ({ href, className }: { href?: string, className?: string }) => {
  const content = (
    <StyledWrapper className={className}>
      <div>
        <label className="area">
          <input type="checkbox" />
          <div className="area-button">
            <svg width={423} height={274} viewBox="0 0 423 274" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M93.3368 136.663C49.6104 128.127 30.5087 134.168 2.08112 145.122" strokeLinecap="round" />
              <path d="M94.6914 170.451C55.042 190.819 43.7361 207.401 28.1198 233.623" strokeLinecap="round" />
              <path d="M147.365 181.074C124.487 219.412 123.652 239.483 124.252 270.021" strokeLinecap="round" />
              <path d="M209.461 179.848L209.461 271.744" strokeLinecap="round" />
              <path d="M271.59 181.074C294.468 219.412 295.303 239.483 294.703 270.021" strokeLinecap="round" />
              <path d="M327.264 170.451C366.913 190.819 378.219 207.401 393.835 233.623" strokeLinecap="round" />
              <path d="M329.618 136.663C373.345 128.127 392.446 134.168 420.874 145.122" strokeLinecap="round" />
              <path d="M328.313 104.665C355.465 69.244 373.772 61.0955 402.313 50.4414" strokeLinecap="round" />
              <path d="M268.666 93.3922C282.624 50.9621 297.219 37.204 320.646 17.6894" strokeLinecap="round" />
              <path d="M209.461 93.5837L209.461 1.68781" strokeLinecap="round" />
              <path d="M150.289 93.3922C136.331 50.9621 121.736 37.204 98.3089 17.6894" strokeLinecap="round" />
              <path d="M93.6422 104.665C66.4898 69.244 48.1828 61.0955 19.6421 50.4414" strokeLinecap="round" />
            </svg>
            <button className="button">
              <div className="wrap">
                <span className="particles">
                  <span className="particle" style={{ '--a': '-45deg', '--x': '53%', '--y': '15%', '--d': '4em', '--f': '0.7', '--t': '0.15' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '150deg', '--x': '40%', '--y': '70%', '--d': '7.5em', '--f': '0.8', '--t': '0.08' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '10deg', '--x': '90%', '--y': '65%', '--d': '7em', '--f': '0.6', '--t': '0.25' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '-120deg', '--x': '15%', '--y': '10%', '--d': '4em' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '-175deg', '--x': '10%', '--y': '25%', '--d': '5.25em', '--f': '0.6', '--t': '0.32' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '-18deg', '--x': '80%', '--y': '25%', '--d': '4.75em', '--f': '0.5', '--t': '0.4' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '-30deg', '--x': '60%', '--y': '45%', '--d': '9em', '--f': '0.9', '--t': '0.5' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '175deg', '--x': '9%', '--y': '30%', '--d': '6em', '--f': '0.95', '--t': '0.6' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '-10deg', '--x': '89%', '--y': '25%', '--d': '4.5em', '--f': '0.55', '--t': '0.67' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '-140deg', '--x': '40%', '--y': '10%', '--d': '5em', '--f': '0.85', '--t': '0.75' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '90deg', '--x': '45%', '--y': '65%', '--d': '4em', '--f': '0.5', '--t': '0.83' } as React.CSSProperties} />
                  <span className="particle" style={{ '--a': '30deg', '--x': '70%', '--y': '80%', '--d': '6.5em', '--f': '0.75', '--t': '0.92' } as React.CSSProperties} />
                </span>
                <div className="electric" />
                <div className="glass" />
                <div className="reflex" />
                <div className="outline">
                  <div className="rainbow" />
                </div>
                <div className="text">
                  <p className="state-1">
                    <span style={{ '--i': 1 } as React.CSSProperties}><span>E</span></span>
                    <span style={{ '--i': 2 } as React.CSSProperties}><span>x</span></span>
                    <span style={{ '--i': 3 } as React.CSSProperties}><span>p</span></span>
                    <span style={{ '--i': 4 } as React.CSSProperties}><span>l</span></span>
                    <span style={{ '--i': 5 } as React.CSSProperties}><span>o</span></span>
                    <span style={{ '--i': 6 } as React.CSSProperties}><span>r</span></span>
                    <span style={{ '--i': 7 } as React.CSSProperties}><span>e</span></span>
                    <span style={{ '--i': 8 } as React.CSSProperties}><span>G</span></span>
                    <span style={{ '--i': 9 } as React.CSSProperties}><span>a</span></span>
                    <span style={{ '--i': 10 } as React.CSSProperties}><span>m</span></span>
                    <span style={{ '--i': 11 } as React.CSSProperties}><span>e</span></span>
                    <span style={{ '--i': 12 } as React.CSSProperties}><span>s</span></span>
                  </p>
                  <p className="state-2">
                    <span style={{ '--i': 1 } as React.CSSProperties}><span>L</span></span>
                    <span style={{ '--i': 2 } as React.CSSProperties}><span>e</span></span>
                    <span style={{ '--i': 3 } as React.CSSProperties}><span>t</span></span>
                    <span style={{ '--i': 4 } as React.CSSProperties}><span>'</span></span>
                    <span style={{ '--i': 5 } as React.CSSProperties}><span>s</span></span>
                    <span style={{ '--i': 6 } as React.CSSProperties}><span>P</span></span>
                    <span style={{ '--i': 7 } as React.CSSProperties}><span>l</span></span>
                    <span style={{ '--i': 8 } as React.CSSProperties}><span>a</span></span>
                    <span style={{ '--i': 9 } as React.CSSProperties}><span>y</span></span>
                    <span style={{ '--i': 9 } as React.CSSProperties}><span>!</span></span>
                  </p>
                </div>
                <div className="liquid">
                  <div className="wave" />
                </div>
                <div className="bg" />
              </div>
            </button>
          </div>
        </label>
        <svg className="svg-turbulence" aria-hidden="true" width={0} height={0}>
          <defs>
            <filter id="turbulent-displace-0" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={1} result="n1" />
              <feOffset in="n1" dx={0} dy={140} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={1} result="n2" />
              <feOffset in="n2" dx={0} dy={-140} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={2} result="n3" />
              <feOffset in="n3" dx={98} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={2} result="n4" />
              <feOffset in="n4" dx={-98} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={16} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-1" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={3} result="n1" />
              <feOffset in="n1" dx={0} dy={220} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={3} result="n2" />
              <feOffset in="n2" dx={0} dy={-220} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={4} result="n3" />
              <feOffset in="n3" dx={160} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={4} result="n4" />
              <feOffset in="n4" dx={-160} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={18} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-2" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={5} result="n1" />
              <feOffset in="n1" dx={0} dy={310} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={5} result="n2" />
              <feOffset in="n2" dx={0} dy={-310} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={6} result="n3" />
              <feOffset in="n3" dx={230} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={6} result="n4" />
              <feOffset in="n4" dx={-230} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={20} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-3" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={7} result="n1" />
              <feOffset in="n1" dx={0} dy={420} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={7} result="n2" />
              <feOffset in="n2" dx={0} dy={-420} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={8} result="n3" />
              <feOffset in="n3" dx={320} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={8} result="n4" />
              <feOffset in="n4" dx={-320} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={22} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-4" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={9} result="n1" />
              <feOffset in="n1" dx={0} dy={540} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={9} result="n2" />
              <feOffset in="n2" dx={0} dy={-540} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={10} result="n3" />
              <feOffset in="n3" dx={410} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={10} result="n4" />
              <feOffset in="n4" dx={-410} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={24} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-5" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.024" numOctaves={8} seed={11} result="n1" />
              <feOffset in="n1" dx={0} dy={660} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.024" numOctaves={8} seed={11} result="n2" />
              <feOffset in="n2" dx={0} dy={-660} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.017" numOctaves={9} seed={12} result="n3" />
              <feOffset in="n3" dx={490} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.017" numOctaves={9} seed={12} result="n4" />
              <feOffset in="n4" dx={-490} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={26} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-6" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={13} result="n1" />
              <feOffset in="n1" dx={0} dy={780} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={13} result="n2" />
              <feOffset in="n2" dx={0} dy={-780} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={14} result="n3" />
              <feOffset in="n3" dx={600} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={14} result="n4" />
              <feOffset in="n4" dx={-600} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={28} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-7" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={15} result="n1" />
              <feOffset in="n1" dx={0} dy={900} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={15} result="n2" />
              <feOffset in="n2" dx={0} dy={-900} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={16} result="n3" />
              <feOffset in="n3" dx={720} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={16} result="n4" />
              <feOffset in="n4" dx={-720} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={30} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-8" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={17} result="n1" />
              <feOffset in="n1" dx={0} dy={1040} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={17} result="n2" />
              <feOffset in="n2" dx={0} dy={-1040} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={18} result="n3" />
              <feOffset in="n3" dx={860} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={18} result="n4" />
              <feOffset in="n4" dx={-860} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={31} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-9" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={19} result="n1" />
              <feOffset in="n1" dx={0} dy={1180} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={19} result="n2" />
              <feOffset in="n2" dx={0} dy={-1180} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={20} result="n3" />
              <feOffset in="n3" dx={980} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={20} result="n4" />
              <feOffset in="n4" dx={-980} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={29} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-10" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={21} result="n1" />
              <feOffset in="n1" dx={0} dy={1320} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={21} result="n2" />
              <feOffset in="n2" dx={0} dy={-1320} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.024" numOctaves={8} seed={22} result="n3" />
              <feOffset in="n3" dx={1120} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.024" numOctaves={8} seed={22} result="n4" />
              <feOffset in="n4" dx={-1120} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={33} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-11" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={23} result="n1" />
              <feOffset in="n1" dx={0} dy={1460} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.021" numOctaves={9} seed={23} result="n2" />
              <feOffset in="n2" dx={0} dy={-1460} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={24} result="n3" />
              <feOffset in="n3" dx={1260} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={24} result="n4" />
              <feOffset in="n4" dx={-1260} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={31} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-12" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={25} result="n1" />
              <feOffset in="n1" dx={0} dy={1600} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={25} result="n2" />
              <feOffset in="n2" dx={0} dy={-1600} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={26} result="n3" />
              <feOffset in="n3" dx={1400} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={26} result="n4" />
              <feOffset in="n4" dx={-1400} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={34} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-13" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={27} result="n1" />
              <feOffset in="n1" dx={0} dy={1740} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.019" numOctaves={9} seed={27} result="n2" />
              <feOffset in="n2" dx={0} dy={-1740} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={28} result="n3" />
              <feOffset in="n3" dx={1540} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.023" numOctaves={8} seed={28} result="n4" />
              <feOffset in="n4" dx={-1540} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={31} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-14" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.024" numOctaves={8} seed={29} result="n1" />
              <feOffset in="n1" dx={0} dy={1880} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.024" numOctaves={8} seed={29} result="n2" />
              <feOffset in="n2" dx={0} dy={-1880} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={30} result="n3" />
              <feOffset in="n3" dx={1680} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves={9} seed={30} result="n4" />
              <feOffset in="n4" dx={-1680} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={34} xChannelSelector="R" yChannelSelector="B" />
            </filter>
            <filter id="turbulent-displace-15" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="260px" height="520px">
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={31} result="n1" />
              <feOffset in="n1" dx={0} dy={2020} result="o1" />
              <feTurbulence type="turbulence" baseFrequency="0.020" numOctaves={9} seed={31} result="n2" />
              <feOffset in="n2" dx={0} dy={-2020} result="o2" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={32} result="n3" />
              <feOffset in="n3" dx={1820} dy={0} result="o3" />
              <feTurbulence type="turbulence" baseFrequency="0.022" numOctaves={8} seed={32} result="n4" />
              <feOffset in="n4" dx={-1820} dy={0} result="o4" />
              <feComposite in="o1" in2="o2" result="p1" />
              <feComposite in="o3" in2="o4" result="p2" />
              <feBlend in="p1" in2="p2" mode="color-dodge" result="cn" />
              <feDisplacementMap in="SourceGraphic" in2="cn" scale={32} xChannelSelector="R" yChannelSelector="B" />
            </filter>
          </defs>
        </svg>
      </div>
    </StyledWrapper>
  );

  if (href) {
    return <Link href={href} style={{ display: 'inline-block' }}>{content}</Link>;
  }
  return content;
};

const StyledWrapper = styled.div`
  /* stackblitz.com/edit/button-mastery-13 */
  @keyframes turbulentSwap {
    0% {
      filter: url(#turbulent-displace-0);
    }
    6.25% {
      filter: url(#turbulent-displace-1);
    }
    12.5% {
      filter: url(#turbulent-displace-2);
    }
    18.75% {
      filter: url(#turbulent-displace-3);
    }
    25% {
      filter: url(#turbulent-displace-4);
    }
    31.25% {
      filter: url(#turbulent-displace-5);
    }
    37.5% {
      filter: url(#turbulent-displace-6);
    }
    43.75% {
      filter: url(#turbulent-displace-7);
    }
    50% {
      filter: url(#turbulent-displace-8);
    }
    56.25% {
      filter: url(#turbulent-displace-9);
    }
    62.5% {
      filter: url(#turbulent-displace-10);
    }
    68.75% {
      filter: url(#turbulent-displace-11);
    }
    75% {
      filter: url(#turbulent-displace-12);
    }
    81.25% {
      filter: url(#turbulent-displace-13);
    }
    87.5% {
      filter: url(#turbulent-displace-14);
    }
    93.75% {
      filter: url(#turbulent-displace-15);
    }
    100% {
      filter: url(#turbulent-displace-0);
    }
  }

  .area {
    --radius: 50px;
    perspective: 40px;
    cursor: pointer;
    user-select: none;
  }

  .area > svg {
    position: absolute;
    pointer-events: none;
    left: 50%;
    transform: translateX(-50%);
  }
  .area input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .particles {
    --m: 1;
    position: absolute;
    inset: 0;
    z-index: 10;
    transition: opacity 0.5s ease;
    opacity: 0;
  }

  .particle {
    --f: 1;
    display: grid;
    position: absolute;
    left: var(--x);
    top: var(--y);
    rotate: var(--a);
    filter: blur(2px);
  }

  .particle::before {
    content: "";
    grid-area: 1/1;
    width: 15px;
    height: 3px;
    transform-origin: 0 0;
    mix-blend-mode: overlay;
    background: rgb(154, 77, 241);
    animation: particleMove calc(var(--m) * 0.5s) linear
      calc(var(--m) * var(--t, 0) * 1.2s) infinite;
    opacity: 0;
    transform: translateX(0) rotate(-45deg) skew(45deg, 45deg) scale(var(--f));
  }

  .rainbow {
    width: 100%;
    height: 130px;
    position: absolute;
    z-index: 9;
    top: 50%;
    left: 0;
    right: 0;
    --stripes: repeating-linear-gradient(
      100deg,
      #fff 0%,
      #fff 7%,
      transparent 10%,
      transparent 12%,
      #fff 16%
    );
    --rainbow: repeating-linear-gradient(
      100deg,
      #60a5fa 10%,
      #f9799c 15%,
      #60a5fa 20%,
      #5eeabd 25%,
      #60a5fa 30%
    );
    background-image: var(--stripes), var(--rainbow);
    background-size: 300%, 200%;
    background-position:
      50% 50%,
      50% 50%;
    filter: invert(100%);
    mix-blend-mode: overlay;
    mask-image: radial-gradient(ellipse at 50%, black 40%, transparent 70%);

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image: var(--stripes), var(--rainbow);
      background-size: 200%, 100%;
      animation: rainbowBg 60s linear infinite;
      background-attachment: fixed;
      mix-blend-mode: difference;
    }
  }

  .svg-turbulence {
    position: absolute;
    pointer-events: none;
  }
  .electric {
    border-radius: var(--radius);
    border: 2px solid white;
    filter: url(#turbulent-displace-0);
    animation: turbulentSwap 1.5s infinite;
    position: absolute;
    right: 0;
    bottom: 0;
    top: -8px;
    left: -8px;
    opacity: 0;
    transition: all 0.6s ease;
    z-index: 10;
    mix-blend-mode: overlay;
    transform: scale(1.1);
  }

  .glass {
    position: absolute;
    inset: 0;
    z-index: 9;
    pointer-events: none;
    overflow: hidden;
    border-radius: var(--radius);
    transition: all 0.5s ease;
  }

  .glass::before,
  .glass::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease;
  }
  .glass::before {
    transform: skewX(70deg) rotate(347deg) translate(-45px, -54px);
  }
  .glass::after {
    transform: skewX(65deg) rotate(347deg) translate(115px, -14px);
  }
  .area:hover .glass {
    transform: translateX(-10px);
  }
  .area:hover .glass::before {
    transform: skewX(70deg) rotate(347deg) translate(-30px, -56px);
  }
  .area:hover .glass::after {
    transform: skewX(65deg) rotate(347deg) translate(85px, -14px);
  }

  .area-button > svg {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
    z-index: 9;
    opacity: 0;
    color: #9a4df1;
    pointer-events: none;
    stroke-width: 2px;
    stroke-dasharray: 0 173;
    stroke-dashoffset: 174;
    filter: blur(1px);
  }

  .button {
    outline: none;
    cursor: pointer;
    border: 0;
    font-size: 26px;
    border-radius: var(--radius);
    position: relative;
    width: 290px;
    height: 80px;
    pointer-events: none;
    transition:
      background-color,
      0.5s linear,
      box-shadow 0.5s ease,
      transform 0.5s ease;
    box-shadow:
      0 -10px 30px rgba(57, 20, 115, 0.3),
      0 20px 30px rgba(57, 20, 115, 0.4),
      inset 0 0 2px 0 black;
    background: linear-gradient(to bottom, #000000 80%, #f2f2f2 100%);
  }

  .wrap {
    border-radius: calc(var(--radius) * 0.85);
    height: 100%;
    transform: translate(0px, -4px);
    background: linear-gradient(
      to bottom,
      #d0d0d05e 0%,
      #ffffff 50%,
      #000000 100%
    );
    position: relative;
    transition: all 0.5s ease;
  }

  .reflex {
    position: absolute;
    z-index: 9;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
  }
  .reflex:before {
    content: "";
    position: absolute;
    width: 350px;
    background-color: rgba(255, 255, 255, 0.2);
    background: linear-gradient(
      to right,
      rgba(244, 221, 255, 0.1) 10%,
      rgba(244, 221, 255, 0.5) 60%,
      rgba(244, 221, 255, 0.3) 60%,
      rgba(244, 221, 255, 0.1) 90%
    );
    top: -40%;
    bottom: -40%;
    left: -140%;
    opacity: 1;
    transition: all 0.6s cubic-bezier(0.5, 0, 0.3, 1);
    transform: translate(250%, 0) skew(30deg);
  }
  .area:hover .reflex:before {
    transform: translateX(0) skew(-30deg);
    opacity: 0.7;
  }

  .area input:checked + .area-button .reflex:before {
    transform: translate(250%, 0) skew(30deg);
    opacity: 1;
  }

  .outline {
    position: absolute;
    overflow: hidden;
    outline: none;
    border-radius: inherit;
    transition: all 0.4s ease;
    inset: -2px;
    bottom: -4px;
    filter: blur(1px);
  }
  .outline::before {
    content: "";
    position: absolute;
    inset: 5px;
    width: 120px;
    height: 300px;
    margin: auto;
    background: linear-gradient(
      to right,
      transparent 0%,
      white 50%,
      transparent 100%
    );
    animation: spin 4s linear infinite;
  }

  .bg {
    z-index: 1;
    position: absolute;
    inset: 5px;
    transition: all 0.3s ease;
    overflow: hidden;
    border-radius: calc(var(--radius) * 0.85);
  }

  .bg::before,
  .bg::after {
    content: "";
    inset: 0;
    position: absolute;
    transition: all 1s ease;
    z-index: -1;
    filter: blur(4px);
  }
  .bg::before {
    background: linear-gradient(
      6deg,
      #000000 0%,
      #181c40 44%,
      #121c71 48%,
      #bb4c8f 57%,
      #bb4c8f 59%,
      #c5996e 62%,
      #badeee 79%,
      #83cafb 90%
    );
  }

  .text {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    position: relative;
    height: 100%;
    font-size: 23px;
    font-weight: 500;
    transition: all 0.3s ease;
    overflow: hidden;
    border-radius: calc(var(--radius) * 0.85);
    box-shadow:
      inset -6px -2px 2px -2px rgb(0 0 0 / 79%),
      inset 6px -7px 2px -2px rgb(0 0 0 / 79%),
      inset -1px 1px 4px 4px rgb(255 255 255 / 82%),
      inset 1px 4px 5px #005880;
  }
  .text p {
    position: absolute;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: -3px;
  }
  .text span {
    display: inline-block;
  }
  .text span > span {
    animation: waveText 2.2s cubic-bezier(0.45, 0, 0.55, 1)
      calc(var(--i) * -0.13s) infinite;
    animation-play-state: paused;
  }
  .area:hover .text span > span {
    animation-play-state: running;
  }

  .area:active .text {
    box-shadow:
      inset -6px -2px 2px -2px rgb(0 0 0 / 79%),
      inset 6px -7px 2px -2px rgb(0 0 0 / 79%),
      inset -1px 1px 4px 4px rgb(255 255 255 / 82%),
      inset 1px 4px 5px #005880,
      inset 1px 3px 20px rgba(13, 0, 101, 0.7),
      inset 1px -10px 20px rgba(129, 49, 101, 0.338);
  }

  .text p.state-1 > span {
    opacity: 1;
  }
  .text p.state-2 > span {
    opacity: 0;
  }

  .liquid {
    position: absolute;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
    transition: 0.5s;
    z-index: 2;
    inset: 2px;
    overflow: hidden;
    border-radius: inherit;
  }
  .liquid .wave {
    position: absolute;
    inset: 0;
    margin: auto;
    transition: transform 0.8s cubic-bezier(0.5, -0.5, 0.5, 1.5);
    filter: blur(4px);
    top: 790px;
    left: -80px;
  }
  .liquid .wave::before {
    content: "";
    width: 1000px;
    height: 1000px;
    position: absolute;
    left: 50%;
    border-radius: 48%;
    background: radial-gradient(white 50%, #03081b 70%);
    animation: wave 5s linear infinite;
    opacity: 0.5;
    filter: blur(2px);
    top: -8px;
  }

  @keyframes waveText {
    0% {
      transform: translateX(-5px) rotate(8deg);
      opacity: 0.7;
    }
    60% {
      opacity: 1;
      transform: translateY(3px) translateX(2px) rotate(0);
    }
    100% {
      transform: translateX(-5px) rotate(8deg);
      opacity: 0.7;
    }
  }

  @keyframes particleMove {
    0% {
      transform: translateX(var(--d)) rotate(-45deg) skew(0deg, 0deg)
        scale(var(--f));
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: translateX(0) rotate(-45deg) skew(45deg, 45deg) scale(var(--f));
    }
  }

  @keyframes rainbowBg {
    from {
      background-position:
        50% 50%,
        50% 50%;
    }
    to {
      background-position:
        350% 50%,
        350% 50%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes wave {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  @keyframes splash {
    0%,
    62% {
      opacity: 0.5;
      transform: scale(0);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  @keyframes appear {
    0% {
      transform: translateY(-40px) rotate(-90deg);
      filter: blur(10px);
    }
    30% {
      transform: translateY(7px) rotate(0);
    }
    60% {
      filter: blur(0);
      transform: translateY(-5px) rotate(0);
      opacity: 1;
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotate(0);
    }
  }

  @keyframes disappear {
    0% {
      opacity: 1;
    }
    100% {
      transform: translateY(40px);
      filter: blur(6px);
      opacity: 0;
      color: black;
    }
  }

  @keyframes splashFeedback {
    to {
      stroke-dasharray: 10 110;
      stroke-dashoffset: 80;
      opacity: 0;
    }
  }

  @keyframes splashFeedback2 {
    to {
      stroke-dasharray: 10 110;
      stroke-dashoffset: 80;
      opacity: 0;
    }
  }

  /** STATES */

  .area .state-1 span:nth-child(7),
  .area .state-2 span:nth-child(5) {
    margin-right: 10px;
  }

  .area input:checked + .area-button > svg {
    animation: splashFeedback 0.7s cubic-bezier(0.18, 0.94, 1, 1) forwards;
  }

  .area input:checked + .area-button .electric {
    opacity: 1;
    transform: scale(1);
  }

  .area:hover .particles {
    opacity: 1;
  }

  .area input:checked + .area-button .particles {
    opacity: 0;
  }

  .area:hover .button {
    transform: translate(0px, -4px);
  }
  .area:active .wrap {
    transform: translate(0);
  }

  .area:hover .outline {
    opacity: 1;
  }
  .area:hover .liquid .wave {
    transform: translateY(-5px);
  }

  .area input:checked + .area-button p.state-1 > span {
    opacity: 1;
    animation: disappear 0.6s ease forwards calc(var(--i) * 0.05s);
  }
  .area input:checked + .area-button p.state-2 > span {
    opacity: 0;
    animation: appear 1.5s ease forwards calc(var(--i) * 0.1s);
  }

  @media (max-width: 768px) {
    .liquid {
      display: none;
    }
  }
`;
