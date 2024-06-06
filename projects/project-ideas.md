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

### Prysm: ePBS

Project at prysmaticlabs mentored by [@potuz](https://x.com/potuz_eth) and [@terencechain](https://x.com/terencechain). We currently have a fully specified [ePBS spec](https://github.com/potuz/consensus-specs/pull/2). And are actively working on a Go implementation as part of Prysm [here](https://github.com/prysmaticlabs/prysm/pull/13917). We plan to have a fully working PoC in the comming months and production code ready by exposition time in Devcon. Reading material includes some comprehensive documents. 
- The [design notes](https://hackmd.io/uWVGcvcKSoqS4P5c5NHG3g), 
- [forkchoice annotated spec](https://hackmd.io/9lWaVhSxSYWmTvODqnapMA), 
- [validator guide annotated spec](https://hackmd.io/@ttsao/epbs-annotated-validator),
- [design constraints](https://ethresear.ch/t/epbs-design-constraints/18728), 
- [payload boosts](https://ethresear.ch/t/payload-boosts-in-epbs/18769). 

As for working conditions, we would not have weekly calls as in previous cohorts, but rather focus on code review and implementation work. Fellows are expected to carry their own research and asynchronously request help/discussions on Discord. Some areas of independent interest could be implementation of variations of ePBS like *slot auctions* or *execution tickets*. Please refer to [Barnabé's doc](https://mirror.xyz/barnabe.eth/QJ6W0mmyOwjec-2zuH6lZb0iEI2aYFB9gE-LHWIMzjQ) for a high level introduction. 

### Prysm: Custom golang implementation of libp2p
Mentored by [@nisdas](https://github.com/nisdas) and [@nalepae](https://github.com/nalepae).

The project proposal involves developing an in-house implementation of the necessary parts of the libp2p protocol. 
The complete project description is available [here](https://hackmd.io/@6-HLeMXARN2tdFLKKcqrxw/rkU0eLmEC).

### Prysm: Light client support
Mentored by [@rkapka](https://github.com/rkapka).

The project's aim is to implement server-side support for Ethereum light clients. 
The complete project description is available [here](https://hackmd.io/q8fe302MQIayhtb9Aj-BJQ).

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


### Lodestar: Deposit Contract Snapshot Interface (EIP-4881)

By Lodestar Team

Our TypeScript based consensus client requires implementing a self-contained specification, [EIP-4881](https://eips.ethereum.org/EIPS/eip-4881) into our `/eth/v1/beacon/deposit_snapshot` endpoint. This project will give a TypeScript-based candidate an understanding of the basic skills required of a protocol engineer by understanding a specification and implementing it into client software. In addition, you will be exposed to how deposits currently function within Ethereum, how weak subjectivity sync enables faster sync times and how merkle proofs secure Ethereum. For more information, please see: https://github.com/ChainSafe/lodestar/issues/4935


### Lodestar: BeaconChain Harness for Client Testing

By Lodestar Team

This project aims to have a candidate contribute a suite of testing utilities for testing the correctness of changes that interact with `BeaconChain`. This lightweight suite should be able to create a local dev chain with blocks and state for ensuring correct functionality for protocol compliance. The candidate will gain vast exposure to common specifications detailing how the beacon chain functions, including block processing, state transitions, slashings, withdrawals and deposits. For more information, please see: https://github.com/ChainSafe/lodestar/issues/6518


### Lodestar: Light Clients Research + Implementation

By Lodestar Team

In collaboration with the Nimbus consensus client team, there is ongoing research on the [light clients roadmap](https://hackmd.io/@etan-status/electra-lc) and how to improve this subsection of the protocol for more valuable building and experimentation. Some topics such as [slashings for sync committee messages (EIP-7657)](https://github.com/ethereum/consensus-specs/issues/3321) require more analysis and formal specifications, whereas [light client backfill](https://github.com/ethereum/consensus-specs/pull/3553) is ready for implementation on Lodestar alongside the Nimbus implementation. A candidate here will be able to focus on a niche part of the protocol to generate value for tooling and use cases without the need of full node infrastructure. Further summaries and information can be found on a [comprehensive summary of the light client roadmap](https://x.com/eawosikaa/status/1781672875545534605) and a [comprehensive summary relating to sync committee slashing](https://x.com/eawosikaa/status/1781659545846136876).

### Ipsilon

By chfast and axic

Research around the EVM, specifically (but limited to):
- Consensus-level eth supply calculation and exposing it as an opcode
- EVM memory repricing -- analysis and proposing a solution
- EVM analysis and design of transfer functions (executing and non-executing), e.g. `PAY`, `TRANSFER`, etc. There are many pre-existing proposals.
- Formally verify that EOF stack validation guarantees no stack underflows and overflows
- EVMMAX prototyping (this will help validate and ship EVMMAX):
  - Porting old MIMC code to new evmmax (https://github.com/jwasinger/mimc-evmmax)
  - Adjusting the MIMC code for Poseidon
- EOF research tooling:
  - EOF support in Huff
  - Visual analyzer for EOF written in Javascript
      - To be used in Remix, block explorers, and other web tools
  - EOF tooling for Foundry, display section sizes, etc. for optimization purposes
  - Work on the debugging extension
      - https://github.com/ipsilon/eof/issues/113
  - Extend Remix debugger to support EOF
  - Extend Foundry debugger to support EOF


### Protocol Security

By fredriksvantes

#### Auditing/(Differential)Fuzzing
##### Networking
- devp2p (discv4, discv5, ENR, RLP, ...)
- libp2p
- JSON-RPC
##### Cryptography
- hashtree
- constantine
- (c,go,rust implementations of)kzg(peerdas)
##### Clients
- Grandine
##### Account Abstraction
- Bundlers
##### EIPs
- EOF
- 4444
- PeerDAS
- 7702 (txpool)
##### Languages
- Solidity compiler
- Vyper compiler


### Nimbus: Extend KZG implementation in Constantine for PeerDAS

By Nimbus Team

This involves extending Constantine's KZG implementation to support PeerDAS. Potential aspects include:
- allowing for siwtching between c-zkg, Constantine, and potential other implementations
- formally benchmarking between these backends, including for example across different hardware configurations such as ARM, pre-AVX x86, and AVX x86
- allowing runtime detection and switching based on benchmarking of optimal cryptographic backends

### Nimbus: Create C bindings for Constantine

By Nimbus Team

This project would involve creating C bindings for the Constantine cryptography library. This library is written in Nim, and implements the cryptography on which Ethereum depends. Once implemented, it should be benchmarked to compare with BLST and other Ethereum cryptographic library bindings.

### Nimbus: Add support for Constantine as Nimbus cryptographic backend

By Nimbus Team

Nimbus currently uses BLST to implement BLS and KZG cryptography. Constantine supports this as well. This project would involve switching Nimbus to be able to use Constantine, then benchmarking and doing performance analysis of the result.

### Nimbus: Fuzzing

By Nimbus Team

The Nimbus CL and EL implementations have many fuzzable protocol components, such as, but not necessarily limited to: SSZ, RLP, JSON-RPC, REST JSON, and libp2p. This project would involve fuzzing any subset of these and presenting results.
