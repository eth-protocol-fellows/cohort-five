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
- Performance profiling harness - research various profiling tools such as [profiling](https://github.com/aclysma/profiling), especially the tooling that has the potential to be integrated into CI for regular performance profiling, also identify Grandine's areas that need optimizations for CPU and memory consumption;
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
- [EIP-4881](https://eips.ethereum.org/EIPS/eip-4881) deposit snapshot implementation;
- Lightclient implementation;
- Integrate Grandine in various existing fuzzing projects and/or write new fuzzers;
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
- allowing for siwtching between c-kzg, Constantine, and potential other implementations
- formally benchmarking between these backends, including for example across different hardware configurations such as ARM, pre-AVX x86, and AVX x86
- allowing runtime detection and switching based on benchmarking of optimal cryptographic backends

### Nimbus: Create C bindings for Constantine

By Nimbus Team

This project would involve creating C bindings for the Constantine cryptography library. This library is written in Nim, and implements the cryptography on which Ethereum depends. Once implemented, it should be benchmarked to compare with BLST and other Ethereum cryptographic library bindings. In addition, these C bindings might be to existing or newly created assembly backends (e.g., for ARM).

C bindings for Constantine's Verkle cryptography support are of particular note due to active interest from other client teams in using Constantine in this capacity if they become available.

### Nimbus: Add support for Constantine as Nimbus cryptographic backend

By Nimbus Team

Nimbus currently uses BLST to implement BLS and KZG cryptography. Constantine supports this as well. This project would involve switching Nimbus to be able to use Constantine, then benchmarking and doing performance analysis of the result.

### Nimbus: Fuzzing

By Nimbus Team

The Nimbus CL and EL implementations have many fuzzable protocol components, such as, but not necessarily limited to: SSZ, RLP, JSON-RPC, REST JSON, and libp2p. This project would involve fuzzing any subset of these and presenting results.

### Besu: Portal Client

By Besu Team

Standalone, modular Portal Client written in Java - build a from-scratch implementation using Dagger for compile-time inversion of control.

### Besu: PeerSpective - Peering Tool

By Besu Team

Standalone utility to visualize, interrogate and manipulate devp2p network peers. Will be used to deeply inspect and analyze peering handshakes and sub protocols used in execution layer clients.

### Besu: Archive mode with Bonsai storage

By Besu Team

Implement Besu's Bonsai mode data storage to work with archive nodes.

### Besu: SSZ Transaztions

By Besu Team

Introduce SSZ as a supported encoding format by implementing [EIP-6493](https://eips.ethereum.org/EIPS/eip-6493)

### Trin: Add/Improve Portal Beacon network hive tests

By Kolby ML

Portal Beacon is a consensus layer light client implementation used for verifying post-merge data of various Portal Networks. (This is for light clients, as full nodes can use their already running consensus client for proving)

Already existing tests can be found under `simulators/portal/beacon` at https://github.com/ethereum/hive

Hive is a cross client black box testing framework for testing interoperability between client implementations of execution layer, consensus layer, and Portal Network clients

### Trin: Add/Improve Portal State network hive tests

By Kolby ML

The description of what Hive is can be found in the post above.

Portal State is an execution layer light client for archival state data. The goal is providing archival state access for all blocks, faster access for recent blocks for use in wallets etc, well at the same time being validate-able and requiring minimal resources e.x. a few gigabytes of storage.

So the goal of this network is to one day be the backend of wallets. Instead of all users using centralized backends to access Ethereum such as Infura, they can use Portal, to access Ethereum in a light, validate-able and decentralized way. This is one use of Ethereum State data, but there are bound to be more.

Already existing tests can be found under `simulators/portal/state` at https://github.com/ethereum/hive

### Trin: Contribute to Trin's Execution Client, the first execution client being built to not use devp2p

By Kolby ML

To feed the Portal State network we need fine grain access to state data, well we could modify a pre-existing execution client, the issue is that they have very different incentives and goals. An example of this is Erigon and Reth's Receipt type doesn't support pre-byzantium receipts correctly, their JSON-RPC will return invalid receipts for older blocks. But we need that older valid receipt format for our History network. If the client we rely on priorities change in the future that poses a risk to our foundation.

Different teams have different priorities which is normal, because of our requirements having the security of our own execution client means that our infrastructure is never at risk based on the decisions of a 3rd party which ensures the longevity of our project.

Currently execution clients participate in a peer-to-peer network referred to as devp2p to get older blocks. With the inclusion of EIP 4444's devp2p will no longer serve or need older blocks to sync to the head of the chain. Older blocks will still be accessible through the Portal History network

What are the current goals?

- execute to the front of the chain so we can gossip the state trie's onto the Portal State Network

How could others help?

- Making it so we can resume execution after restart instead of starting from block 0
- Add a caching layer between the database and evm, to reduce database calls on hot data and decrease io delays

There is a lot of work to be done. Currently we don't need to interact with a consensus client as we can execute up to HEAD - 8192 from era/era1 files (an archive format which contain blocks), but in a week or two the client should* be able to reach HEAD - minus 8192 blocks and I will begin work on implementing the Engine API

After a viable solution is built for our specific use case for the Portal state network, building out our execution client for other users could be interesting

The difference between `Trin` and `Trin Execution`

- Trin is an implementation of the Portal Network Specification https://github.com/ethereum/portal-network-specs which contains outlines for execution light clients or in other words light protocol access for Ethereum, it also contains specifications for an implementation of a consensus light client.
- Trin Execution is an adjacent project with the goals of building an execution client which can feed the Portal State network. All execution clients to date don't include the required interfaces (and some don't have the state in the required formats), to feed Portal's state network. With Trin Execution being built to not use devp2p from day one and the upcoming addition of stateless execution clients, the idea of what is an execution client is likely to become much more diverse.
