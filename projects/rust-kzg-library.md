# Project Template

DAS-Specific Crytpography in Grandine's Rust-KZG

*The implementation of PeerDAS-related cryptography (eip-7594) in Grandine's rust-kzg library.*

## Motivation

My motivation for this project stems from the intriguing discussions about Ethereum's scalability, sharding, **DAS**, and cryptography.

**DAS**: (Data Availability Sampling) allows nodes to verify block data availability without downloading the entire block, reducing resource usage and increasing throughput. This is crucial for scaling Ethereum as it lessens the data burden on individual nodes.

However, DAS-specific cryptography is not currently implemented in Grandine. I want to address this gap, as it will help me (and hopefully) others develop a better understanding of DAS and its cryptography.

## Project description

The project involves implementing essential DAS cryptographic functions in the Rust-kzg library for seamless integration into the Grandine client.

With DAS, validators can be confident that the blob data is available and correctly committed. Each validator only needs to randomly sample a few data points and generate a proof, eliminating the need to check the entire blob. If any data is missing, it will be detected quickly, and the blob will be rejected.

## Specification

The consensus specs, specifically the [EIP-7594 polynomial commitments](https://github.com/ethereum/consensus-specs/blob/dev/specs/_features/eip7594/polynomial-commitments-sampling.md), outline the requirements. These are mainly divided into 3 functions:

`compute_cells_and_kzg_proofs`: Which helps compute all the cell proofs for an extended blob.
`verify_cell_kzg_proof_batch`: Which verify that a set of cells belong to their corresponding commitments.
`recover_cells_and_kzg_proofs`: Which given atleast 50% of cells for a blob, can recover all the cells and proofs.

## Roadmap

- First, deep-diving into the consensus specs docs on eip7594, extending the polynomial commitments with functions required for DAS.
- Referencing existing DAS implementations like that done on c-kzg.
- Implement DAS in rust-kzg
- Develop and implement testing plan
- Ensure compatibility with Grandine and other rust implementations of the consensus client network


## Possible challenges

The biggest challenge is the knowledge gap, which I am currently bridging. Due to limited resources and documentation, I will rely on the specs as my primary reference. Additionally, thorough testing with clients and extensive debugging will be crucial and a challenge.

## Goal of the project

By the end of EPF-5, success for this project will be defined by:

Seamlessly integrating optimized DAS cryptographic functions into the Rust-kzg library, significantly enhancing DAS operations.
Providing comprehensive documentation and benchmarks to demonstrate these enhancements.


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

