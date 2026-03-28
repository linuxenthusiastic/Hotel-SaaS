INSERT INTO rooms (number, type, capacity, price_per_night, is_active) VALUES
('101', 'Simple',   1, 50.00,  1),
('102', 'Simple',   1, 50.00,  1),
('201', 'Doble',    2, 80.00,  1),
('202', 'Doble',    2, 80.00,  1),
('301', 'Suite',    3, 150.00, 1),
('302', 'Suite',    3, 150.00, 1);

-- Servicios imaginarios :()
INSERT INTO hotel_services (name, category, phone, description, available) VALUES('Recepción',       'Interno',    '100', 'Atención 24 horas',               1),
('Restaurante',     'Interno',    '101', 'Desayuno 7am-10am, cena 7pm-10pm',1),
('Lavandería',      'Interno',    '102', 'Entrega en 24 horas',             1),
('Emergencias',     'Externo',    '911', 'Línea de emergencias nacional',   1),
('Taxi de confianza','Externo',   '76543210', 'Servicio local recomendado', 1),
('Farmacia',        'Externo',    '77889900', 'A 2 cuadras del hotel',      1);