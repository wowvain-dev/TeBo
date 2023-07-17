import './Adevar.sass';
import AnimatedPage from '@/components/AnimatedPage';
import {Button, Card, Input, NormalColors, Spacer, Modal, Tooltip} from '@nextui-org/react';
import {ArrowLeft, ArrowRight, ArrowRight2, AudioSquare, CloseCircle, Warning2} from "iconsax-react";
import {useNavigate} from 'react-router-dom';
import {ExpressionTree} from '@/types/ExpressionTree';
import {useEffect, useRef, useState} from "react";
import {useProgressContext, useDifficultyContext, useSettingsContext, useDiplomaContext} from '@/services/context';
import {ExerciseProgress, ProgressManager} from '@/services/ProgressManager';
import {Divider, notification, Tour, TourProps} from "antd";
import {TryAgainModal} from "@/components/TryAgainModal";
import {AiOutlineQuestion, HiOutlineSpeakerphone, HiOutlineSpeakerWave} from "react-icons/all";
import success_sound from '@/assets/audio/sfx/success_sound.aac';
import failure_sound from '@/assets/audio/sfx/failure_sound.aac';
import check_tour from '@/assets/audio/ui/check_tour.aac';
import skip_tour from '@/assets/audio/ui/skip_tour.aac';
import cheat_tour from '@/assets/audio/ui/cheat_tour.aac';
import ReactHowler from 'react-howler';
import {DiplomaManager} from "@/services/DiplomaManager";

export function Adevar() {
	return (
		<></>
	)
}
