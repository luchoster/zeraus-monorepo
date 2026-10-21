import * as R from 'ramda'

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const mapIndexed = R.addIndex(R.map)
export const notNilOrEmpty = R.complement(R.either(R.isNil, R.isEmpty))

