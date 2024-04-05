<template>
  <svg
    id="svg"
    viewBox="0 0 1440 390"
    xmlns="http://www.w3.org/2000/svg"
    class="transition duration-300 ease-in-out delay-150"
    preserveAspectRatio="xMinYMin meet"
    :style="styles"
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="5%" :stop-color="colors.primary"></stop>
        <stop offset="95%" :stop-color="colors.primaryLight"></stop>
      </linearGradient>
    </defs>
    <path
      d="M 0,400 L 0,100 C 79.11961722488039,125.32057416267943 158.23923444976077,150.64114832535887 262,149 C 365.7607655502392,147.35885167464113 494.16267942583715,118.75598086124403 589,121 C 683.8373205741628,123.24401913875597 745.1100478468901,156.33492822966505 837,147 C 928.8899521531099,137.66507177033495 1051.3971291866028,85.90430622009569 1157,71 C 1262.6028708133972,56.0956937799043 1351.3014354066986,78.04784688995215 1440,100 L 1440,400 L 0,400 Z"
      stroke="none"
      stroke-width="0"
      fill="url(#gradient)"
      fill-opacity="0.53"
      class="transition-all duration-300 ease-in-out delay-150 path-0"
    ></path>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="5%" :stop-color="colors.primary"></stop>
        <stop offset="95%" :stop-color="colors.primaryLight"></stop>
      </linearGradient>
    </defs>
    <path
      d="M 0,400 L 0,233 C 111.11004784688996,230.85645933014354 222.2200956937799,228.7129186602871 318,217 C 413.7799043062201,205.2870813397129 494.2296650717702,184.00478468899522 594,198 C 693.7703349282298,211.99521531100478 812.8612440191389,261.26794258373207 908,259 C 1003.1387559808611,256.73205741626793 1074.3253588516748,202.92344497607655 1159,190 C 1243.6746411483252,177.07655502392345 1341.8373205741627,205.03827751196172 1440,233 L 1440,400 L 0,400 Z"
      stroke="none"
      stroke-width="0"
      fill="url(#gradient)"
      fill-opacity="1"
      class="transition-all duration-300 ease-in-out delay-150 path-1"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { useColors } from '@/ts/colors';
import type { SvgImage } from './types';

const colors = useColors();

defineProps<SvgImage>();
</script>

<style scoped></style>
