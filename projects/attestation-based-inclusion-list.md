# Inclusion List with Plausible Deniability


This solution tackles censorship issues caused by block builders in PBS and future ePBS. By employing **Reed-Solomon** erasure codes, it introduces a design that offers **plausible deniability** for Inclusion List Committee members, safeguarding them from accountability and legal constraints.

### Project Repositories

[![reth](https://img.shields.io/badge/irnb/reth-green.svg)](https://github.com/irnb/reth)
[![lighthouse](https://img.shields.io/badge/irnb/lighthouse-blue.svg)](https://github.com/irnb/lighthouse)
[![consensus-specs](https://img.shields.io/badge/irnb/consensus--specs-orange.svg)](https://github.com/irnb/consensus-specs)

## Motivation


At the start of the cohort, I explored various privacy-related ideas, including my own [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503), to implement one of them as my cohort project. However, after several iterations, I realized that having a **censorship-resistant** protocol is a prerequisite for most privacy approaches. Without this, block builders could censor all transactions related to these privacy measures, claiming non-compliance.

This realization led me to pivot towards working on censorship resistance at the protocol level. During my research, I discovered that block builders might also censor transactions for a few blocks to extract more money from these transactions through MEV-related actions. This further convinced me to focus on this topic.


<img src="https://raw.githubusercontent.com/irnb/board/main/img/newplot.png" alt="Censorship Statistics" width="500"/>

<br>

Statistics from [censorship.pics](https://censorship.pics/) indicate the urgent need for an active protocol-level solution to combat censorship resistance (CR) in Ethereum. 

We need to address this before the majority of relayers and builders turn into censoring builders for various reasons, or at least create an approach that can enforce the inclusion of some censored transactions to maintain network censorship resistance.

While projects and ideas that increase number of independent staker can help CR passively, a better option actively targeting the censorship issue is the **inclusion list**. 

There is a really big design space for implementing inclusion lists, but among these designs, these two ideas caught my attention:
* anon-ILs 
* One-bit-per-attester inclusion lists 

These designs consider the potential restrictions for different validators and the fear of being part of the IL, which could make difficult the adoption of inclusion lists. These ideas work to add a layer of **anonymity** or **plausible deniability** for validators participating in the flow of constructing inclusion list.

After a deeper dive into both approaches, I chose to implement the **one-bit-per attester** method instead of anon-ILs because the anon-ILs require a somewhat central element. 

However, the one-bit-per attester approach also presented challenges since it was **just an idea**, not a fully specified and ready-to-implement solution. I saw this as an **opportunity to train myself** in design and creating full specifications, writing tests in the consensus-spec repo, and experiencing the full process of creating cross-layer specifications for an idea in the Ethereum ecosystem.

the inclusion list is a cross-layer change, affecting the execution layer, consensus layer, and also the Engine API.


## Project description

### Overview

The inclusion list is a three-step protocol designed to enhance censorship resistance in Ethereum by leveraging a decentralized and semi-deniable mechanism. The steps involved are:

1. List Construction
2. Transaction Inclusion
3. Validation of Inclusion in the Block

### 1. List Construction

Using RANDAO, a committee is formed. Each committee member sends a request to their execution client to receive valid transactions that could have been included in previous blocks but were not, and that also have a valid gas price for slot n+2, even if the base gas increases according to EIP-1559 logic.

Based on the one-bit-per-attester method, committee members filter transactions using a hash and then calculate their attestation bit (0 or 1) using Reed-Solomon erasure codes. They then create and sign an IL Attestation Object and propagate it to the consensus P2P network via the gossip protocol.

The proposer for slot n+1 is responsible for aggregating the attestations from multiple IL committee members, constructing the list, signing it, and propagating the object in the P2P network as a sidecar, committing to it in slot n+1.

Slot attestation committees check whether the proposer for slot n+1 has created the correct list. If the list is correct, they attest to its validity.

### 2. Transaction Inclusion

The proposer for block n+2 must include the transactions from the IL list in the execution payload. There are several considerations:

a. **Transaction Invalidity Due to Account Abstraction (EIP-7702):** If a transaction becomes invalid due to native account abstraction ideas, this event should be detected by the execution client. If this happens, the attester for slot n+2 still considers the block valid. However, if the transaction is not invalidated and the proposer fails to include it, the fork choice rules do not consider the block valid.

b. **Transaction Inclusion in Slot n+1:** If the transaction is included in slot n+1, the attester still considers the block for slot n+2 valid.

c. **Execution Timing:** Transactions in the list should be executed at the end of slot n+2 to mitigate any MEV opportunities.

### 3. Validation of Inclusion in the Block

Attesters for slot n+2 check whether the transactions in the inclusion list were included in the execution payload for slot n+2 via the fork choice rule. This ensures that the transactions are correctly processed and included in the blockchain.

### Additional Considerations

- **Incentives:** Introducing a new reward mechanism for IL committee members who publish transactions with attestation and have them included in the chain in slot n+1 or slot n+2 could enhance participation and reliability. This task is complex and will be pursued if time permits. ( and also you may ask why we give rewards even if the tx get included in the slot n+1, the answer is that even if the tx get included in the slot n+1, that's means the committee members did their job correctly, and also it's possible the IL committee for slot n and slot n+1 put the same tx, in this case we give rewards to both of them, i thinking to it like the uncle block rewards)



## Specification

i working on specs in the `consensus-specs` repo, and i plan to add the `fork choice rule` and new method in the `Engine API` to support the inclusion list.

i'll share the PR links here in coming weeks.

## Roadmap


#### July 22 - Mid August 2024
- **Complete Specifications and GFI Tasks:**
  - Finalize the full specification in the `consensus-spec` repo.
  - Address related Good First Issues (`GFI`) in `Lighthouse` and `Reth` to build confidence before starting the implementation.

#### Mid August - End of August
- **Implement Reed-Solomon Encoding and Decoding:**
  - Implement the Reed-Solomon one-bit encoding and decoding in the Consensus Layer (`CL`).
  - Develop the committee formation process using `RANDAO`.

#### September 2024
- **Mid September:**
  - Implement the fork choice rule changes in the Execution Layer (`EL`) and `Engine API`. This is a crucial part of the project.
  - Implement the `GetInclusionList` function in the execution client (`Reth`).

- **End of September:**
  - Modify the `getExecutePayload` API to incorporate the inclusion list changes.
  - Begin the testing and debugging phase to identify and resolve issues.

#### October 2024
- **Testing, Debugging, and Optimization:**
  - Testing and debugging to ensure everything works smoothly.
  - Optimize the code for better efficiency and performance.
  - Final documentation and report.
  - Make the final presentation and publish the results.


## Possible challenges

the one-bit-per attester committee size should be large number and it's create the number of attestation object to be large too, and this may cause some issues in the gossip protocol, and also the fork choice rule changes is a big change and it's need to be carefully implemented.

## Goal of the Project

In mid-January 2024, I had a conversation with one of the authors of EIP-7547. During this discussion, I realized that the inclusion list was dropped from the next hardfork due to conflicts with the ePBS. This situation opened the door for me to work on experimental ideas like the one-bit-per-attester inclusion list. I hope that when the next hardfork is planned, my implementation will assist different teams and serve as an example.

Regarding what success looks like for this project, I can say: Implementing a fully functional inclusion list with plausible deniability using `Lighthouse` as the consensus client and `Reth` as the execution client, and being able to run a small devnet.

## Collaborators

### Fellows 

- Hamid Bateni (https://github.com/irnb)

> please reach out to me if you are interested in working on this project.

### Mentors

I'm gonna need mentor from lighthouse team during the implementation phase. 

and since my project have some similarity with the FOCIL i'll join to their working group to get some feedback and help.

## Resources

- https://eips.ethereum.org/EIPS/eip-7547
- https://ethresear.ch/t/anonymous-inclusion-lists-anon-ils/19627
- https://ethresear.ch/t/one-bit-per-attester-inclusion-lists/19797
- https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction
- https://en.wikipedia.org/wiki/Binary_Reed%E2%80%93Solomon_encoding
- https://notes.ethereum.org/@fradamt/forward-inclusion-lists
- https://notes.ethereum.org/@fradamt/H1TsYRfJc
- https://ethresear.ch/t/no-free-lunch-a-new-inclusion-list-design/16389
- https://ethresear.ch/t/cumulative-non-expiring-inclusion-lists/16520

> PRs and additional resources will be added as the project progresses.
