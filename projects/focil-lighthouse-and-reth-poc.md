# Fork-Choice Enforced Inclusion Lists (FOCIL):  proof of concept for `lighthouse` and `reth`

On June 19th, a new research proposal for Inclusion Lists has been published [FOCIL](https://ethresear.ch/t/fork-choice-enforced-inclusion-lists-focil-a-simple-committee-based-inclusion-list-proposal/19870/8). 

Inclusion Lists, part of the Scourge, phase of the [Ethereum development roadmap](https://ethereum.org/en/roadmap/), is a tool to fight censorship and resistance, as it helps validators to force to include certain transactions in the current or subsequent block. 

However, an EIP for Inclusion Lists [EIP 7547](https://eips.ethereum.org/EIPS/eip-7547), already exists. 

So, why has this new proposal emerged? 

Concerns regarding the interaction between inclusion lists and account abstraction were raised, prompting this new proposal, FOCIL.

It aims to address specific concerns about Account Abstraction but not all. More details [here](https://ethresear.ch/t/fork-choice-enforced-inclusion-lists-focil-a-simple-committee-based-inclusion-list-proposal/19870#account-abstraction-accounting-18).

## Motivation

The goal is to expedite the success of **Inclusion Lists** and ensure their inclusion in an upcoming fork, especially since it was previously excluded from Pectra's fork.

## Project description

This proposal suggests creating a set of validators to form an IL committee at slot n-1. 
At slot n, the proposer will broadcast the IL, which will then be evaluated by the attesters.

Since the beginning of July, with the proposal writers and other protocol developers, we have formed a working group to move from the conceptual phase of the FOCIL proposal to decisive actions.

We have split the work between : 
- specs writing, 
- once specs would be done, EIP would be written,
- implementations for clients in different languages,
- devops network simulations.

I will focus on the implementation for `lighthouse` and `reth` of the FOCIL proposal.

## Specification

### Core functions

The FOCIL proposal focuses on developing three core functions :
- Aggregating ILs into a single canonical list
- Evaluating the quality of the aggregated list
- Validating the block according to criteria

However, other "pre-functions" seem essential to enable the IL building :
- Creating a validator set 
- Creating an inclusion list

Parameters and criteria for establishing the functions `evaluate` and `validate` currently lack precision.

During our first working group's meeting, experiments with `kurtosis` were proposed to refine these parameters. 

### Additional functions 

It is possible that additional functions on the execution layer will need to be added.

## Roadmap

### Phase 1: Getting familiar with `lighthouse` and identify undefined parts of FOCIL algorithms 
*From July 22nd to August 15th*

I got a first task to get familiar with `lighthouse` repository unrelated to this proposal, and more oriented to [optimize lighthouse's code](axum-transition-in-lighthouse.md). 
It will be under development at the same time as I extract the current FOCIL algorithm from the proposal and look at the parts needing more precision.

Goals targeted for August 15th : 
- Have a clear idea of FOCIL algorithm's steps without being concern of the development langage to understand the remaining issues.
- Propose a first pull request for lighthouse. 

### Phase 2 : FOCIL's `lighthouse` implementation
*From August 15th to September 15th*

Once the algorithm is well-defined and clarified, the focus will shift to development. 

In the meantime, I expect the specs to be better defined.

This phase will be dedicated to implementing the previously mentioned functions, objects, and interfaces for lighthouse.

### Phase 3 - `reth` implementation and test with `kurtosis` 
*From September 16nd to end of September*

It may be necessary to conduct tests and implement these features in `reth` concurrently with `lighthouse`'s implementation.

This period will be dedicated to simulating the workflow.

## Phase 4 - Adjusting `FOCIL` code with E2E tests 
*October*

- Refine the code with more detailled specifications, network simulations and in collaboration with the results from other language development implementations, like the one pushed by Amin.

## Phase 5 - Documentation and presentation 
*November* 

- Produce documentation about the developments results.
- Present the work.

## Possible challenges

- Quickly getting acquainted with `lighthouse` and `reth`
- Some parameters in the FOCIL research proposal are still not specific enough for precise development
- Time constraints

## Goal of the project

- Build FOCIL's proof of concept in rust for `lighthouse` and `reth`, that will contribute to estimate if FOCIL is a valuable new proposal.

## Collaborators

### Fellows 

[Amin Talebi](github.com/amintalebi)

### Mentors

- [Barnabé Monnot](https://github.com/barnabemonnot)
- [Thomas Thiery](https://github.com/soispoke)
- [Pawan](https://github.com/pawanjay176) for `ligthouse`'s implementation
- FOCIL working group including Thomas, Barnabé, Terence, Julian, Naman, Manav and Amin.

## Resources

- FOCIL's ethereum research proposal [FOCIL](https://ethresear.ch/t/fork-choice-enforced-inclusion-lists-focil-a-simple-committee-based-inclusion-list-proposal/19870/8)
- [Ligthouse](https://github.com/sigp/lighthouse)
- [Reth](https://github.com/paradigmxyz/reth)
- Previous attempt to implement IL for lighthouse from Daniel's - [https://github.com/dknopik/lighthouse/tree/inclusion-lists]
- [Kurtosis - Ethereum package](https://github.com/ethpandaops/ethereum-package)
- [Project proposal's from EPF day](https://docs.google.com/presentation/d/1h8O55nGz6Y_jdJ2TQrs_cP-tJFT52fERG1Yaun6ud48/edit?usp=sharing)