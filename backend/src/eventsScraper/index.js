import pgClient from '../shared/pgClient.js';
import web3, { contract } from '../shared/web3Client.js';

const OLD_BLOCKS_TO_SCAN = 100_000;

async function insertTransferSingleEvent(contractEvent) {
  try {
    // console.log(contractEvent);
    const text = `
      INSERT INTO event_transfersingle(
        contract_address,
        block_number,
        tx,
        val_operator,
        val_from,
        val_to,
        val_id,
        val_value
      )
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT DO NOTHING
    `;
    const values = [];
    values.push(contractEvent.address);
    values.push(contractEvent.blockNumber);
    values.push(contractEvent.transactionHash);
    values.push(contractEvent.returnValues.operator);
    values.push(contractEvent.returnValues.from);
    values.push(contractEvent.returnValues.to);
    values.push(contractEvent.returnValues.id);
    values.push(contractEvent.returnValues.value);
    // console.log(values);
    await pgClient.query(text, values);
  } catch (error) {
    console.error(error);
  }
}

async function getHistoricalContractEvents() {
  const currentBlockNumber = await web3.eth.getBlockNumber();
  const startingBlock = currentBlockNumber - OLD_BLOCKS_TO_SCAN;

  try {
    const pastEvents = await contract.getPastEvents('TransferSingle', {
      fromBlock: startingBlock,
      toBlock: 'latest',
    });
    return pastEvents;
  } catch (error) {
    console.error('error getting past events:');
    console.error(error);
    return [];
  }
}

async function handleHistorical() {
  const pastEvents = await getHistoricalContractEvents();
  for (let i = 0; i < pastEvents.length; i++) {
    const pastEvent = pastEvents[i];
    insertTransferSingleEvent(pastEvent);
  }
  console.log(`handleHistorical done (${pastEvents.length} found).`);
}

function watchAndInsertEvents() {
  contract.events
    .TransferSingle()
    .on('data', event => {
      console.log(event);
    })
    .on('error', console.error);
}

/**
 * captures and records 'TransferSingle' events to db
 */
async function run() {
  console.log('event scraper');
  await handleHistorical();
  watchAndInsertEvents();
}

export default run;
