INSERT INTO rooms (number, type, capacity, price_per_night, is_active) VALUES
  ('101', 'Simple',           1, 55.00,  1),
  ('102', 'Simple',           1, 55.00,  1),
  ('103', 'Simple',           1, 55.00,  1),
  ('201', 'Doble',            2, 85.00,  1),
  ('202', 'Doble',            2, 85.00,  1),
  ('203', 'Doble matrimonial',2, 95.00,  1),
  ('204', 'Doble matrimonial',2, 95.00,  1),
  ('301', 'Suite',            3, 160.00, 1),
  ('302', 'Suite',            3, 160.00, 1),
  ('303', 'Suite',            3, 175.00, 0);

INSERT INTO hotel_services (name, category, phone, description, available) VALUES
  ('Recepcion',         'Interno', '100', 'Atencion 24 horas los 7 dias',              1),
  ('Restaurante',       'Interno', '101', 'Desayuno 7am-10am, almuerzo 12pm-3pm, cena 7pm-10pm', 1),
  ('Room Service',      'Interno', '102', 'Servicio a la habitacion disponible 24hrs', 1),
  ('Lavanderia',        'Interno', '103', 'Entrega en 24 horas, express en 4 horas',   1),
  ('Spa y Bienestar',   'Interno', '104', 'Masajes, sauna y piscina. Lunes a domingo 8am-8pm', 1),
  ('Estacionamiento',   'Interno', '105', 'Estacionamiento vigilado las 24 horas',     1),
  ('Emergencias',       'Externo', '911', 'Linea nacional de emergencias',             1),
  ('Bomberos',          'Externo', '119', 'Cuerpo de bomberos local',                  1),
  ('Taxi Seguro',       'Externo', '76543210', 'Servicio de taxi de confianza, disponible 24hrs', 1),
  ('Farmacia del Centro','Externo','77889900', 'A 2 cuadras del hotel, abierto hasta medianoche', 1),
  ('Hospital Regional', 'Externo', '33445566', 'A 10 minutos del hotel',               1),
  ('Turismo Local',     'Externo', '78901234', 'Tours y excursiones por la ciudad',    1);

INSERT INTO guests (full_name, document_number, email, phone) VALUES
  ('Carlos Mendoza Rios',    '12345678', 'carlos.mendoza@email.com',  '77712345'),
  ('Maria Fernanda Lopez',   '87654321', 'mflopez@gmail.com',         '76698765'),
  ('Roberto Suarez Vaca',    '11223344', 'roberto.suarez@outlook.com','78834567'),
  ('Ana Patricia Gutierrez', '44332211', 'ana.gutierrez@email.com',   '77756789'),
  ('Luis Eduardo Pereira',   '55667788', 'luis.pereira@gmail.com',    '76645678'),
  ('Sofia Alejandra Rojas',  '88776655', 'sofia.rojas@email.com',     '77823456'),
  ('Jorge Antonio Vargas',   '99001122', 'jorge.vargas@outlook.com',  '76712345'),
  ('Carmen Rosa Delgado',    '22110099', 'carmen.delgado@gmail.com',  '78956789');

INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, status, total_amount, penalty_amount) VALUES
  (1, 1, '2026-04-01', '2026-04-04', 'CONFIRMED',   165.00, 0),
  (2, 4, '2026-04-02', '2026-04-06', 'CONFIRMED',   340.00, 0),
  (3, 6, '2026-04-01', '2026-04-03', 'CHECKED_IN',  190.00, 0),
  (4, 8, '2026-04-03', '2026-04-07', 'CONFIRMED',   640.00, 0),
  (5, 2, '2026-03-28', '2026-03-31', 'CHECKED_OUT', 165.00, 0),
  (6, 5, '2026-03-29', '2026-04-01', 'CHECKED_OUT', 255.00, 0),
  (7, 7, '2026-04-05', '2026-04-08', 'CONFIRMED',   285.00, 0),
  (8, 3, '2026-03-30', '2026-04-01', 'CANCELLED',   110.00, 11.00);

INSERT INTO checkin_checkout (reservation_id, actual_checkin, late_checkout, late_fee) VALUES
  (3, '2026-04-01 14:30:00', 0, 0);

INSERT INTO room_types (type, capacity, description, base_price) VALUES
  ('Simple',            1, 'Habitacion individual, una cama',          55.00),
  ('Doble',             2, 'Habitacion doble, dos camas individuales',  85.00),
  ('Doble matrimonial', 2, 'Habitacion doble, cama matrimonial',        95.00),
  ('Suite',             3, 'Suite de lujo, sala y dormitorio',         160.00);
