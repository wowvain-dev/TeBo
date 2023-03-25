import { createContext, useContext } from 'react';
import { ProgressManager } from './ProgressManager';
import { DifficultyManager } from './DifficultyManager';

export type ProgressContainer = {
    value: ProgressManager,
    setValue: (val: ProgressManager) => void
}

export type DifficultyContainer = {
    value: DifficultyManager,
    setValue: (val: DifficultyManager) => void
}

export const ProgressContext = createContext<ProgressContainer>(
    {
        value: new ProgressManager(),
        setValue: () => {}
    }
);

export const DifficultyContext = createContext<DifficultyContainer>(
    {
        value: new DifficultyManager(),
        setValue: () => {}
    }
);

export const useProgressContext = () => useContext(ProgressContext);
export const useDifficultyContext = () => useContext(DifficultyContext);