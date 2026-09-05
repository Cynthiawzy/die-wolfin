'use client'

/**
 * Procedural sound engine using the Web Audio API — no audio files.
 * Produces moody, subtle tones for hover and a darker atmospheric chime for
 * "Enter", matching the board's "moody sounds / subtle audio" direction.
 *
 * The AudioContext is created lazily on the first user gesture (browsers block
 * audio until then) and shared as a singleton across the app.
 */

let ctx: AudioContext | null = null
let master: GainNode | null = null
let muted = false
let lastHover = 0

const listeners = new Set<(muted: boolean) => void>()

function ensureContext(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)
  }
  if (ctx.state === "suspended") void ctx.resume()
  return ctx
}

export function isMuted() {
  return muted
}

export function setMuted(value: boolean) {
  muted = value
  if (muted) stopDrone()
  listeners.forEach((fn) => fn(muted))
}

export function toggleMuted() {
  setMuted(!muted)
}

export function subscribeMuted(fn: (muted: boolean) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Prime the audio graph from a user gesture (e.g. first click anywhere). */
export function primeAudio() {
  ensureContext()
}

/** Low, dusky tick on hover — throttled so rapid moves don't stack up. */
export function playHover() {
  if (muted) return
  const now = performance.now()
  if (now - lastHover < 70) return
  lastHover = now

  const ac = ensureContext()
  if (!ac || !master) return

  const t = ac.currentTime
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  const lp = ac.createBiquadFilter()

  // muffled low tick, dropping in pitch for a darker feel
  lp.type = "lowpass"
  lp.frequency.setValueAtTime(900, t)

  osc.type = "sine"
  osc.frequency.setValueAtTime(196, t)
  osc.frequency.exponentialRampToValueAtTime(147, t + 0.09)

  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.045, t + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)

  osc.connect(gain)
  gain.connect(lp)
  lp.connect(master)
  osc.start(t)
  osc.stop(t + 0.24)
}

/** Deep, resonant low chime for the Enter action — then the drone rises. */
export function playEnter() {
  if (muted) return
  const ac = ensureContext()
  if (!ac || !master) return

  const t = ac.currentTime
  const notes = [110, 164.81] // low A + its fifth (E), an octave down from before

  notes.forEach((freq, i) => {
    const start = t + i * 0.08
    const osc = ac.createOscillator()
    const gain = ac.createGain()

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, start)

    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.2, start + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6)

    osc.connect(gain)
    gain.connect(master!)
    osc.start(start)
    osc.stop(start + 1.7)
  })

  // low, muffled sub-swell instead of an airy shimmer
  const swell = ac.createOscillator()
  const swGain = ac.createGain()
  const swLp = ac.createBiquadFilter()
  swLp.type = "lowpass"
  swLp.frequency.setValueAtTime(600, t)
  swell.type = "triangle"
  swell.frequency.setValueAtTime(220, t)
  swell.frequency.exponentialRampToValueAtTime(165, t + 0.7)
  swGain.gain.setValueAtTime(0.0001, t)
  swGain.gain.exponentialRampToValueAtTime(0.06, t + 0.06)
  swGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.0)
  swell.connect(swGain)
  swGain.connect(swLp)
  swLp.connect(master)
  swell.start(t)
  swell.stop(t + 1.1)

  // ambient drone rises in behind the chime
  startDrone()
}

let drone: {
  oscs: OscillatorNode[]
  gain: GainNode
  lfo: OscillatorNode
} | null = null

/**
 * Fade in a sustained, dark ambient drone — a low root with a detuned fifth,
 * gently filtered and slowly pulsed by an LFO. Idempotent: calling it again
 * while playing does nothing.
 */
export function startDrone() {
  if (muted) return
  const ac = ensureContext()
  if (!ac || !master || drone) return

  const t = ac.currentTime
  const gain = ac.createGain()
  const lp = ac.createBiquadFilter()

  lp.type = "lowpass"
  lp.frequency.setValueAtTime(320, t)
  lp.Q.value = 0.7

  // slow amplitude pulse for a breathing, moody bed
  const lfo = ac.createOscillator()
  const lfoGain = ac.createGain()
  lfo.type = "sine"
  lfo.frequency.setValueAtTime(0.12, t)
  lfoGain.gain.value = 0.012

  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.linearRampToValueAtTime(0.05, t + 4) // ~4s fade-in

  const freqs = [55, 82.41, 110] // A1 root, E2 fifth, A2 octave
  const oscs = freqs.map((f, i) => {
    const osc = ac.createOscillator()
    osc.type = "sawtooth"
    osc.frequency.setValueAtTime(f, t)
    osc.detune.value = (i - 1) * 6 // subtle detune for width
    osc.connect(gain)
    osc.start(t)
    return osc
  })

  lfo.connect(lfoGain)
  lfoGain.connect(gain.gain)
  lfo.start(t)

  gain.connect(lp)
  lp.connect(master)

  drone = { oscs, gain, lfo }
}

/** Fade the ambient drone out and tear it down. */
export function stopDrone() {
  if (!ctx || !drone) return
  const t = ctx.currentTime
  const { oscs, gain, lfo } = drone
  gain.gain.cancelScheduledValues(t)
  gain.gain.setValueAtTime(gain.gain.value, t)
  gain.gain.linearRampToValueAtTime(0.0001, t + 2)
  oscs.forEach((o) => o.stop(t + 2.1))
  lfo.stop(t + 2.1)
  drone = null
}

export function isDronePlaying() {
  return drone !== null
}
