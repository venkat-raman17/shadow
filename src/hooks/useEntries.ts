import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { getRecentEntries, EntryListItem } from '@/lib/db';

export function useRecentEntries(limit = 20): EntryListItem[] {
  const db = useSQLiteContext();
  const [entries, setEntries] = useState<EntryListItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      getRecentEntries(db, limit).then(setEntries);
    }, [db, limit]),
  );

  return entries;
}
