# Custom golang implementation of libp2p in Prysm
An in-house implementation of the necessary parts of the libp2p protocol in the Prysm client

## Motivation
The project aims to develop an in-house implementation of p2p communication library and leverage some of the core components from the existing [go-libp2p](https://github.com/libp2p/go-libp2p) libraries. go-libP2P library(and its variants in other languages) are used by almost all consensus clients for p2p network communications among beacon chain nodes. The scope of the project enables the Prysm team to be independent of any third party for the integral components. It also allows for elimination of redundant components from go-libp2p which are not actively used, while achieving the same performance. Implementing the project also involves incorporating a deep understanding of libP2P and networking layer. 

## Project Description
The libP2P protocol has several components for example: Noise, multiplexer, pubsub, ping etc. Not all these components are used by Prysm, hence the major tasks or the solution for the problem at hand are:
* Segregate the components in libP2P which are used in Prysm, this involves a clear marking of:
    *  the individual elements which can be used as-it-is 
    *  the elements which need refactoring to incorporate only the segments used by libP2P
    *   the components which can be eliminated completely. 
    *   Thanks to @MaxDav for noting some required changes in his [notes](https://hackmd.io/zIWLqRzWT76I5T_sPbJ0KA).
* Implement a package with the necessary components of libP2P used by Prysm, in sync with [p2p specs for CL](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md).
* Extensively test the package.
* Switch the current libP2P implementation in Prysm to the new package developed.
* Performance analysis and optimizations of the in-house version compared to the Protocol Labs' implementation on Holesky network.

## Specification

We'll will following the [CL specs](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md) for the development of this new package.

Major components used in Prysm:
* `devp2p/discv5` (outside the project scope)
* `tcp/quic` connection protocols
* `NOISE` protocol negotiation, can be used as-it-is
* [`multistream-select`](https://github.com/multiformats/multistream-select/)
* [`mplex`](https://github.com/libp2p/specs/tree/master/mplex)
* [`yamux`](https://github.com/libp2p/specs/blob/master/yamux/README.md)
* [`gossipsub`](https://github.com/libp2p/specs/blob/master/pubsub/gossipsub/gossipsub-v1.0.md)
* [`ssz`](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md) encoding 


## Roadmap

**Month 1: Design and Initial Development** 
- Deep dive into the p2p-interface.md from the consensus specs. Understand the theoretical aspects thoroughly.
- Start examining the existing libp2p components used in the Ethereum beacon chain. Identify which components are utilized by Prysm and which are not necessary.
- Begin the design of the new libp2p for Prysm based on the specs studied. Outline the architecture and identify all dependencies and external libraries needed.
- Start implementing the basic framework of the custom libp2p. Focus on integrating core components that are essential for Prysm’s functionality.
 
**Month 2: Development Continuation**
- Continue building out the libp2p implementation, adding more complex functionalities and integrating with Prysm’s existing systems.
- Begin internal testing of individual components. Use the guidelines from the [Prysm’s end-to-end development tools]( https://docs.prylabs.network/docs/devtools/end-to-end) and [Golang principles](https://docs.prylabs.network/docs/contribute/golang-principles) for coding and testing standards.

**Month 3: Testing and Documentation**
- Develop and implement an extensive testing plan. Test each component individually, followed by integrated testing with the Prysm beacon node.
- Start writing documentation for the new implementation. Ensure all features and modifications are well-documented.

**Month 4: Deployment and Performance Tuning**
- Integrate the new libp2p implementation into the Prysm beacon node, hidden behind a feature flag.
- Conduct comprehensive performance tests on the Holesky testnet, comparing the new in-house implementation with the external libp2p version. Gather and analyze performance data to identify any issues or potential improvements.

## Possible Challenges
Since libP2P is already in use among several consensus clients, one key challenge for us would be maintaining the same performance as provided by libP2P. Further the project involves a deep understanding in networking and implementation and refactoring of several components, it might not be that easy to do.  
## Goal of the project
* Understand libP2P networking package and its components within the beacon chain.
* Develop and integrate a simplified package tailoring to Prysm's specific requirements of libP2P, while including some of the core dependencies as it-is.
* Performance analysis.

### Non-goals
* Re-implementing core-dependencies which can be used as-it-is.

## Collaborators
### Fellows
* [Rose Jethani](https://github.com/rose2221)
* [Richa](https://github.com/Richa-iitr)
* [MaxDav](https://github.com/MaximeDavin)
* [kira](https://github.com/shyam-patel-kira)
 
### Mentors
* [manunlp](https://github.com/nalepae)

## Resources
Relevant codebases:
* [prysm/beacon-chain/p2p](https://github.com/prysmaticlabs/prysm/tree/develop/beacon-chain/p2p)
* [prysm/beacon-chain/sync](https://github.com/prysmaticlabs/prysm/tree/develop/beacon-chain/sync)
* [prysm/cmd/prysmctl/p2p](https://github.com/prysmaticlabs/prysm/tree/develop/cmd/prysmctl/p2p)
* [prysm/tools/enr-calculator](https://github.com/prysmaticlabs/prysm/tree/develop/tools/enr-calculator)
* [go-libP2P](https://github.com/libp2p/go-libp2p/tree/master)

Specs:
* https://github.com/libp2p/specs

Others:
* https://docs.libp2p.io/concepts/introduction/overview/
