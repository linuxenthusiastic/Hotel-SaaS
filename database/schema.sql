CREATE TABLE IF NOT EXISTS guests (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name       TEXT    NOT NULL,
  document_number TEXT    NOT NULL UNIQUE,
  email           TEXT,
  phone           TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  number           TEXT    NOT NULL UNIQUE,
  type             TEXT    NOT NULL,
  capacity         INTEGER NOT NULL,
  price_per_night  REAL    NOT NULL,
  is_active        INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS reservations (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_id        INTEGER NOT NULL,
  room_id         INTEGER NOT NULL,
  check_in_date   DATE    NOT NULL,
  check_out_date  DATE    NOT NULL,
  status          TEXT    NOT NULL DEFAULT 'CONFIRMED',
  total_amount    REAL    DEFAULT 0,
  penalty_amount  REAL    DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (guest_id) REFERENCES guests(id),
  FOREIGN KEY (room_id)  REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS checkin_checkout (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  reservation_id  INTEGER NOT NULL UNIQUE,
  actual_checkin  DATETIME,
  actual_checkout DATETIME,
  late_checkout   INTEGER DEFAULT 0,
  late_fee        REAL    DEFAULT 0,
  notes           TEXT,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

CREATE TABLE IF NOT EXISTS hotel_services (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL,
  phone       TEXT,
  description TEXT,
  available   INTEGER DEFAULT 1
);