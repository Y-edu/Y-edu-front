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

export const mixpanelIdentify = (userId: string) => {
  if (typeof window !== "undefined" && window.mixpanel?.identify) {
    window.mixpanel.identify(userId);
  }
};

export const mixpanelSetPeople = (props: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.mixpanel?.people?.set) {
    window.mixpanel.people.set(props);
  }
};
// 수업종료시간 == 알림톡전송시간 계산
export function calculateSessionEndTime(
  start: string,
  duration: number,
): string {
  const [hourStr, minuteStr] = start.split(":");
  let hour = Number(hourStr);
  let minute = Number(minuteStr);

  minute += duration;
  if (minute >= 60) {
    hour += Math.floor(minute / 60);
    minute %= 60;
  }

  const now = new Date();
  const dateWithTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
  );

  return dateWithTime.toISOString();
}
