import {createContext, useContext} from 'react';
import {ProgressManager} from './ProgressManager';
import {DifficultyManager} from './DifficultyManager';
import {StorageManager} from './StorageManager';
import {DiplomaManager} from './DiplomaManager';
import bg1 from "@/assets/background-1.jpg";
import bg2 from "@/assets/background-2.jpg";
import bg3 from "@/assets/background-3.jpg";
import bg4 from "@/assets/background-4.jpg";
import bg5 from "@/assets/background-5.jpg";
import bg6 from "@/assets/background-6.jpg";
import {SettingsManager} from "@/services/SettingsManager";

export const backgrounds = [
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6
]

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

export type SettingsContainer = {
    value: SettingsManager,
    setValue: (val: SettingsManager) => void
}

export type DiplomaContainer = {
    value: DiplomaManager,
}


export const SettingsContext = createContext<SettingsContainer>(
    {
        value: new SettingsManager(),
        setValue: () => {

        }
    }
);

export const ProgressContext = createContext<ProgressContainer>(
    {
        value: new ProgressManager(),
        setValue: () => {
        }
    }
);

export const DifficultyContext = createContext<DifficultyContainer>(
    {
        value: new DifficultyManager(),
        setValue: () => {
        }
    }
);

export const StorageContext = createContext<StorageContainer>(
    {
        value: new StorageManager(),
        setValue: () => {
        }
    }
);

export const DiplomaContext = createContext<DiplomaContainer>(
    {
        value: new DiplomaManager(),
    }
)

export const useProgressContext = () => useContext(ProgressContext);
export const useDifficultyContext = () => useContext(DifficultyContext);
export const useStorageContext = () => useContext(StorageContext);
export const useSettingsContext = () => useContext(SettingsContext);
export const useDiplomaContext = () => useContext(DiplomaContext);