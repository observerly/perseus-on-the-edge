CREATE TABLE `bodies` (
	`uid` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`iau` text NOT NULL,
	`ra` numeric NOT NULL,
	`μra` numeric,
	`dec` numeric NOT NULL,
	`μdec` numeric,
	`constellation` text NOT NULL,
	`type` text NOT NULL,
	`appm` numeric,
	`absM` numeric,
	`d` numeric,
	`hd` text,
	`hr` text,
	`hip` text,
	`bd` text,
	`flamsteed` text,
	`messier` text,
	`ngc` text,
	`ic` text,
	`e` numeric,
	`a` numeric,
	`b` numeric,
	`i` numeric,
	`z` numeric,
	`simbad` text NOT NULL
);