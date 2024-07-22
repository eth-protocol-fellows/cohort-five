# Fork-Choice Enforced Inclusion Lists (FOCIL) Proof of Concept in Geth and Prysm

Enhancing Decentralization and Censorship Resistance in Block Production.

The aim of this project is to develop a Proof of Concept (PoC) to assess the feasibility of the research. Creating an Ethereum Improvement Proposal (EIP) and deploying it to the Ethereum mainnet or testnet are beyond the scope of this project.


## Motivation

**Centralization Issue:**
- Block building rights are auctioned to specialized entities known as builders.
- Over the past year, a few sophisticated builders have dominated block production due to economies of scale.

**Censorship Resistance:**
- Concentrated block production weakens the network’s censorship resistance properties.
- 60% of builders filter transactions from sanctioned addresses, while 90% of validators do not engage in censorship.

## Project Description

A randomly selected set of validators forms an inclusion list ($IL$) committee to create and broadcast local inclusion lists. The block producer aggregates these lists into a canonical aggregate ($IL_{agg}$), which is included in the block and validated by attesters to ensure block validity. More information can be found [here]([FOCIL](https://ethresear.ch/t/fork-choice-enforced-inclusion-lists-focil-a-simple-committee-based-inclusion-list-proposal/19870)).

## Specification

**Consensus Layer:**

- **New `InclusionList` object:**
  - `arr InclusionList`: An array of $IL$ from every member of the $IL$ committee.
  - `AggregateInclusionLists` function: Aggregates local $IL$ and creates $ IL_{agg} $.
  
- **EvaluateInclusionList function:**

Eval(IL_agg^attester, IL_agg^proposer, Δ) =
  True  if |IL_agg^attester ∩ IL_agg^proposer| / |IL_agg^attester| ≥ Δ
  False otherwise


**Execution Layer:**

- **New `GetInclusionList` function:** Generates a local $IL$ based on the current view of the local mempool.

## Roadmap

1. **July 2024:**
   - Add the FOCIL interface to Prysm.
   
2. **August 2024 - September 2024:**
   - Implement `GetInclusionList` in Go Ethereum.
   - Develop `InclusionList` object.
   - Develop inclusion list committee selection.
   - Develop attesters committee selection.
   - Develop `CreateInclusionList` function.
   - Develop `AggregateInclusionLists` function.
   - Develop `EvaluateInclusionList` function.
   - Test the implementation in a devnet environment.

3. **October 2024:**
   - Perform bug fixes and improvements based on testing and feedback.
   - Prepare final documentation and report.
   - Presentation and publication of results.

## Possible Challenges

- Ensuring accurate aggregation and evaluation of inclusion lists.
- Maintaining network efficiency and performance while incorporating inclusion lists.

## Goal of the Project

Successfully implement Fork-Choice Enforced Inclusion Lists to enhance decentralization and censorship resistance in block production. The end goal is to have the FOCIL mechanism integrated into Prysm and see its positive impact on the network's resilience.

## Collaborators

### Fellows 

- [Léa Narzis](https://github.com/lean-apple)

### Mentors

- FOCIL working group.

## Resources

- [FOCIL](https://ethresear.ch/t/fork-choice-enforced-inclusion-lists-focil-a-simple-committee-based-inclusion-list-proposal/19870)
- [Geth](https://github.com/ethereum/go-ethereum)
- [Prysm](https://github.com/prysmaticlabs/prysm)
- TODO: Documented PRs and additional resources will be provided as the project progresses.

