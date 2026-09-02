import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({
  size = 20,
  children,
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function SoundCloudIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M1.5 12.5c-.3 0-.5.3-.5.6v3.3c0 .3.2.6.5.6.3 0 .5-.3.5-.6v-3.3c0-.3-.2-.6-.5-.6zm2-1.2c-.3 0-.5.3-.5.6v4.6c0 .3.2.6.5.6.3 0 .5-.3.5-.6V11.9c0-.3-.2-.6-.5-.6zm2-3.2c-.3 0-.4.2-.4.4v7.8c0 .3.2.5.4.5.3 0 .5-.2.5-.5V8.5c0-.3-.2-.5-.5-.5zm2-2c-.3 0-.5.2-.5.5v9.6c0 .3.2.5.5.5.3 0 .5-.2.5-.5V6.5c0-.3-.2-.5-.5-.5zm2-3.9c-.3 0-.5.2-.5.5V16c0 .3.2.5.5.5.3 0 .5-.2.5-.5V2.5c0-.3-.2-.5-.5-.5zm2 6.4c-.3 0-.5.3-.5.5v7.4c0 .3.2.5.5.5.3 0 .5-.2.5-.5V8.9c0-.3-.2-.5-.5-.5zm4.5 2.2c-.3-2-1.9-3.6-4-3.6-.3 0-.5.2-.5.5V16a.5.5 0 00.5.5h4c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22.5 12c0-1.5-.1-2.6-.3-3.4-.2-.9-.8-1.6-1.7-1.8-1.2-.3-5.5-.3-5.5-.3s-4.3 0-5.5.3c-.9.2-1.5.9-1.7 1.8-.2.8-.3 1.9-.3 3.4s.1 2.6.3 3.4c.2.9.8 1.6 1.7 1.8 1.2.3 5.5.3 5.5.3s4.3 0 5.5-.3c-.2 0-.2 0 0 0 .9-.2 1.5-.9 1.7-1.8.2-.8.3-1.9.3-3.4zM9.7 15.3V8.7l6 3.3-6 3.3z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2zm5.2 14.2c-.2.6-1.2 1.1-1.7 1.2-.4 0-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.1-.2.3-.3.5-.3h.3c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .4-.1.2-.2.3-.4.5l-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4.1.2.1.6-.1 1.2z" />
    </svg>
  );
}

export function MailIcon({ size = 22, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

export { Base };
