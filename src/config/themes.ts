import type { ThemeName } from "@/types";

export const themes: Record<ThemeName, { label: string; accent: string; css: Record<string, string> }> = {
  gold: {
    label: "ذهبي",
    accent: "#e8bd65",
    css: {
      "--accent": "232 189 101",
      "--accent-2": "244 114 36",
      "--ring": "251 191 36",
      "--surface-2": "27 23 16",
      "--glow": "232 189 101",
    },
  },
  neon: {
    label: "نيون",
    accent: "#45f0d8",
    css: {
      "--accent": "69 240 216",
      "--accent-2": "255 77 166",
      "--ring": "103 232 249",
      "--surface-2": "12 22 28",
      "--glow": "69 240 216",
    },
  },
  dark: {
    label: "داكن",
    accent: "#f5f5f4",
    css: {
      "--accent": "245 245 244",
      "--accent-2": "148 163 184",
      "--ring": "226 232 240",
      "--surface-2": "20 24 31",
      "--glow": "226 232 240",
    },
  },
  ruby: {
    label: "ياقوتي",
    accent: "#fb7185",
    css: {
      "--accent": "251 113 133",
      "--accent-2": "244 63 94",
      "--ring": "253 164 175",
      "--surface-2": "31 16 24",
      "--glow": "251 113 133",
    },
  },
  green: {
    label: "أخضر",
    accent: "#22c55e",
    css: {
      "--accent": "34 197 94",
      "--accent-2": "16 185 129",
      "--ring": "74 222 128",
      "--glow": "34 197 94",
    },
  },
  blue: {
    label: "أزرق",
    accent: "#5b8cff",
    css: {
      "--accent": "91 140 255",
      "--accent-2": "45 212 191",
      "--ring": "147 197 253",
      "--glow": "91 140 255",
    },
  },
  purple: {
    label: "بنفسجي",
    accent: "#a855f7",
    css: {
      "--accent": "168 85 247",
      "--accent-2": "217 70 239",
      "--ring": "216 180 254",
      "--glow": "168 85 247",
    },
  },
  red: {
    label: "أحمر",
    accent: "#ef4444",
    css: {
      "--accent": "239 68 68",
      "--accent-2": "251 113 133",
      "--ring": "248 113 113",
      "--glow": "239 68 68",
    },
  },
};
