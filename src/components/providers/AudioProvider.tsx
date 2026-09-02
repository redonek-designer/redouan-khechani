"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { djConfig } from "../../../config/dj";

type AudioStatus = "idle" | "playing" | "paused";

type AudioContextValue = {
  status: AudioStatus;
  isMuted: boolean;
  volume: number;
  entered: boolean;
  enter: () => void;
  toggle: () => void;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<AudioStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [entered, setEntered] = useState(false);

  const enter = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = false;
    audio
      .play()
      .then(() => {
        setStatus("playing");
        setEntered(true);
      })
      .catch(() => {
        setStatus("paused");
        setEntered(true);
      });
  }, [volume]);

  const setMuted = useCallback((muted: boolean) => {
    setIsMuted(muted);
    if (audioRef.current) audioRef.current.muted = muted;
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = volume;
      audio.muted = false;
      audio
        .play()
        .then(() => setStatus("playing"))
        .catch(() => {});
    } else {
      audio.pause();
      setStatus("paused");
    }
  }, [volume]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
      if (v > 0) audioRef.current.muted = false;
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        status,
        isMuted,
        volume,
        entered,
        enter,
        toggle,
        setMuted,
        setVolume,
      }}
    >
      <audio
        ref={audioRef}
        id="dj-bg-audio"
        src={djConfig.introAudio}
        loop
        preload="none"
        className="hidden"
      />
      {children}
    </AudioContext.Provider>
  );
}
