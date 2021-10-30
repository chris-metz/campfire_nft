CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--DROP EXTENSION "uuid-ossp";
--SELECT * FROM pg_extension;
--SELECT gen_random_uuid();

GRANT ALL PRIVILEGES ON DATABASE "campfire_nft_dev" to campfire_nft_dev;


-- BEGIN event_transfersingle
DROP TABLE event_transfersingle;
CREATE TABLE event_transfersingle
(
	id 					uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	contract_address	TEXT NOT NULL,
	block_number		BIGINT NOT NULL,
	tx 					TEXT UNIQUE NOT NULL,
	val_operator 		TEXT NOT NULL,
	val_from			TEXT NOT NULL,
	val_to				TEXT NOT NULL,
	val_id				TEXT,
	val_value			TEXT NOT NULL,

	created_at  		TIMESTAMPTZ DEFAULT NOW()
);
-- END event_transfersingle