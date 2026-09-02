"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Music,
} from "lucide-react";
import { djConfig, type Track } from "../../../config/dj";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";

const BAR_COUNT = 44;

function formatTime(sec: number) {
  if (!isFinite(sec) || isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const idleLevels = Array.from({ length: BAR_COUNT }, () => 0.25 + Math.random() * 0.3);

export default function MusicPlayer() {
  const [current, setCurrent] = useState<Track | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [levels, setLevels] = useState<number[]>(idleLevels);

  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);

  const loadTrack = useCallback((track: Track) => {
    setCurrent(track);
    setPlaying(false);
    setProgress(0);
    setDuration(track.duration);
    setLevels(idleLevels);
    const audio = audioRef.current;
    if (!audio) return;
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
      analyserRef.current = null;
    }
    audio.src = track.src;
    audio.load();
  }, []);

  const connectAnalyser = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return null;
    if (analyserRef.current) return analyserRef.current;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = ctxRef.current ?? new Ctx();
      ctxRef.current = ctx;
      const src = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.75;
      src.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
      return analyser;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!current) return;
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || current.duration);
    };
    const onEnded = () => {
      setPlaying(false);
      setLevels(idleLevels);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [current]);

  // Visualizer loop
  useEffect(() => {
    const loop = () => {
      const analyser = analyserRef.current;
      if (playing && analyser) {
        const data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        const next = Array.from({ length: BAR_COUNT }, (_, i) => {
          const idx = Math.floor((i / BAR_COUNT) * data.length * 0.6);
          return data[idx] / 255;
        });
        setLevels(next);
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !current) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    connectAnalyser();
    audio.volume = volume;
    audio
      .play()
      .then(() => {
        setPlaying(true);
        setLevels(Array.from({ length: BAR_COUNT }, () => 0.1));
      })
      .catch(() => {});
  }, [playing, current, volume, connectAnalyser]);

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setProgress(val);
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
  };

  const nextTrack = () => {
    if (!current) return loadTrack(djConfig.tracks[0]);
    const idx = djConfig.tracks.findIndex((t) => t.id === current.id);
    loadTrack(djConfig.tracks[(idx + 1) % djConfig.tracks.length]);
  };

  const prevTrack = () => {
    if (!current) return loadTrack(djConfig.tracks[0]);
    const idx = djConfig.tracks.findIndex((t) => t.id === current.id);
    loadTrack(
      djConfig.tracks[(idx - 1 + djConfig.tracks.length) % djConfig.tracks.length]
    );
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <section id="music" className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-base via-charcoal/40 to-base" />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-violet/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <SectionLabel label="Latest Sound" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl font-black uppercase tracking-tight text-soft md:text-7xl">
            Featured <span className="text-electric">Mix</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Artwork + visualizer */}
          <Reveal delay={0.15} className="order-2 lg:order-1">
            <div
              data-cursor="play"
              onClick={toggle}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current?.id ?? "default"}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current?.artwork ?? "/images/music-01.jpg"}
                    alt={current?.title ?? "REDNEXT featured mix"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-base/80 via-transparent to-transparent" />

              <div
                data-cursor="play"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-transform duration-300 ${
                    playing ? "scale-110" : "group-hover:scale-105"
                  }`}
                >
                  {playing ? (
                    <Pause className="h-9 w-9 text-soft" />
                  ) : (
                    <Play className="h-9 w-9 translate-x-0.5 text-soft" />
                  )}
                </div>
              </div>

              <div className="absolute bottom-4 left-5 right-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-electric">
                  {current?.tag ?? "Featured Mix"}
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-tight text-soft md:text-3xl">
                  {current?.title ?? "ATLANTIC NIGHTS"}
                </h3>
              </div>
            </div>
          </Reveal>

          {/* Player controls */}
          <Reveal delay={0.2} className="order-1 lg:order-2">
            <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-white/5 bg-charcoal/40 p-6 backdrop-blur-md md:p-8">
              {/* Waveform */}
              <div className="flex h-16 items-center gap-[3px] md:h-20" aria-hidden>
                {levels.map((l, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: `${Math.max(10, l * 100)}%`,
                      backgroundColor:
                        playing && l > 0.6
                          ? "rgba(91,140,255,0.95)"
                          : "rgba(151,151,159,0.6)",
                    }}
                    transition={{ duration: 0.08, ease: "linear" }}
                    className="w-full flex-1 rounded-full"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                  {current?.subtitle ?? "DJ SET · TAGHAZOUT"}
                </p>
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-soft md:text-4xl">
                  {playing ? (
                    <AnimatePresence mode="wait">
                      <span key="playing">Now Playing</span>
                    </AnimatePresence>
                  ) : (
                    current?.title ?? "ATLANTIC NIGHTS"
                  )}
                </h3>
              </div>

              {/* Progress */}
              <div>
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={progress}
                  onChange={seek}
                  aria-label="Seek"
                  className="w-full accent-electric"
                  style={{
                    background: `linear-gradient(to right, rgba(91,140,255,0.9) ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
                    height: 3,
                    appearance: "none",
                    cursor: "pointer",
                  }}
                />
                <div className="mt-2 flex justify-between font-mono text-[11px] tabular-nums text-muted">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevTrack}
                    aria-label="Previous track"
                    data-cursor-active
                    className="text-soft/70 transition-colors hover:text-electric"
                  >
                    <SkipBack className="h-6 w-6" />
                  </button>
                  <button
                    onClick={toggle}
                    aria-label={playing ? "Pause" : "Play"}
                    data-cursor-active
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-soft text-base transition-transform hover:scale-105"
                  >
                    {playing ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6 translate-x-0.5" />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    aria-label="Next track"
                    data-cursor-active
                    className="text-soft/70 transition-colors hover:text-electric"
                  >
                    <SkipForward className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted" />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={changeVolume}
                    aria-label="Volume"
                    className="w-20 accent-electric"
                  />
                </div>
              </div>
            </div>

            {/* Track list */}
            <div className="mt-8 border-t border-white/5">
              {djConfig.tracks.map((track, i) => {
                const active = current?.id === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => loadTrack(track)}
                    data-cursor="play"
                    className={`group flex w-full items-center justify-between gap-4 border-b border-white/5 py-4 text-left transition-colors ${
                      active ? "text-electric" : "text-soft/70 hover:text-soft"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                          src={track.artwork}
                          alt={track.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-mono text-sm uppercase tracking-[0.15em]">
                          {track.title}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {active && playing && (
                        <Music className="h-4 w-4 animate-pulse" />
                      )}
                      <span className="font-mono text-xs tabular-nums text-muted">
                        {Math.floor(track.duration / 60)}:
                        {String(track.duration % 60).padStart(2, "0")}
                      </span>
                      {active ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Player audio */}
      <audio ref={audioRef} className="hidden" preload="none" />
    </section>
  );
}
