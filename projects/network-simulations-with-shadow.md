***DRAFT**, 2024-07-12*

# Network Simulations with Shadow

Enable and run network simulations to rapidly test and improve client networking.

## Motivation

Networking is, naturally, a crucial component in every client. Both specifications and implementations need to be developed carefully so that the p2p network is resilient to attacks and uses as little bandwidth as possible (in order to make home staking feasible in as many locations as possible). However, testing networking changes is hard: Devnets usually feature only a few nodes in a centralized network, and testnets are unsuitable for proper network testing, as they can not be centrally and quickly updated with new client version. Manually creating a globally distributed testnet with a realistic number of nodes (i.e. thousands) is cost- and effort-prohibitive. Network simulations usually do not allow full software to be tested, but require specifically written code, which reduces realism. Ideally, we need a solution to run simulations with actual client software and realistic network parameters (many nodes with differing latencies and bandwidths). An existing approach to this is the [Kurtosis `ethereum-package`][4] developed by the EF Devops team, which can be used in conjunction with [Attacknet][5] by Trail of Bits to test how an Ethereum network reacts to several types of faults.

## Project description

[Shadow][1] is a network simulation framework which intercepts system calls of programs to fully simulate networking between these programs. As process sleep and system time can also be faked, the simulation can be run as fast as possible or as slow as necessary to accomodate the desired number of nodes to be simulated. Shadow also allows definition of complex network structures.

[`ethereum-shadow`][2] was developed in early 2023 by Pop Chunhapanya, and assists with the setup of Shadow simulations involving Geth and Lighthouse. Pop has already run simulations with up to 1000 nodes, showing that large scale simulations are feasible (provided they are run on machines with sufficient memory). However, due to limitations at the time, an outdated version of Lighthouse needed to be used. Furthermore, recent updates to Geth made the current test setup impossible to launch, as the simulation starts with a PoW network, which is no longer supported by Geth.

In this project, I will fix, update, and extend `ethereum-shadow`. Furthermore, I will run network simulations to assist current R&D and analyze improvements to client networking.

## Roadmap

The project will roughly consist of three phases.

### Phase 1: Preparation

First, `ethereum-shadow` must be updated to run with more recent client versions. I will start with Reth and Lighthouse. Furthermore, Shadow itself may need extensions to support all the system calls used by the clients.

Phase 1 will last for roughly three to four weeks. However, it is possible that the phase will take longer if more effort than expected is necessary.

### Phase 2: Experiments

In the main phase of the project, I run several experiments. These experiments are not fully defined yet, but the rough plan is to test several attack scenarios or network conditions with the current client versions and rerun them with modified clients to test potential ways to improve behavior. All data gathered will be published under an open licence and interesting results will be announced and discussed with interested parties. 

Changes to investigate include, but are not limited to:
- [PeerDAS][3]: Figure out if the current specs are resilient enough
- Future DAS approaches: Research on resilient DHTs is ongoing, simulations could help with their evaluations
- [Lighthouse's message queues][6]: Lighthouse has some long-standing issues with memory consumption on nodes with low bandwidth, as messages do not get dequeued if they are in the queue for too long. 
- [Reth is working on optimizations on discv5][7], which need to be benchmarked. 

### Phase 3: Cleanup

If the experiments prove to be useful, I want to extend the simulation framework to be as convenient to use as possible and allows simulations with all major clients, so that the client teams can easily run their own simulations.

This phase will start towards the end of Cohort 5, or even afterwards. Its length will depend on the progress on `ethereum-shadow` during phases 1 and 2, but I expect at least two weeks.

## Possible challenges

It is hard to estimate how much effort will be required to get Shadow to work with client software. It might be necessary to develop extensions to Shadow itself as more system calls might need to be implemented in order to properly run Reth and Lighthouse.

Depending on the experiment, it might be necessary to run the simulation with a large amount of nodes. For economic reasons, such experiments must be carefully thought out and prepared. Running simulations on that scale might also cause performance and stability issues that need to be fixed.

It remains to be seen whether the Shadow-based approach provides significant advantages over the Kurtosis-based testing approach mentioned above. Advantages might include reduced resource requirements (as Kubernetes is not involved) and the possibility to run simulations faster than real-time (or slower for large simulations). Disadvantages might include lower realism with Shadow (which uses its own TCP stack).  

## Goal of the project

- Figure out if Shadow is a good tool to test Ethereum networking
- Prepare a nice framework for sophisticated simulations
- Improve client networking and help with the specs for the upcoming hardfork
- Empower all the client teams and researchers to use Shadow if it proves to be useful

## Collaborators

### Fellows 

- [Daniel Knopik](https://github.com/dknopik)

No collaboration with other fellows is planned at this time, however experiments involving the projects of other interested fellows will be strongly considered. 

### Mentors

- [AgeManning](https://github.com/AgeManning) (Sigma Prime): Discussion of experiments focussing on Lighthouse 
- [Pop Chunhapanya](https://github.com/ppopth) (EF Research): Development of the `ethereum-shadow` simulation framework

## Resources

- [Shadow network simulator][1]
- [`ethereum-shadow` by Pop][2]
- [EIP-7594 (PeerDAS)][3]
- [Kurtosis `ethereum-package`][4]
- [Attacknet][5]

[1]: https://shadow.github.io/
[2]: https://github.com/ppopth/ethereum-shadow
[3]: https://eips.ethereum.org/EIPS/eip-7594
[4]: https://github.com/ethpandaops/ethereum-package
[5]: https://github.com/crytic/attacknet
[6]: https://github.com/sigp/lighthouse/issues/2989
