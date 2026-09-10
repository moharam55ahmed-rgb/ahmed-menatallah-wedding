"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { wedding } from "@/config/wedding";

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  hasStarted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  startAudioExperience: () => void;
  playCelebrationSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const zaghareetAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const bgAudio = new Audio(wedding.introMusic);
    bgAudio.loop = true;
    bgAudio.volume = 0.65;
    bgAudio.preload = "auto";
    bgAudioRef.current = bgAudio;

    const zaghareetAudio = new Audio(wedding.celebrationSound);
    zaghareetAudio.volume = 0.75;
    zaghareetAudio.preload = "auto";
    zaghareetAudioRef.current = zaghareetAudio;

    return () => {
      bgAudio.pause();
      bgAudio.src = "";
      zaghareetAudio.pause();
      zaghareetAudio.src = "";
    };
  }, []);

  const playCelebrationSound = useCallback(() => {
    if (!zaghareetAudioRef.current) return;
    try {
      zaghareetAudioRef.current.currentTime = 0;
      const promise = zaghareetAudioRef.current.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    } catch {}
  }, []);

  const startAudioExperience = useCallback(() => {
    setHasStarted(true);
    playCelebrationSound();

    if (bgAudioRef.current) {
      bgAudioRef.current.currentTime = 0;
      bgAudioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [playCelebrationSound]);

  const togglePlay = useCallback(() => {
    if (!bgAudioRef.current) return;
    if (isPlaying) {
      bgAudioRef.current.pause();
      setIsPlaying(false);
    } else {
      bgAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!bgAudioRef.current) return;
    const newMute = !isMuted;
    bgAudioRef.current.muted = newMute;
    if (zaghareetAudioRef.current) zaghareetAudioRef.current.muted = newMute;
    setIsMuted(newMute);
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, hasStarted, togglePlay, toggleMute, startAudioExperience, playCelebrationSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
}
