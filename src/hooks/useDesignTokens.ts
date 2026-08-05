import { designTokens } from '../design/tokens';

export function useDesignTokens() {
  return designTokens;
}

export function useColors() {
  return designTokens.colors;
}

export function useTypography() {
  return designTokens.typography;
}

export function useSpacing() {
  return designTokens.spacing;
}

export function useBorderRadius() {
  return designTokens.borderRadius;
}

export function useShadows() {
  return designTokens.shadows;
}

export function useTransitions() {
  return designTokens.transitions;
}

export function useZIndex() {
  return designTokens.zIndex;
}
