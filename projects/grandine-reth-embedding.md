# Embedding Reth into Grandine

Embedding Reth into Grandine so users do not need to run Reth separately.

## Motivation

Grandine is a new and minority CL(Consensus Layer) client [1]. [Reth](https://github.com/paradigmxyz/reth) is another minority EL(Execution Layer) client [2]. Combining Grandine and Reth can form a complete minority client node implementation. 

Usually, combining CL client and EL client is a challenging task for many users, even blockchain engineers. Combining the two kinds of clients will greatly reduce the cost of starting a full node and improve user experience. 

On the other hand, if the two Rust-based clients are deeply integrated, it will bring positive improvements to the performance of the Ethereum full node, especially in terms of latency, which will greatly promote the adoption of Grandine and Reth client implementations from communities such as MEV, Relay, and RPC. The client diversity is very important for Ethereum's resilience and success [3]. It is very necessary to improve Ethereum's resilience by using a minority client. So, this project idea is a win-win situation and should be encouraged.

## Project description

This project aims to integrate Reth, an Ethereum Execution Layer (EL) client, into Grandine, a Consensus Layer (CL) client. The goal is to create a unified, full-node Ethereum client implementation that combines these two minority clients. 

Two integration approaches could be considered:

1. Inter-process integration via Engine API: A trivial approach that maintains separation between Grandine and Reth processes.

2. In-process integration: A more complex but potentially more performant approach that deeply integrates Reth into Grandine.

The project will prioritize the in-process integration approach to maximize performance benefits, particularly in reducing latency. This integration will simplify the process of running a complete Ethereum node, significantly improve overall performance, and contribute to Ethereum's client diversity and network resilience.

## Specification

Develop a seamless integration between Grandine (CL) and Reth (EL) codebases, focusing on in-process integration.

Implement efficient in-process integration between the CL and EL components:
* Design and implement a shared memory model for state and data exchange.
* Develop synchronization mechanisms to ensure data consistency.
* Optimize function calls and data structures for minimal overhead.
* Ensure synchronization of state and data between Grandine and Reth components.
* Create a unified configuration and management interface for the combined client.
* Conduct testing and preliminary performance assessment.
* Write documentation.

## Roadmap

* Phase 1: Research

  + Analyze both Grandine and Reth codebases in depth
  + Design integration solution
      * Two integration approaches may be investigated, although in-process integration is favored.

* Phase 2: Planning

  + Plan for potential code changing in both Grandine and Reth
  + Define internal APIs and data structures for integration

* Phase 3: Integration Development

  + Implement core integration of Reth into Grandine
  + Develop shared memory models and synchronization mechanisms
  + Refactor Grandine and Reth code as necessary for tight integration
  + Address potential kinds of integration issues
  + Create unified configuration system

* Phase 4: Testing and Preliminary Performance Assessment

  + Conduct testing on testnets and to ensure it capable of running as a validator
  + Complete preliminary performance assessment
      * It is expected that the integration implementation will demonstrate some performance advantages.

* Phase 5: Documentation

  + Create detailed user and developer documentation
  + Plan for community feedback and ongoing maintenance

## Goal of the project

By the end of EPF-5, success for this project will be defined by:

* The integrated Grandine-Reth client capable of running as a validator on the testnet.
* Documentation for users and further planning.
* Preliminary performance assessment on the integrated implementation.

## Collaborators

### Fellows 

[MJZK](https://github.com/mjzk)

### Mentors

[Saulius Grigaitis](https://github.com/sauliusgrigaitis) 

## Resources

1. [Grandine, an Ethereum consensus layer client](https://github.com/grandinetech/grandine)
2. [Reth, an Ethereum execution layer client](https://github.com/paradigmxyz/reth)
3. [Diversify Now](https://clientdiversity.org/)