# PeerDAS in Constantine and Nimbus

Extending the KZG implementation of Constantine in Nim to include PeerDAS functionalities and erasure coding, which will be further integrated in Nimbus client backend.

## Motivation

PeerDAS helps solve data availability problem in a peer-to-peer manner with no trusted parties in between. It is one of component to enable danksharding  which will make transaction costs for rollups cheaper and scaling Ethereum's TPS(transaction per second). Other than that, it is required for the development of very lightweight clients that do not store much historical data ("stateless clients"). I will be able to contribute to a recent development in Ethereum and understand the protocol deeply. 

## Project description

Data availability sampling is required for validators to quickly and efficiently verify blob data. Using DAS, the validators can be very certain that the blob data was available and correctly committed. Every validator can randomly sample just a few data points and create a proof, meaning no validator has to check the entire blob. If any data is missing, it will be identified quickly and the blob rejected.

The proposed project is to implement peerDAS related cryptography in Nim that can be seamlessly integrated into the Nimbus client. The implementation will provide efficient and secure erasure coding primtives, allowing for optimized blob data verification and reconstruction of data. It will be implemented to be modular and also ensuring compatibility with the existing codebase of the Constantine. It will be implemented and integrated to the Nimbus client in collaboration with the Nimbus team, and will be thoroughly tested to ensure that it meets the consensus test requirements.

## Specification

- For the reference implementation we would be considering the [Rust implementation](https://github.com/crate-crypto/peerdas-kzg) and, [ethereum/research](https://github.com/ethereum/research/tree/master/erasure_code) can also be used as reference for erasure coding.
- Other reference for cryptography that can be used is [c-kzg lib](https://github.com/ethereum/c-kzg-4844/tree/das).
- For testing, the [consensus test vectors](https://github.com/ethereum/consensus-spec-tests/tree/v1.5.0-alpha.2/tests/general/eip7594/kzg) can be used as data or inputs.
 
## Roadmap

### Phase 1

Week 5-6: Implement the cryptography related to [polynomial-commitments](https://github.com/ethereum/consensus-specs/blob/dev/specs/_features/eip7594/polynomial-commitments-sampling.md) locally for getting familiar with the Nim language and understand Constantine's coding style.

Week 6-12: Implement polynomial-commitments specs and write tests.

Week 12-13: Benchmark the polynomial-commitments specs implementation with the rust implementation. Identify and research about the performance bottlenecks and try to parallelize the implementation for optimization.

### Phase 2 

Week 13-14: Understand coding style and architecture of Nimbus client and discuss with mentors about the [peerdas-p2p](https://github.com/status-im/nimbus-eth2/tree/peerdas-p2p) branch and its status of integration of rust implementation as a backend.

Week 14-19: Integrate constantine's cryptography as a backend for peerDAS functions and benchmark it.

Week 20: Prepare final updates and presentations on work done.

## Possible challenges

The project may face the following challenges:
1. **Integration**: As the Constantine library in Nim has a different coding style, there might be issues in integrating it as a backend option. Extensive research and collaboration with the community and mentors will be necessary to overcome this challenge.
2. **Performance Optimization**: Achieving optimal performance while maintaining code readability and simplicity can be challenging. Extensive testing and profiling will be required to identify and address any performance bottlenecks.

## Goal of the project
The goal of this project is to implement the `EIP7594: polynomial-commitments` consensus specs functions in Nim in constantine,along with its required tests and benchmarks. Further, try to integrate the complete EIP-7594 in the Nimbus-eth2 client and provide Constantine's implementation as a backend option.

## Collaborators

### Fellows
- [Nilav Prajapati](https://github.com/gerceboss)

### Mentors
- [tersec](https://github.com/tersec)
- [Agnish Ghosh](https://github.com/agnxsh)

## Resources
- [Nimbus-eth2 client](https://github.com/status-im/nimbus-eth2)
- [Constantine](https://github.com/mratsim/constantine)
- [EIP-7594 consensus specs](https://github.com/ethereum/consensus-specs/tree/dev/specs/_features/eip7594)
- [c-kzg lib](https://github.com/ethereum/c-kzg-4844/tree/das)