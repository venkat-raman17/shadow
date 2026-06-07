import { useEffect, useState } from 'react';

import { getItem } from '@/lib/kv';

export type Gender = 'man' | 'woman' | 'nonbinary';

export interface UserProfile {
  name: string;
  gender: Gender;
}

export function useUserProfile(): UserProfile | null {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    Promise.all([getItem('shadow.user_name'), getItem('shadow.user_gender')]).then(([n, g]) => {
      if (n && g) setProfile({ name: n, gender: g as Gender });
    });
  }, []);

  return profile;
}
