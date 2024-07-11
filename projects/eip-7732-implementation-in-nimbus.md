# Project Template

enshrined Proposer Builder Separation (eip-7732) Implementation in the Nimbus Consensus Client

## Motivation

What problem is your project is solving? Why is it important and what area of the protocol will be affected?

This project aims to implement `eip-7732: enshrined proposer builder separation` by implementing proposer builder separation (PBS) which currently occurs as a side car in the protocol in the Nimbus consensus client. This helps to prevent transaction censorship at the protocol level, create a trustless system between proposers and builders and with scaling Ethereum by enabling other upcoming upgrades such as  Danksharding and Inclusion lists.

## Project description

This project aims to bring proposer-builder interaction where block proposers outsource their block building rights to specialised block builders in order to maximize extractable value from favorably ordering transactions into the protocol.
Separating the block building from the block proposal means that the Maximal Extractable Value (MEV) extracted will be distributed over more validators rather than centralizing with the most effective MEV searcher. Also allowing specialized block builders to exist takes the burden of block building away from individuals, requiring less resources to be able to participate in the protocol while still maximizing the number of independent validators that can check the blocks are honest.
What this project aims to do is implement this proposer-builder separation in the Nimbus Consensus client as specified in the eip-7732 document.

## Specification

This specification involves decoupling the execution from consensus and the notion of splitting the slot into 2 parts
All major changes will be happening in the Consesnus client as follows:
- Beacon changes specs: Add new staked consensus participants called Staked Builders and new honest validators duties called payload timeliness attestations.
- Fork choice specs: Modification of the fork choice for ePBS upgrade
- P2P specs: Modification of Consensus layer network specifications for p2p
- Honest Validator guide specs: changes and additions to the Honest validator guide included in the ePBS fork
- Honest Builder spec guide: actions of a "builder" participating in the Ethereum proof-of-stake protocol
- Fork logic: Implement fork choice logic such that the following features are guaranteed: unconditional payment to the proposer, Builder reveal safety, Builder withhold safety.

## Roadmap

What is your proposed timeline? Outline parts of the project and insight on how much time it will take to execute them.

_Week 5-6_: Understand the current Nimbus-eth2 architecture with the [`storeBlock`](https://github.com/status-im/nimbus-eth2/blob/unstable/beacon_chain/gossip_processing/block_processor.nim `storeBlock`) procedure as a good entry point while getting familiar with the Nim language<br>
_Week 7-8_: Implement beacon change specs and write tests <br>
_Week 9-10_: Implement the fork-choice specs and write tests <br>
_Week 11-12_: Implement the p2p specification changes for ePBS and write tests <br>
_Week 13-14_: Implement the honest validator and builder specs with accompanying tests <br>
_Week 15-16_: Research and implement ePBS compatible fork choice logic.

## Possible challenges

- Navigating a language I'm new to but love due to it's performance minimal runtime overhead
- Finding a solution for a suitable fork choice logic compatible with ePBS
- Implementing a suitable solution for withdrawals and payments. As withdrawals from the beacon chain are complex in nature, involving removing funds from one layer and crediting them on another.
- Compatibility with existing Nimbus componenents


## Goal of the project

What does success look like? Describe the end goal of the project, scope, state and impact for the project to be considered finished and successful.

## Collaborators

### Fellows 
@Kira is working on something similar on Prysm, @jihood in lighthouse

### Mentors

@tersec

## Resources

- https://eips.ethereum.org/EIPS/eip-7732#abstract
