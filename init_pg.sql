CREATE TYPE order_status AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE IF NOT EXISTS public.carts (
    id uuid NULL,
    user_id uuid NOT NULL,
    created_at date NOT NULL,
    CONSTRAINT carts_pk PRIMARY KEY (id),
    status order_status
);

CREATE TABLE IF NOT EXISTS public.cart_items (
    count int NOT NULL,
    product_id uuid NOT NULL,
    cart_id uuid NOT NULL,
    CONSTRAINT cart_items_fk FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS public.orders (
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	cart_id uuid NOT NULL,
	payment json NULL,
	delivery json NULL,
	"comments" text NULL,
	status text NULL,
	total int NULL,
	CONSTRAINT orders_fk FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
