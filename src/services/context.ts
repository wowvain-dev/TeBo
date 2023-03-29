import { createContext, useContext } from 'react';
import { ProgressManager } from './ProgressManager';
import { DifficultyManager } from './DifficultyManager';
import { StorageManager } from './StorageManager';

export type ProgressContainer = {
    value: ProgressManager,
    setValue: (val: ProgressManager) => void
}

export type DifficultyContainer = {
    value: DifficultyManager,
    setValue: (val: DifficultyManager) => void
}

export type StorageContainer = {
    value: StorageManager,
    setValue: (val: StorageManager) => void
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

export const StorageContext = createContext<StorageContainer>(
    {
        value: new StorageManager(),
        setValue: () => {}
    }
);

export const useProgressContext = () => useContext(ProgressContext);
export const useDifficultyContext = () => useContext(DifficultyContext);
export const useStorageContext = () => useContext(StorageContext);