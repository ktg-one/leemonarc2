"use client";

import React from "react";
import { GenerateButton } from "./neuform-isolated/NeuformIsolatedEffects";
import type { NeuformIsolatedEffectProps } from "./neuform-isolated/NeuformIsolatedEffects";

export type RectangleButtonVariant = "generate-button" | string;

export type RectangleButtonsProps = NeuformIsolatedEffectProps & {
  variant?: RectangleButtonVariant;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export function RectangleButtons({
  variant = "generate-button",
  ...props
}: RectangleButtonsProps) {
  return <GenerateButton {...props} />;
}
