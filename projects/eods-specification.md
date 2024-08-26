
# eODS (enshrined Operator-Delegator Separation) specification

## Motivation

**What problem is the project solving? Why is it important?**

Today, ETH delegators allocate their principal to node operators off-protocol, via staking pools. 

The pain is that off-protocol ETH delegation is easily captured by exogenous influences, as seen today in liquid staking, leading to the centralization of staking pools, in the detriment of protocol safety. Delegators are given no real voting power, and no meaningful role in the Protocol.

The project addresses inefficiencies associated with the limits of what the Ethereum Protocol can detect and how it defends itself, in the context of delegated proof of stake:

- The Protocol cannot see ETH delegations, so its reach and ability to control Validators is limited in that aspect. The project addresses this issue, helping the Protocol disambiguate the Validator role and "see" the staking scene actors.

  Ethereum Protocol's credibility comes from the control over the Validators that execute the protocol. But it can only control what it can see, so it's important to extend these limits, in order to allow for the Protocol to have the capacity to react with automated defense systems.

- Currently, ETH delegators do not play a [meaningful role](https://epf.wiki/#/wiki/research/eODS?id=the-role-of-delegators) in the protocol, as they don't actively participate in Consensus. We can improve this by allowing the Protocol to identify delegated stake and incentivize the Delegator role selection. Delegators under eODS model do not contribute to the economic security of FFG, i.e. delegators do not partake in Finality, but they are able to surface discrepancies in the gadget’s functioning. Their services can be compensated by re-allocated aggregated issuance.
    
    Delegator role, under Operator-Delegator separation:
    * The curation of operator set: Opinionated delegators may decide to choose between different operators based on e.g., fees or reliability. These criteria could be part of a Validator rating system developed either on CL clients side or in-protocol.
    * The provision of non-FFG services: The delegators may be called upon to provide non-slashable yet critical services, like inputting their view into censorship-resistance gadgets such as inclusion lists or multiplicity gadgets.
 
    Allowing in-protocol delegations and having a meaningful role for delegators is a health indicator of any staking system. The current role principal providers play in delegated proof-of-stake is limited to voting within pools, which ultimately is just [a flawed type of voting](https://notes.ethereum.org/@vbuterin/staking_2023_10#Expanding-delegate-selection-powers).
  
- Liquid staking centralization is a well known issue in the space and exploring solutions to it is one important topic of the protocol's [roadmap](https://epf.wiki/#/wiki/research/roadmap). 

The project proposes a solution to the long-term key question of "what’s the intended Etherean way for the large ETH holders that want return for their participation in protocol”. In a functional enshrined delegation mechanism, ETH holders will have a direct relation with their delegates, the validators (operators) executing the Protocol, possibly mitigating the "grip" liquid staking has over staking.

**What area of the protocol will be affected?**

Implementing the project implies changes to the Execution Layer (EL) and the Beacon Chain (CL) specifications.

## Project description
My proposed solution is an implementation of eODS, implying a **separation** of the **Validator** role, implemented at protocol level:

### Unbundling the Validator role between Operator and Delegator. 

This project proposes a way to enshrine the delegation process, in order to map in-protocol Principal-Agent relationship, in the context of ETH staking.

It aims to solve the above inefficiencies by providing delegators, with an explicit mechanism to deposit / compound and delegate their principal. Capital providers will be able to delegate stake to another (possibly new) targeted validator (node operator), thus allowing them to be opinionated in their operators of choice. This all in-protocol, in particular not involving the deposit contract in a different way than a regular deposit is.

The **Validator role** will be unbundled in two separate protocol entities:

* Delegator - an optional protocol role for ETH holders that want to participate in a way that is lighter than a full staking operation, but still meaningful.
  
* Operator - a protocol role equivalent to today's node operators, running consensus validators and executing the Protocol. Operators are accountable to Delegators in the context of delegated proof-of-stake.

With eODS we will have two types of validators:
* heavy Validators (or Validators - for simplicity and correspondence with the current PoS) participating in protocol Finality
* light Validators participating in non-Finality (light)Protocol services providing. 
    
    The actions set of Validators would be reduced by transferring the Censorship Resistance protocol services e.g. IL, and other non-FFG attributes to the light Validator's actions set.

#### Actively Validated Service (AVS), as Delegator role selection

The second part of the project consists of the conceptual design of a plug-and-play interface for future integration of light protocol services and an MVP specification of the interface, as minimal expected deliverables. 

The distinction between different types of protocol services, under eODS:

  * Consensus (Finality) services - FFG type
  
  * Censorship Resistant services - AVS type
  
    Delegators could use the *liability proof*, received after delegating towards operators participating in FFG, for "backing" operators participating in light protocol services i.e. CR services, committing to the provision of an “actively validated service” (AVS) and possibly receiving rewards for good service provision. 

Possible separation of protocol services(modeled upon ePBS):

![Protocol Services](https://hackmd.io/_uploads/rkzjBG95A.png)

#### Conceptual design of an interface for adding light protocol services:
* General design principle
    * Design constraints
    * Identify light & heavy operators and other stakeholders
    * Identify services
        * Finality gadget 
        * Censorship-resistance gadgets (e.g. Inclusion lists, Multiplicity gadgets)
    * Economics of consensus services
    * Economics of AVS 
    * MVI of the different protocol services
* Specification notes referencing:
    * An adaptation of the slashing mechanism to account for partially slashable light services
    * Liveness
    * Protocol safety

## Part 1 - eODS Specification
**How will you implement your solutions? Give details and more technical information on the project.**

### What are the minimum set of requirements for eODS design?
- New entity in beacon state: Delegators as a new class, similar to validators but with different signature domain and participation flags indices
- Add state Delegator index & balances
- Mapping in-protocol Principal-Agent relationship by explicitating a way for Delegators to transfer ETH to Validators and introducing Validator *"liabilities"* towards Delegators
- Allow for delegator triggered `0x01` withdrawals.

### Specification overview

A sketch of the proposed **execution layer** changes is included below:

#### Staking-deposit-cli

Stakers deposit ETH in the protocol, provided `amount` >= `MIN_DEPOSIT_AMOUNT`. During [deposit](###Deposit), a forked staking-deposit-cli will allow depositors to set a boolean `is_delegator` field to `True` or `False`, alongside the address of a smart contract (delegation contract) that, when called, outputs the target validator's index and pubkey. The structure denoting the deposit operation on EL will also gain the two new fields, accordingly.

#### Deposit contract 
The deposit contract will gain the following arguments: `is_delegator`, and `delegation_contract`. The `DepositData` container will be extended accordingly.

A sketch of the proposed **consensus layer** changes is included below:

The eODS specification is to be built upon existing specifications of Ethereum components, i.e. [Electra consensus-specs.](../../electra/beacon_chain.md) 

- Add  new beacon-chain `class Delegator` 
- New `get_delegator_from_deposit` function
- Modified `apply_deposit` function to accommodate delegations
- Add `is_delegator == False` condition for new deposited validators to enter activation queue
- Add delegations to block processing:
    - Constructing a delegator registry along side validator registry inside `BeaconState`. (`add_delegator_to_registry`)
    - Get `process_deposit_request` to handle delegation deposits & `process_consolidation_request` to handle delegated validators consolidations
- Add mapping between `state.balances[index]` and `state.delegator_balances[index]`
    - Add new `Domaintype` to sign delegation messages 
    - Modify `The beacon block body` to add a list of included delegation messages. 
    - Add `DelegationMessage` containing the pubkey and the withdrawal credentials of the delegate validator.
    - Add `Delegation` consisting of the signed delegation message, the signature and an `epoch` parameter to set the valability of the delegation message.
    - The function `process_operations` is modified to support all of the new functionality
- Enable Delegator triggerable exits (0x01 credentials).

:::warning
During the implementation of the project some of these changes might be partially extended, get altered or be removed.
:::

## Part 2 - Research Delegator role selection & incentivization

Part 1 of the project opens the possibility to enshrine Delegations and allow Principal to be opinionated in the Agent (Validator) selection.

Part 2 of this project will focus on defining actions set, or attributes for delegators. 

### What are the minimum set of requirements for Part 2 of the Project?

- A conceptual design on what consensus role can delegators have, and how can the Protocol incentivise that role selection
  
- The specification of this feature

An eventual EIP resulting from my project will most likely have to be based on an ePBS fork. Intertwining eODS with eg. IL and ePBS ontop of the PoS mechanism is not trivial (maybe not even ideal), so abstracting the "discrepancies surfacing" type of protocol services in the Delegator's actions set, could ease some of the design around e.g. CR gadgets.

*Possible* compatible role selection for Delegators as AVS providers:

- Whistleblower
  
- Sync committee
  
- Validator scoring on light CL clients, operated by Delegators 
  
- Co-signing block proposals, attestations
  
    The staking public key for a Validator for a slot would be set to `validator_pubkey` $+$ `delegator_pubkey`. 
    Slashing would be adapted in this case to account for `delegator_pubkey` (two slashable messages could have different delegator keys, but they would have the same validator key)

- Signing in for censorship-resistance gadgets, e.g. Inclusion Lists $Δ$ evaluation, multiplicity gadgets

:::success
### DELIVERABLES
Specification notes for the eODS feature can be found [here](hackmd.io/gorondan/).

The EL specification of the enshrined operator delegator separation feature can be found here:
- [deposit-contract](consensus-specs/specs/_features/eODS/deposit-contract.md)

The CL specification of the enshrined operator delegator separation feature can be found here:
- [beacon-chain](consensus-specs/specs/_features/eODS/beacon-chain.md)
- [validator](consensus-specs/specs/_features/eODS/validator.md)
- [fork-choice](consensus-specs/specs/_features/eODS/fork-choice.md)
:::
## Roadmap

*What is your proposed timeline?*

The proposed timeline for the project is **6 months**, split in 2 work-packages as follows:

*Outline parts of the project and insight on how much time it will take to execute them.*

### I. Part 1 - eODS Specification notes

1. Prototyping eODS in 8 weeks (**Week 6 - Week 13**) including getting feedback from mentors.

2. Write case studies, and prototype the APIs of eODS defined protocol objects, including getting feedback from mentors in 4 weeks (**Week 14 - Week 17**).

### II. Part 1 - Research Delegator role selection & incentivization

1. I've done some of the work related to this phase in the weeks preceding EPF, especially during EPS, I plan to have the conceptual design for the integration of Delegators-provided protocol services done in in 4 weeks (**Week 17 - Week 21**) including getting feedback from mentors.
2. I plan to write the eODS specs, including getting feedback from mentors and case study tests in an additional 4-8 weeks window (**Week 21+**). I will continue past the EPF program time span for as long as it needs to finish up this feature. 

## Possible challenges

What are the limitations and issues you may need to overcome?

* Electra fork specs are in active development

* Data complexity
    :::warning
    Memory cost of adding extra beacon-chain state elements
    :::
    Consuming computations to consider: 

    * signature verification 

* Integrating eODS with ongoing R&D on e.g. ePBS, ILs will most likely not be a trivial task

* Defining attributes for delegators will have to take into account aspects like existing protocol incentives and maintaining PoS safety assumptions

## Goal of the project

*What does success look like? Describe the end goal of the project, scope, state and impact for the project to be considered finished and successful.*

The end goal of this project is to fully specificate eODS.

Expected impact/followup:
- eODS EIP
    - Part 1 can be functional on its own
    - Part 2 can be added later
- I would consider a success if my project would stand as a starting base for a future POC and client implementation for
    - full node
    - light client

I see the following realistic scenario:
- Finalize Part 1, and the conceptual design of Part 2 and as much as possible of Part 2 specs, during EPF period. 
- Finalize Part 2 specs in the months following the EPF if not done during the EPF project time span.
- Propose eODS EIP according to Part 1 specs
- Propose EIP according to Part 2 specs

## Collaborators

### Fellows 

At this moment, there are no other fellows working with me on this project.

### Mentors

[Barnabé Monnot](https://github.com/barnabemonnot)
[Potuz](https://github.com/potuz)
## Resources

[Week 0 research notes](https://hackmd.io/@kboomro/SJmdOEmXR)

[[1] Unbundling staking](https://ethresear.ch/t/unbundling-staking-towards-rainbow-staking/18683)

[[2] Protocol and staking pool changes that could improve decentralization and reduce consensus overhead](https://notes.ethereum.org/@vbuterin/staking_2023_10)

[[3] Should Ethereum be okay with enshrining more things in the protocol?](https://vitalik.eth.limo/general/2023/09/30/enshrinement.html#what-do-we-learn-from-all-this)

[[4] EIP-7215](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7251.md)

[[5] EIP- 6110](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6110.md)

[[7] Electra fork consensus specs](https://github.com/ethereum/consensus-specs/tree/dev/specs/electra)

[[8] EPF.wiki eODS page](https://epf.wiki/#/wiki/research/eODS)

[[9] Orbit SSF](https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928/1)

Copyright and related rights waived via [CC0](../LICENSE.md).