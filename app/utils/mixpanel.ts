/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/mixpanel.ts
interface MixpanelType {
  track: (event: string, props?: Record<string, any>) => void;
  identify?: (id: string) => void;
  people?: {
    set: (props: Record<string, any>) => void;
  };
}

declare global {
  interface Window {
    mixpanel?: MixpanelType;
  }
}

export const mixpanelTrack = (
  event: string,
  properties?: Record<string, unknown>,
) => {
  if (typeof window !== "undefined" && window.mixpanel?.track) {
    window.mixpanel.track(event, properties);
  }
};
