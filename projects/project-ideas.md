# Proposed projects

Here is a list of projects proposed by mentors. Use these project as an inspiration and if you would like to know more about specific project or work on it, contact corresponding mentor.

- [Previous cohorts](#previous-cohorts)

## Previous cohorts

In project ideas from previous cohorts, you might find some up to date ideas which haven't been solved yet.

- [Project ideas in the fourth cohort](https://github.com/eth-protocol-fellows/cohort-four/blob/master/projects/project-ideas.md), [Projects executed](https://github.com/eth-protocol-fellows/cohort-four/blob/master/projects/)
- [Project ideas in the third cohort](https://github.com/eth-protocol-fellows/cohort-three/blob/master/projects/project-ideas.md), [Projects executed](https://github.com/eth-protocol-fellows/cohort-three/blob/master/projects/)
- [Project ideas in the second cohort](https://github.com/ethereum-cdap/cohort-zero/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)
- [Project ideas in the first cohort](https://github.com/ethereum-cdap/cohort-one/issues?q=is%3Aissue+Project+idea)

## Ideas proposed by core devs 

### ePBS, Prysm

- **ePBS**. Project at prysmaticlabs mentored by [@potuz](https://x.com/potuz_eth) and [@terencechain](https://x.com/terencechain). We currently have a fully specified [ePBS spec](https://github.com/potuz/consensus-specs/pull/2). And are actively working on a Go implementation as part of Prysm [here](https://github.com/prysmaticlabs/prysm/pull/13917). We plan to have a fully working PoC in the comming months and production code ready by exposition time in Devcon. Reading material includes some comprehensive documents. 
    - The [design notes](https://hackmd.io/uWVGcvcKSoqS4P5c5NHG3g), 
    - [forkchoice annotated spec](https://hackmd.io/9lWaVhSxSYWmTvODqnapMA), 
    - [validator guide annotated spec](https://hackmd.io/@ttsao/epbs-annotated-validator),
    - [design constraints](https://ethresear.ch/t/epbs-design-constraints/18728), 
    - [payload boosts](https://ethresear.ch/t/payload-boosts-in-epbs/18769). 

As for working conditions, we would not have weekly calls as in previous cohorts, but rather focus on code review and implementation work. Fellows are expected to carry their own research and asynchronously request help/discussions on Discord. Some areas of independent interest could be implementation of variations of ePBS like *slot auctions* or *execution tickets*. Please refer to [Barnabé's doc](https://mirror.xyz/barnabe.eth/QJ6W0mmyOwjec-2zuH6lZb0iEI2aYFB9gE-LHWIMzjQ) for a high level introduction. 

### PandaOps tooling wishlist

By Pari

https://github.com/ethpandaops/tooling-wishlist


### RIG Opened Problems

By Barnabé Monnot

Explore Robus Incentives Group Opened Problems. Most relevant for EPF are tagged https://efdn.notion.site/ROPs-RIG-Open-Problems-c11382c213f949a4b89927ef4e962adf


### Ephemery testnet

By Mario Havel

Contribute to integrations of public ephemeral testnet defined in eip-6916. Implementations in clients, deployments, devops tooling and client testing.
https://github.com/ephemery-testnet/ephemery-resources/issues/1 
https://ephemery.dev/


### JSON-RPC in Geth

By Sina 

⁃ Implementinng `trace_*` namespace, and most importantly [trace_filter]([https://docs.alchemy.com/reference/what-is-trace_filte](https://docs.alchemy.com/reference/what-is-trace_filter)) in geth. Currently there is only debug_trace, there are basic building blocks of tracers but trace filter needs an additional index for the database.

⁃ Specification and implementation of `eth_getTransactionBySenderAndNonce`, see https://github.com/ethereum/execution-apis/issues/494

⁃ Error codes in the JSON-RPC API. This one needs a lot of cross-client communication. Standardizing error codes across clients json-rpcs 

⁃ Benchmarking APIs via [flood](https://github.com/paradigmxyz/flood) and optimising the methods in various clients, compare across clients (not only geth)

### Grandine

By Saulius Grigaitis

The ideas below are for the Ethereum consensus layer client [Grandine](https://github.com/grandinetech/grandine) written in Rust.

- Separated Validator Client - extract Grandine's built-in validator into a separate process.
- Embeddable Grandine - refactor Grandine into an embeddable consensus client, and integrate it in Geth, Nethermind, Besu, Erigon, or Reth.
- Performance improvements - speed, efficiency, and memory usage improvements across the entire client;
- SSZ Stable containers - adding support for  [EIP-7495: SSZ StableContainer](https://eips.ethereum.org/EIPS/eip-7495) and join a testnet Nimbus <> Lodestar testnet;
- Slasher - updating/refactoring/optimising Grandine's slasher;
- P2P stack - improve Grandine's higher level P2P networking [layer](https://github.com/grandinetech/grandine) and/or rewrite [the middle layer](https://github.com/grandinetech/eth2_libp2p);
- Rust-kzg - implement/update [PeerDAS related cryptography](https://github.com/ethereum/consensus-specs/blob/dev/specs/_features/eip7594/polynomial-commitments-sampling.md) in [Rust-kzg](https://github.com/grandinetech/rust-kzg), optimize MSM's and the rest of resource-intensive operations;
- Logging - refactoring the current Grandine's logging approach to more modern (potentially using [tracing](https://github.com/tokio-rs/tracing));
- PeerDAS improvements - the spec is still maturing for PeerDAS so there are a lot of changes and improvements that need to be implemented in Grandine;
- E2E testing - improve Hive and Kurtosis test infrastructure;
- Windows and MacOS support - Grandine's developers mainly use Linux, so Grandine is tested only on Linux. However, there are many Windows and MacOS users that would benefit from better support;
- Redesign Rayon to allow lazy evaluation without deadlocks;
- Adapt other consensus clients to run grandine-snapshot-tests;
- Other - any other mutually agreed Grandine's area that can be improved.

