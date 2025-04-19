CREATE TABLE `exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`aliases` text,
	`primary_muscles` text NOT NULL,
	`secondary_muscles` text NOT NULL,
	`force` text,
	`level` text NOT NULL,
	`mechanic` text,
	`equipment` text,
	`category` text NOT NULL,
	`instructions` text NOT NULL,
	`description` text,
	`tips` text,
	`images` text NOT NULL,
	`is_favorite` integer DEFAULT false NOT NULL,
	`is_used` integer DEFAULT false NOT NULL
);
