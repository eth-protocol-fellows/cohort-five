# `eip-7732: enshrined Proposer-Builder Separation` implementation in the Nimbus Consensus Client

## Motivation

Transitioning from MEV-Boost to enshrined PBS (ePBS) eliminates reliance on third-party software, broadens block construction responsibilities, and ensures block construction adheres to the network's security rules. This integration fosters a transparent and competitive marketplace for block space.

Currently, the system's dependence on a few relays introduces centralization risks and security vulnerabilities, as these relays operate outside Ethereum’s consensus rules. Enshrining PBS within the protocol seeks to mitigate these risks by establishing a secure proposer-builder relationship, encourage direct protocol engagement and create a transparent, equitable MEV market. By reducing reliance on external systems, ePBS enhances decentralization, improves censorship resistance, and supports long-term goals like MEV redistribution mechanisms (e.g., MEV-burn).

## Project description

This project aims to integrate proposer-builder interaction, where block proposers delegate their block building rights to specialized block builders to maximize extractable value by optimally ordering transactions within the protocol. By separating block building from block proposal, the Maximal Extractable Value (MEV) is distributed across more validators, rather than being concentrated with the most effective MEV searchers. Allowing specialized block builders to operate also reduces the resource burden on individual participants, enabling more independent validators to verify the honesty of blocks. This project seeks to implement proposer-builder separation in the Nimbus Consensus client, following the specifications of the [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732#abstract) document.

## Specification

This specification involves decoupling the execution from consensus and the notion of splitting the slot into 2 parts
All major changes will be happening in the Consesnus client as specified in this [eip](https://eips.ethereum.org/EIPS/eip-7732). 

## Roadmap
This below schedule might not hold strictly and the proposed two-weeks-per-component schedule might prove difficult, and I suspect it might prove necessary to interleave things more and difficult to try to plan too tightly. However, the main challenges are listed in this roadmap:

- _Week 5-6_: Understand the current Nimbus-eth2 architecture with the [`storeBlock`](https://github.com/status-im/nimbus-eth2/blob/unstable/beacon_chain/gossip_processing/block_processor.nim `storeBlock`) procedure as a good entry point while getting familiar with the Nim language<br>
- _Week 7-8_: Implement beacon change specs and write tests <br>
- _Week 9-10_: Implement the fork-choice specs and write tests <br>
- _Week 11-12_: Implement the p2p specification changes for ePBS and write tests <br>
- _Week 13-14_: Implement the honest validator and builder specs with accompanying tests <br>
- _Week 15-17_: Research and implement ePBS compatible fork choice logic.
- _Week 18-19_: Going through already implemented work and considering performance optimisation and improving efficiency
- _Week 20_: Prepare final updates and presentations on work done.

## Possible challenges

- Navigating a new language
- Ensuring Compatibility and interoperability with existing Nimbus Ethereum infrastructure and be flexible for future updates like sharding or new layer-2 solutions.
- The extent to which there are test vectors. In theory there might need to be at least one other project to compare with.

## Goal of the project

The goal of the project is to have a working and well-tested implementation of ePBS in the Nimbus Consensus client satisfying security conditions. Even if it doesn't end up being production-ready, just having proofs of existence of this. Success will be measured by the efficiency and performance of the completed implementation and how it is able to integerate with the existing Nimbus codebase. 

## Collaborators

### Fellows 
@[kira](https://github.com/shyam-patel-kira) is working on something similar in the Prysm consensus client

### Mentors

- @[tersec](https://github.com/tersec)
- @[Potuz](https://github.com/potuz/)
- @[Terrence](https://github.com/terencechain/)

## Resources
* [eip-7732](https://eips.ethereum.org/EIPS/eip-7732#abstract)
* [Ethereum Consensus Specs](https://github.com/ethereum/consensus-specs/tree/v1.3.0/#stable-specifications)
* [Nim Manual](https://nim-lang.org/docs/manual.html)
* [Nimbus ETH2](https://github.com/status-im/nimbus-eth2)
* [Proposer-Builder Separation](https://ethereum.org/en/roadmap/pbs/)

