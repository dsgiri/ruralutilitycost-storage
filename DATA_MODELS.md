# Data Models & Schema

## 1. Overview
In V1, all data is stored entirely locally in the browser. There are no external databases, no user accounts, and no cross-device sync. 

## 2. Local Storage Schema

### `storage_favorites`
An array of string IDs representing the calculators the user has pinned.
- **Type:** `Array<string>`
- **Example:** `["grain-bin-capacity", "feed-storage-capacity"]`

### `calculator_state_*`
(Optional for Phase 2) We may store draft inputs for specific calculators to prevent data loss on refresh.
- **Key Pattern:** `calculator_draft_{calculatorId}`
- **Type:** `JSON String`
- **Example:** `{"diameter": 30, "height": 20, "crop": "Corn"}`

## 3. Database Schema (Phase 2+)
Currently out of scope. If cloud storage is implemented later, it will likely use a relational database (e.g., PostgreSQL/Supabase) to store user profiles, saved configurations, and historical analysis.
