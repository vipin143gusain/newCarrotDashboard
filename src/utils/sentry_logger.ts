import * as Sentry from '@sentry/nextjs';
import { User } from '@sentry/nextjs';

interface sentry_props {
  user?: User;
  trace?: string;
  error?: string;
}

export const sentry_logger = (props: sentry_props) => {
  const { user, trace, error } = props;

  Sentry.captureMessage(trace);
  Sentry.setUser(user);
  Sentry.captureException(error);
};
