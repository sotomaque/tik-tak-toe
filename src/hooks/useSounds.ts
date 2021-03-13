import { useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

import { useSettings } from '@context/settings-context';

type SoundType = 'pop1' | 'pop2' | 'win' | 'loss' | 'draw';

function useSounds(): (sound: SoundType) => void {
  const { settings } = useSettings();
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);
  const winSoundRef = useRef<Audio.Sound | null>(null);
  const lossSoundRef = useRef<Audio.Sound | null>(null);
  const drawSoundRef = useRef<Audio.Sound | null>(null);

  const playSound = async (sound: SoundType): Promise<void> => {
    const soundsMap = {
      pop1: popSoundRef,
      pop2: pop2SoundRef,
      win: winSoundRef,
      loss: lossSoundRef,
      draw: drawSoundRef,
    };
    try {
      const status = await soundsMap[sound].current?.getStatusAsync();
      status &&
        status.isLoaded &&
        settings?.sounds &&
        soundsMap[sound].current?.replayAsync();

      if (settings?.haptics) {
        switch (sound) {
          case 'pop1': {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          }
          case 'pop2': {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          }
          case 'win': {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
          }
          case 'loss': {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            break;
          }
          case 'draw': {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            break;
          }
          default:
            break;
        }
      }
    } catch (error) {
      console.error('error playing sound', error);
    }
  };

  useEffect(() => {
    // load sounds on mount
    const popSoundObj = new Audio.Sound();
    const pop2SoundObj = new Audio.Sound();
    const winSoundObj = new Audio.Sound();
    const lossSoundObj = new Audio.Sound();
    const drawSoundObj = new Audio.Sound();

    const loadSounds = async () => {
      await popSoundObj.loadAsync(require('@assets/pop_1.wav'));
      popSoundRef.current = popSoundObj;
      await pop2SoundObj.loadAsync(require('@assets/pop_2.wav'));
      pop2SoundRef.current = pop2SoundObj;
      await winSoundObj.loadAsync(require('@assets/win.mp3'));
      winSoundRef.current = winSoundObj;
      await lossSoundObj.loadAsync(require('@assets/loss.mp3'));
      lossSoundRef.current = lossSoundObj;
      await drawSoundObj.loadAsync(require('@assets/draw.mp3'));
      drawSoundRef.current = drawSoundObj;
    };

    loadSounds();

    return () => {
      // un-load sounds on unmount
      popSoundObj && popSoundObj.unloadAsync();
      pop2SoundObj && pop2SoundObj.unloadAsync();
      winSoundObj && winSoundObj.unloadAsync();
      lossSoundObj && lossSoundObj.unloadAsync();
      drawSoundObj && drawSoundObj.unloadAsync();
    };
  }, []);

  return playSound;
}

export default useSounds;
