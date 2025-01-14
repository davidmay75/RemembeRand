
<template>
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <radialGradient id="sphereGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#9d00ff" />
        <stop offset="70%" stop-color="#6a0dad" />
        <stop offset="100%" stop-color="#4b0082" />
      </radialGradient>

      <linearGradient id="toxicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#39FF14" />
        <stop offset="100%" stop-color="#00FF00" />
      </linearGradient>

      <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF8C00" />
        <stop offset="100%" stop-color="#FFA500" />
      </linearGradient>

      <!-- Matrix text pattern -->
      <pattern id="matrix-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <text x="0" y="5" fill="#39FF14" fill-opacity="0.2" font-family="monospace" font-size="4">1</text>
        <text x="5" y="8" fill="#39FF14" fill-opacity="0.2" font-family="monospace" font-size="4">0</text>
      </pattern>

      <!-- Clip path for the main circle -->
      <clipPath id="circleClip">
        <circle cx="50" cy="50" r="40" />
      </clipPath>
    </defs>

    <!-- Matrix rain background (clipped to circle) -->
    <g clip-path="url(#circleClip)">
      <!-- Multiple columns of falling text -->
      <g fill="#39FF14" font-family="monospace">
      <!-- <g fill="#39FF14" font-family="monospace" opacity=""> -->
        <!-- Column 1 -->
        <text x="20" y="30" font-size="4">10110</text>
        <text x="20" y="40" font-size="4">01001</text>
        <text x="20" y="50" font-size="4">11010</text>
        <text x="20" y="60" font-size="4">00101</text>
        <text x="20" y="70" font-size="4">10110</text>

        <!-- Column 2 -->
        <text x="35" y="25" font-size="4">01101</text>
        <text x="35" y="35" font-size="4">10010</text>
        <text x="35" y="45" font-size="4">11001</text>
        <text x="35" y="55" font-size="4">00110</text>
        <text x="35" y="65" font-size="4">10101</text>

        <!-- Column 3 -->
        <text x="50" y="20" font-size="4">11010</text>
        <text x="50" y="30" font-size="4">00101</text>
        <text x="50" y="40" font-size="4">10110</text>
        <text x="50" y="50" font-size="4">01001</text>
        <text x="50" y="60" font-size="4">11010</text>

        <!-- Column 4 -->
        <text x="65" y="35" font-size="4">10101</text>
        <text x="65" y="45" font-size="4">01010</text>
        <text x="65" y="55" font-size="4">10101</text>
        <text x="65" y="65" font-size="4">01010</text>
        <text x="65" y="75" font-size="4">10101</text>

        <!-- Column 5 -->
        <text x="80" y="30" font-size="4">01010</text>
        <text x="80" y="40" font-size="4">10101</text>
        <text x="80" y="50" font-size="4">01010</text>
        <text x="80" y="60" font-size="4">10101</text>
        <text x="80" y="70" font-size="4">01010</text>
      </g>
    </g>

    <!-- Main sphere -->
    <circle cx="50" cy="50" r="40" fill="url(#sphereGradient)" filter="url(#glow)" stroke="#39FF14" stroke-width="1.5"
      fill-opacity="0.9" />

    <!-- Tech circuit lines -->
    <path d="M 30 50 L 10 50 M 70 50 L 90 50" stroke="url(#orangeGradient)" stroke-width="2" filter="url(#glow)" />

    <!-- Hazard symbols -->
    <g fill="url(#toxicGradient)" filter="url(#glow)">
      <circle cx="35" cy="40" r="8" />
      <circle cx="65" cy="40" r="8" />
      <circle cx="50" cy="65" r="8" />
    </g>

    <!-- Circuit dots -->
    <g fill="#FFA500" filter="url(#glow)">
      <circle cx="35" cy="40" r="2" />
      <circle cx="65" cy="40" r="2" />
      <circle cx="50" cy="65" r="2" />
    </g>

    <!-- Tech details -->
    <g stroke="#39FF14" stroke-width="1" fill="none">
      <path d="M 20 30 L 30 30 L 35 35" />
      <path d="M 80 30 L 70 30 L 65 35" />
      <path d="M 50 85 L 50 75" />
    </g>

    <!-- Additional orange accent lines -->
    <g stroke="url(#orangeGradient)" stroke-width="0.75" fill="none">
      <path d="M 25 70 L 35 70 L 40 65" filter="url(#glow)" />
      <path d="M 75 70 L 65 70 L 60 65" filter="url(#glow)" />
    </g>
  </svg>
</template>
