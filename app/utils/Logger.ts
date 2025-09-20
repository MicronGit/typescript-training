import { nanoid } from 'nanoid';

class Logger {
  private instanceId: string;
  constructor() {
    this.instanceId = nanoid(8);
  }

  debug(message: string) {
    console.debug(`[${this.instanceId}][DEBUG] ${message}`);
  }

  info(message: string) {
    console.info(`[${this.instanceId}][INFO] ${message}`);
  }

  warn(message: string) {
    console.warn(`[${this.instanceId}][WARN] ${message}`);
  }

  error(message: string) {
    console.error(`[${this.instanceId}][ERROR] ${message}`);
  }
}

export const getLogger = () => new Logger();
