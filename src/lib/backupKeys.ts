// The one list that defines "the user's identity in SecureStore" — every key the
// app writes EXCEPT the device encryption master key (`shadow.enc.key`), which is
// deliberately never exported (a restore re-encrypts under the new device's key,
// keeping backups portable and protected only by the passphrase).
//
// Two consumers share this list: the backup (what a full snapshot captures) and
// the reset (what "delete everything" clears). Keeping them identical means a
// backup always round-trips exactly what a wipe removes.
export const BACKUP_KEYS = [
  'shadow.onboarding_complete',
  'shadow.user_name',
  'shadow.user_gender',
  'shadow.favorite_flow_ids',
  'shadow.depths_seen',
  'shadow.theme',
  'shadow.app_lock_enabled',
  'shadow.notebook_lock_enabled',
  'shadow.notebook_pin_salt',
  'shadow.notebook_pin_hash',
  'shadow.notebook_pin_len',
  'shadow.notebook_pin_iters',
  'shadow.notebook_pin_biometric',
] as const;
