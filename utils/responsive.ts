import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensões base do design (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/**
 * Escala o valor com base na largura da tela
 */
export const scaleWidth = (size: number): number => {
  return (SCREEN_WIDTH / BASE_WIDTH) * size;
};

/**
 * Escala o valor com base na altura da tela
 */
export const scaleHeight = (size: number): number => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};

/**
 * Escala o tamanho da fonte de forma moderada
 * Usa uma fórmula que não deixa o texto muito grande ou muito pequeno
 */
export const scaleFontSize = (size: number): number => {
  const newSize = scaleWidth(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Escala com limite para evitar valores muito extremos
 */
export const scaleModerate = (size: number, factor: number = 0.5): number => {
  return size + (scaleWidth(size) - size) * factor;
};

/**
 * Retorna se o dispositivo é um tablet
 */
export const isTablet = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

/**
 * Retorna se o dispositivo é pequeno (< 375px)
 */
export const isSmallDevice = (): boolean => {
  return SCREEN_WIDTH < 375;
};

/**
 * Retorna se o dispositivo é grande (>= 768px)
 */
export const isLargeDevice = (): boolean => {
  return SCREEN_WIDTH >= 768;
};

/**
 * Dimensões da tela
 */
export const dimensions = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// Aliases para facilitar o uso
export const wp = (percentage: number): number => {
  return (percentage * SCREEN_WIDTH) / 100;
};

export const hp = (percentage: number): number => {
  return (percentage * SCREEN_HEIGHT) / 100;
};
