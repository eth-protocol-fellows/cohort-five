# reth-verkle PoC
This project will involve migration of reth EL-client from merkle tries to verkle tries, and enable it to act as a stateless client.


## Motivation

stateless-cleints are very much necessary for the decentralisation of ethereum, due to following reasons:

1. ethereum's current state size is too large for many nodes to keep in working memory, requiring expensive SSDs for storage and slowing down block validation and chain syncing, stateless clients will allow validators to validate blocks without maintaining the full state, significantly reducing their resource requirements and also reducing sync times.
2. using verkle tries for stateless makes client architecture is more compatible with a Zk-EVM future, with some added explored benefits like increasing of gas-limits to large extents.

the main motivation of creating a reth-verkle poc is is to develop more working implementation of verkle-integration in EL-clients, which will help in running interop with other clients, further research and allow reth to prepare for the verge, learn more about why statelessness is important here: [Why it's so important to go stateless](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html#fnref:3)

## Project description

this project aims to integrate [rust-verkle](https://github.com/crate-crypto/rust-verkle) crytographic primitives into [reth](https://github.com/paradigmxyz/reth).
* a basic TL;DR will be:
1. obtain pre-state from verkle-block witness.
2. then execute a block statelessly using this witness, instead of the local chain.

## Specification

Technical specifications will involve following the defined [specs](https://notes.ethereum.org/@vbuterin/verkle_tree_eip#Header-values) and [Verkle serialization format in SSZ](https://notes.ethereum.org/Si5tEWlMTYerkhG3fOIAMQ) for making changes in reth:
1. A block/execution witness (i.e: the verkle proof required to execute a block statelessly) is an SSZ-encoded serialization of the following ExecutionWitness structure:
```
class ExecutionWitness(container):
    state_diff: StateDiff
    verkle_proof: VerkleProof
```
2. 


## Roadmap

1. Jul - mid august: understanding of geth and ethereumJs client implementation, and rust-verkle cryptography.
2. mid august - end sept: implementation of the proposed changes.
3. october - devcon: testing and proper benchmarking of the proposed changes.

## Possible challenges

This is a long project, and will require deep understanding of not only verkle related cryptography but complete EL client architecture, from database modeling(for trie modifications), evm as well(fetching appropiate storage data for witness), networking-protocol(for propogation of witness)
Once the code-base is ready, testing and proper benchmarking of the peformance will be the most difficult bottlneck which can then involve further implementations of optimising techniques to boost performance.

## Goal of the project

The end goal of this project will be achieved if reth is able to join the latest iteration of Kaustinen devnet(devnet for verkle-tries), passing all MPT-VPT transition tests and EL-spect tests for this change, with proper performance comparable to other client implementations.

## Collaborators

### Fellows 

only me till now: [Aditya](https://github.com/1010adigupta) 

### Mentors

reth team: [Georgios](https://github.com/gakonst), [Roman](https://github.com/rkrasiuk), [Oliver](https://github.com/onbjerg), [Matthias](https://github.com/mattsse)
EF team: [Ignacio](https://github.com/jsign)

## Resources

* code-bases:
    1. [reth](https://github.com/paradigmxyz/reth) EL client.
    2. [rust-verkle](https://github.com/crate-crypto/rust-verkle): rust implementation of verkle-tries.

* overview:
    1. [Verkle trees-vitalik](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
    2. [Verkle tree structure](https://blog.ethereum.org/2021/12/02/verkle-tree-structure)
    3. [cryptography used in Verkle Tries](https://hackmd.io/PgsD0I0dQHOGuDx7D6o-dg#Cryptography-used-in-Verkle-Tries)
    4. [Anatomy of a verkle proof](https://ihagopian.com/posts/anatomy-of-a-verkle-proof)

* EIPs:
    1. [EIP-6800: Ethereum state using a unified verkle tree](https://github.com/ethereum/EIPs/pull/6800)
    2. [EIP-4762: Statelessness gas cost change](https://eips.ethereum.org/EIPS/eip-4762)
    3. [EIP-7545: Verkle proof verification precompile
](https://github.com/ethereum/EIPs/pull/7926)
    4. [EIP-2935: Save historical block hashes in state](https://eips.ethereum.org/EIPS/eip-2935)
    5. [EIP-7748: State conversion to Verkle Tree](https://github.com/ethereum/EIPs/pull/8752)