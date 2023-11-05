// Color pallets https://coolors.co
// Schemas @ https://callstack.github.io/react-native-paper/docs/guides/theming/#creating-dynamic-theme-colors
// Names https://randomwordgenerator.com/

import { nanoid } from '@reduxjs/toolkit';

/**
 * https://coolors.co/05668d-028090-00a896-02c39a-f0f3bd
 * PRIMARY #05668d
 * SECONDARY #028090
 * TERTIARY #62597c
 *
 * */

const themes = {};

const makeTheme = (light, dark) => {
  const id = nanoid();
  const theme = {
    light: { id, variant: 'light', ...light },
    dark: { id, variant: 'dark', ...dark },
  };

  themes[id] = theme;
  return theme;
};

const _inverse = {
  light: 'dark',
  dark: 'light',
};

export const getInverseTheme = theme => {
  if (!theme.id || !theme.variant) {
    return theme;
  }

  const parent = themes[theme.id];

  return parent[_inverse[theme.variant]];
};

export const articulate = makeTheme(
  {
    colors: {
      primary: 'rgb(0, 101, 140)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(198, 231, 255)',
      onPrimaryContainer: 'rgb(0, 30, 45)',
      secondary: 'rgb(0, 104, 118)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(158, 239, 255)',
      onSecondaryContainer: 'rgb(0, 31, 36)',
      tertiary: 'rgb(98, 89, 124)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(232, 222, 255)',
      onTertiaryContainer: 'rgb(30, 23, 53)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(251, 252, 255)',
      onBackground: 'rgb(25, 28, 30)',
      surface: 'rgb(251, 252, 255)',
      onSurface: 'rgb(25, 28, 30)',
      surfaceVariant: 'rgb(221, 227, 234)',
      onSurfaceVariant: 'rgb(65, 72, 77)',
      outline: 'rgb(113, 120, 126)',
      outlineVariant: 'rgb(193, 199, 206)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(46, 49, 51)',
      inverseOnSurface: 'rgb(240, 241, 243)',
      inversePrimary: 'rgb(129, 207, 255)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(238, 244, 249)',
        level2: 'rgb(231, 240, 246)',
        level3: 'rgb(223, 235, 242)',
        level4: 'rgb(221, 234, 241)',
        level5: 'rgb(216, 231, 239)',
      },
      surfaceDisabled: 'rgba(25, 28, 30, 0.12)',
      onSurfaceDisabled: 'rgba(25, 28, 30, 0.38)',
      backdrop: 'rgba(43, 49, 54, 0.4)',
    },
  },
  {
    colors: {
      primary: 'rgb(129, 207, 255)',
      onPrimary: 'rgb(0, 52, 75)',
      primaryContainer: 'rgb(0, 76, 107)',
      onPrimaryContainer: 'rgb(198, 231, 255)',
      secondary: 'rgb(81, 215, 238)',
      onSecondary: 'rgb(0, 54, 62)',
      secondaryContainer: 'rgb(0, 78, 89)',
      onSecondaryContainer: 'rgb(158, 239, 255)',
      tertiary: 'rgb(206, 189, 255)',
      onTertiary: 'rgb(54, 31, 115)',
      tertiaryContainer: 'rgb(77, 56, 139)',
      onTertiaryContainer: 'rgb(232, 221, 255)',
      error: 'rgb(255, 180, 171)',
      onError: 'rgb(105, 0, 5)',
      errorContainer: 'rgb(147, 0, 10)',
      onErrorContainer: 'rgb(255, 180, 171)',
      background: 'rgb(25, 28, 30)',
      onBackground: 'rgb(225, 226, 229)',
      surface: 'rgb(25, 28, 30)',
      onSurface: 'rgb(225, 226, 229)',
      surfaceVariant: 'rgb(65, 72, 77)',
      onSurfaceVariant: 'rgb(193, 199, 206)',
      outline: 'rgb(139, 146, 152)',
      outlineVariant: 'rgb(65, 72, 77)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(225, 226, 229)',
      inverseOnSurface: 'rgb(46, 49, 51)',
      inversePrimary: 'rgb(0, 101, 140)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(30, 37, 41)',
        level2: 'rgb(33, 42, 48)',
        level3: 'rgb(36, 48, 55)',
        level4: 'rgb(38, 50, 57)',
        level5: 'rgb(40, 53, 62)',
      },
      surfaceDisabled: 'rgba(225, 226, 229, 0.12)',
      onSurfaceDisabled: 'rgba(225, 226, 229, 0.38)',
      backdrop: 'rgba(43, 49, 54, 0.4)',
    },
  },
);

/**
 * https://coolors.co/845a6d-3e1929-6e75a8-8d91c7-b0daf1
 * PRIMARY #6e75a8
 * SECONDARY #a2abab
 * TERTIARY #3e1929
 */

export const intelligence = makeTheme(
  {
    colors: {
      primary: 'rgb(75, 87, 169)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(223, 224, 255)',
      onPrimaryContainer: 'rgb(0, 14, 94)',
      secondary: 'rgb(0, 105, 109)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(111, 246, 252)',
      onSecondaryContainer: 'rgb(0, 32, 33)',
      tertiary: 'rgb(151, 64, 103)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(255, 217, 228)',
      onTertiaryContainer: 'rgb(62, 0, 33)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(255, 251, 255)',
      onBackground: 'rgb(27, 27, 31)',
      surface: 'rgb(255, 251, 255)',
      onSurface: 'rgb(27, 27, 31)',
      surfaceVariant: 'rgb(227, 225, 236)',
      onSurfaceVariant: 'rgb(70, 70, 79)',
      outline: 'rgb(118, 118, 128)',
      outlineVariant: 'rgb(199, 197, 208)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(48, 48, 52)',
      inverseOnSurface: 'rgb(243, 240, 244)',
      inversePrimary: 'rgb(187, 195, 255)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(246, 243, 251)',
        level2: 'rgb(241, 238, 248)',
        level3: 'rgb(235, 233, 246)',
        level4: 'rgb(233, 231, 245)',
        level5: 'rgb(230, 228, 243)',
      },
      surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
      onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
      backdrop: 'rgba(47, 48, 56, 0.4)',
    },
  },
  {
    colors: {
      primary: 'rgb(187, 195, 255)',
      onPrimary: 'rgb(25, 39, 120)',
      primaryContainer: 'rgb(50, 63, 144)',
      onPrimaryContainer: 'rgb(223, 224, 255)',
      secondary: 'rgb(76, 217, 223)',
      onSecondary: 'rgb(0, 55, 57)',
      secondaryContainer: 'rgb(0, 79, 82)',
      onSecondaryContainer: 'rgb(111, 246, 252)',
      tertiary: 'rgb(255, 176, 205)',
      onTertiary: 'rgb(93, 17, 56)',
      tertiaryContainer: 'rgb(122, 41, 79)',
      onTertiaryContainer: 'rgb(255, 217, 228)',
      error: 'rgb(255, 180, 171)',
      onError: 'rgb(105, 0, 5)',
      errorContainer: 'rgb(147, 0, 10)',
      onErrorContainer: 'rgb(255, 180, 171)',
      background: 'rgb(27, 27, 31)',
      onBackground: 'rgb(228, 225, 230)',
      surface: 'rgb(27, 27, 31)',
      onSurface: 'rgb(228, 225, 230)',
      surfaceVariant: 'rgb(70, 70, 79)',
      onSurfaceVariant: 'rgb(199, 197, 208)',
      outline: 'rgb(144, 144, 154)',
      outlineVariant: 'rgb(70, 70, 79)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(228, 225, 230)',
      inverseOnSurface: 'rgb(48, 48, 52)',
      inversePrimary: 'rgb(75, 87, 169)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(35, 35, 42)',
        level2: 'rgb(40, 40, 49)',
        level3: 'rgb(45, 46, 56)',
        level4: 'rgb(46, 47, 58)',
        level5: 'rgb(49, 51, 62)',
      },
      surfaceDisabled: 'rgba(228, 225, 230, 0.12)',
      onSurfaceDisabled: 'rgba(228, 225, 230, 0.38)',
      backdrop: 'rgba(47, 48, 56, 0.4)',
    },
  },
);

/**
 * PRIMARY #29524a
 * SECONDARY #94a187
 * TERTIARY #3e1929
 */
export const conservation = makeTheme(
  {
    colors: {
      primary: 'rgb(0, 107, 93)',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(118, 248, 224)',
      onPrimaryContainer: 'rgb(0, 32, 27)',
      secondary: 'rgb(59, 106, 28)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(187, 242, 148)',
      onSecondaryContainer: 'rgb(10, 33, 0)',
      tertiary: 'rgb(151, 64, 103)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(255, 217, 228)',
      onTertiaryContainer: 'rgb(62, 0, 33)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(250, 253, 250)',
      onBackground: 'rgb(25, 28, 27)',
      surface: 'rgb(250, 253, 250)',
      onSurface: 'rgb(25, 28, 27)',
      surfaceVariant: 'rgb(218, 229, 225)',
      onSurfaceVariant: 'rgb(63, 73, 70)',
      outline: 'rgb(111, 121, 118)',
      outlineVariant: 'rgb(190, 201, 197)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(45, 49, 48)',
      inverseOnSurface: 'rgb(239, 241, 239)',
      inversePrimary: 'rgb(87, 219, 196)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(238, 246, 242)',
        level2: 'rgb(230, 241, 237)',
        level3: 'rgb(223, 237, 233)',
        level4: 'rgb(220, 236, 231)',
        level5: 'rgb(215, 233, 228)',
      },
      surfaceDisabled: 'rgba(25, 28, 27, 0.12)',
      onSurfaceDisabled: 'rgba(25, 28, 27, 0.38)',
      backdrop: 'rgba(41, 50, 48, 0.4)',
    },
  },
  {
    colors: {
      primary: 'rgb(87, 219, 196)',
      onPrimary: 'rgb(0, 55, 48)',
      primaryContainer: 'rgb(0, 80, 70)',
      onPrimaryContainer: 'rgb(118, 248, 224)',
      secondary: 'rgb(160, 213, 122)',
      onSecondary: 'rgb(22, 56, 0)',
      secondaryContainer: 'rgb(36, 81, 3)',
      onSecondaryContainer: 'rgb(187, 242, 148)',
      tertiary: 'rgb(255, 176, 205)',
      onTertiary: 'rgb(93, 17, 56)',
      tertiaryContainer: 'rgb(122, 41, 79)',
      onTertiaryContainer: 'rgb(255, 217, 228)',
      error: 'rgb(255, 180, 171)',
      onError: 'rgb(105, 0, 5)',
      errorContainer: 'rgb(147, 0, 10)',
      onErrorContainer: 'rgb(255, 180, 171)',
      background: 'rgb(25, 28, 27)',
      onBackground: 'rgb(224, 227, 225)',
      surface: 'rgb(25, 28, 27)',
      onSurface: 'rgb(224, 227, 225)',
      surfaceVariant: 'rgb(63, 73, 70)',
      onSurfaceVariant: 'rgb(190, 201, 197)',
      outline: 'rgb(137, 147, 143)',
      outlineVariant: 'rgb(63, 73, 70)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(224, 227, 225)',
      inverseOnSurface: 'rgb(45, 49, 48)',
      inversePrimary: 'rgb(0, 107, 93)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(28, 38, 35)',
        level2: 'rgb(30, 43, 41)',
        level3: 'rgb(32, 49, 46)',
        level4: 'rgb(32, 51, 47)',
        level5: 'rgb(34, 55, 51)',
      },
      surfaceDisabled: 'rgba(224, 227, 225, 0.12)',
      onSurfaceDisabled: 'rgba(224, 227, 225, 0.38)',
      backdrop: 'rgba(41, 50, 48, 0.4)',
    },
  },
);
