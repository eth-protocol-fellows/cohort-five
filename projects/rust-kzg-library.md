# Project Template
A KZG Library for Ethereum Data Sharding that supports multiple ECC backend libraries.
*The implementation of PeerDAS-related cryptography, MultiScalar Multiplications (MSM), and other resource-intensive operations in Rust-KZG, which will be further used to implement Danksharding in the Grandine client.*

## Motivation

The project aims to enhance Ethereum's scalability and efficiency by implementing PeerDAS-related cryptography, MSM, and other resource-intensive operations in Rust. This will support scalability efforts in Proto-Danksharding ([EIP-4844](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/polynomial-commitments.md), [EIP-7594](https://github.com/ethereum/consensus-specs/blob/dev/specs/_features/eip7594/polynomial-commitments-sampling.md)), enabling nodes to reduce their load using DAS and advancing towards full Danksharding.


## Project description

The proposed solution involves porting critical cryptographic functions from [C-KZG](https://github.com/ethereum/c-kzg-4844/tree/das) to the Rust-KZG library for seamless integration into the Grandine client. The library will generate, commit, and verify polynomial commitments using the KZG scheme. It will be lightweight, efficient, user-friendly, compatible with the existing Grandine codebase, and thoroughly tested to meet client requirements. 

## Specification

**Initial Research and Familiarization:**
* Study PeerDAS specifications and related cryptographic protocols.
* Review current implementations in other languages (e.g., C) to understand core functionalities and optimizations.

**Implementing KZG Cryptography in Rust:**
* Develop functions for polynomial commitments using the KZG scheme.
* Ensure compatibility with the existing Rust-KZG library and optimize for performance.

**Optimizing Multi-Scalar Multiplications (MSMs):**
* Implement efficient algorithms for MSMs, a key operation in many cryptographic proofs.
* Utilize Rust’s concurrency and parallelism features to enhance performance.

**Integration and Testing:**
* Integrate the implemented functions into the PeerDAS protocol.
* Develop comprehensive test suites to validate correctness and performance.
* Benchmark against existing implementations to ensure improvements.


## Roadmap

What is your proposed timeline? Outline parts of the project and insight on how much time it will take to execute them. 
*In Progress*

## Possible challenges

One issue is the knowledge gap, which I am currently addressing. Another is performance optimization; achieving optimal performance while maintaining code readability and simplicity is challenging. Extensive testing and profiling are required to identify and resolve performance bottlenecks.

## Goal of the project

Success for this project means seamlessly integrating optimized cryptographic functions into the Rust-KZG library, greatly enhancing PeerDAS operations. By the end of EPF-5, the project aims to:
- Fully implement and test KZG cryptography functions in Rust.
- Optimize MSMs, showing improved performance over existing implementations.
- Provide comprehensive documentation and benchmarks showcasing these enhancements.


## Collaborators

### Fellows 

[Ifeoluwa Oderinde](https://github.com/owanikin)
[VillageFarmer](https://github.com/DeluxeRaph)

### Mentors

[Saulius Grigaitis](https://github.com/sauliusgrigaitis) 

## Resources

- [PeerDAS Specification](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Rust-KZG Library Repository](https://github.com/ethereum/rust-kzg)
- [Danksharding Overview](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Polynomial Commitments Research](https://research.polytope.technology/polynomial-commitments)
- [KZG Polynomial Commitments Explanation](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
- [Elliptic Curve Pairings by Vitalik Buterin](https://medium.com/@VitalikButerin/exploring-elliptic-curve-pairings-c73c1864e627)
- [MSM](https://hackmd.io/@tazAymRSQCGXTUKkbh1BAg/Sk27liTW9)

