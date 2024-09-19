import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {

  if (browser) {
    posthog.init(
      'phc_MVS8XWYwh2qk9pMzacYUWLjzW4lqr6rnb53mBJR0ANc',
      {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only'
      }
    )
  }
  return
};