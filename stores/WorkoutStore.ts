import { create } from "zustand";

enum TimerState {
  Stopped = "stopped",
  Running = "running",
  Paused = "paused",
}

