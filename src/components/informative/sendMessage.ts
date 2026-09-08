import { toast } from 'sonner';

type MessagePosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

const sendMessage = (args: {
  message: string;
  description?: string;
  position?: MessagePosition;
  duration?: number;
  className?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
}) => {
  const { message, description, position, duration, className, variant } = args;

  if (duration && duration <= 0) throw new Error('Duration must be greater than 0.');

  toast(message, {
    description: description,
    position: position,
    duration: duration,
    className: className,
  });
};

export { sendMessage };
export type { MessagePosition };
