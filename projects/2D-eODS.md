
# Project Proposal

Two dimensional, enshrined Operator-Delegator Separation (eODS)

:::info
The correct acronym for the implementation would be **2D-eODS** (Two dimensional, enshrined Operator-Delegator Separation), but for simplicity and elegance, I went for a more generic name of **eODS.** 
:::

## Motivation

**What problem is the project solving? Why is it important?**

The project addresses inefficiencies associated with the limits of what the Ethereum protocol can see and how it defends itself, in the context of delegated proof of stake. It also proposes a shift in validator economics *design philosophy* for the scope of leaping towards SSF implementation, with overall improved protocol resilience:

- The protocol doesn't see ETH delegations, so its reach and ability to control Validators is limited in that aspect. The project addresses this issue, helping the protocol disambiguate the Validator role and "see" the staking scene actors.

  Ethereum Protocol's credibility comes from the power it has over the Validators that execute the protocol. But it can only control what it can see, so it's important to extend these limits, in order to allow for the protocol to have the capacity to react with automated defense systems.

- Currently, ETH Delegators do not play a [meaningful role](https://epf.wiki/#/wiki/research/eODS?id=the-role-of-delegators) in the protocol, as they don't actively participate in Consensus. We can improve this by allowing the Protocol to identify delegated stake and incentivize that role selection. Delegators under eODS model do not contribute to the economic security of FFG, i.e. Delegators do not partake in Finality (non-slashable stake), but they are able to surface discrepancies in the gadget’s functioning. Their services can be compensated by re-allocated aggregated issuance.
    
    Delegator role, under Operator-Delegator separation:
    * The curation of operator set: Opinionated delegators may decide to choose between different operators based on e.g., fees or reliability.
    * The provision of light services: The delegators may be called upon to provide non-slashable, yet critical services, like:
        * input their view into censorship-resistance gadgets such as inclusion lists or multiplicity gadgets.
        * co-sign block proposals, attestations together with the bonded Gasper operators.
 
    This is important, so we can move away from the unincentivized delegate selection practiced today in delegated proof of stake, which is basically [a flawed type of voting](https://notes.ethereum.org/@vbuterin/staking_2023_10#Expanding-delegate-selection-powers).
  
- Building towards the inevitable implementation of SSF, requires taking the best possible trade-offs.
Identifying, disambiguating, or solving these trade-offs is not trivial, as they depend on a wide range of challenges and limitations:
    - physical network limitations (e.g. computing power) 
    - technical limitations (e.g. per slot BLS signatures aggregation)
    - not-just-technical fundamentals (e.g. community goals and values vs. out-of-protocol market forces)

  This is important in our journey to build Ethereum as the envisioned global-scale network, because in that scenario, single-slot finality is not only desirable but most likely mandatory, and I feel that if we're building towards the right goals, we better be building towards SSF. Regardless what the goals set by the Ethereum community turn out to be, enshrining ODS would help the community impose those goals, by exercising better control over the validators that execute the protocol, while addressing the challenges mentioned above.
 
- A daunting aspect about building towards SSF is the need to drastically reduce the validator set size (measured in *individual message signers*, not in *stake weight*), while encouraging an ever increasing validators count, for the scope of overall increased resilience. 
These seemingly conflictual goals can be resolved by the realization that we need to move away from the concept that every participant signs in every slot.
In the SSF context, we can assume a limit of 1.8 million$ BLS signatures that could be processed every slot. 
The second dimension of eODS (vertical separation) proposes the reduction of the Validators-as-Finality-participants count (Heavy services providers), to ~10,000, reducing the number of BLS signatures that need to be processed every slot, even assuming the two-round consensus protocol SSF would inevitably use, thus significantly reducing consensus node overhead. The Light layer participants would be encouraged to participate in as many numbers as possible, and rotated in random selections.
The number of heavy tier participants is constrained by the efficiency of cryptographic constructions (aggregating signatures), but as cryptographic methods or simply hardware progress, the number of "seats" may increase. 

    This is important for hardening protocol resilience(a broader range of proposers, a wider array of attesters, whistle-blowers and censorship-resistance agents), even in the perspective of exogenous (or even self imposed, endogenous) limitations.

- Liquid staking centralization is a well known issue in the space and exploring solutions to it is one important topic of the protocol's [roadmap](https://epf.wiki/#/wiki/research/roadmap). The project proposes a mix between Approach 1 and 2 presented in the [Sticking to 8192 signatures per slot post SSF](https://ethresear.ch/t/sticking-to-8192-signatures-per-slot-post-ssf-how-and-why/17989) research post:
  * A Heavy layer, liquefied as it is today, all in on decentralized staking pools with help from enshrined protocol gadgets (e.g., LSM-type enshrined gadgets);
  * A solo-staker-friendly Light layer as the second-tier, with its own Light LSTs. And since ETH staked as provision of Light services is non-slashable, the LLSTs (LightLSTs) would be mostly risk-free and could be used as pristine collateral type in app layer protocols, e.g. a version of the governance-minimized, ungoverned RAI stablecoin that accepts staked ETH.


**What area of the protocol will be affected?**

Implementing the project implies changes to the Beacon Chain specifications(CL).


## Project description
My proposed solution is an implementation of eODS, implying a two dimensional **separation** of the **Validator** role, implemented at protocol level:

### Horizontal separation: 
Unbundling the Validator role between Operator and Delegator. 

In practice, the separation, as first dimension of eODS, can be done by allowing node Operators to conduct self-accountability, i.e. protocol allows staking pools to maintain a delegation contract in a pre-defined, protocol legible format, that can be parsed in protocol, the same way deposit contract events data is being parsed today, in order to build a virtual Balance of delegated ETH in the Beacon state. The operators would be requested to declare the Principal delegated to them, to the protocol before geting activated for performing validator duties, so that the protocol is able to construct and disambiguate between `operator stake message` and `delegator stake message`.

### Vertical separation: 
A further separation of each Validator roles resulted from the horizontal dimension of the separation (Operators & Delegators), between Heavy protocol services providers and Light protocol services providers, based on the [Two-tier staking approach to SSF](https://epf.wiki/#/wiki/research/eODS?id=the-two-tier-staking-approach-to-ssf). The difference between Heavy and Light, services comes from the capital requirements set upon the protocol services providers. 

In practice the separation between heavy services providers and light services providers can be done in-protocol, after increasing the MAX_EFFECTIVE_BALANCE ([EIP-7251](https://eips.ethereum.org/EIPS/eip-7251)), by implementing a balance threshold (e.g. 2048 ETH) to determine which existing validators enter which complexity tier and use the threshold for attributing the appropriate tier to Validators (Operators).

The following protocol staking architecture emerges out of the 2D-eODS:
| eODS           |                 |               |
| -------------- | --------------- | ------------- |
| Light OPERATOR | Light DELEGATOR | non-slashable |
| Heavy OPERATOR | Heavy DELEGATOR | slashable     |

 **Partially slashable light services**

Some light services may require slashable stake. A variant of the penalties capping approach could be enforced, with only the operator stake being slashable. 

| eODS                   | +   penalties capping         |
| ------------------------- | ----------------------------- |
| Light OPERATOR  slashable | Light DELEGATOR non-slashable |  |
| Heavy OPERATOR slashable  | Heavy DELEGATOR  slashable    |

### Future protocol services

The third part of the project consists of the conceptual design of a plug-and-play interface for future integration of protocol services and an MVP specification of the interface.

The vertical separation unlocks the introduction of two distinct types of future protocol services, each tier inducing within itself a market structure of delegators and operators:
  * Heavy Services
  * Light Services

Future Light & Heavy, Validator provided, protocol services: 
![Future Validator services](https://hackmd.io/_uploads/SylCaqvX0.png)

#### Conceptual design of the plug-n-play interface for adding protocol (heavy / light) services:
* General design principle
    * Design constrains
    * Identify light & heavy operators and other stakeholders
    * Identify services
        * heavy: Finality gadget 
        * light: Censorship-resistance gadgets (e.g. Inclusion lists, Multiplicity gadgets)
    * Economics of Heavy layer
    * Economics of Light layer 
    * MVI for heavy layer(deduct from issuance curve to derive MVI  for light layer)
* Specification notes referencing:
    * An adaptation of the slashing mechanism to account for partially slashable light services
    * Liveness
    * Protocol safety

## Specification
**How will you implement your solutions? Give details and more technical information on the project.**

## eODS feature specification notes

Specification Overview

The eODS specification is divided in 3 separate subfeatures to be built upon existing specifications of Ethereum components, i.e. [Electra consensus-specs.](../../electra/beacon_chain.md) 

:::warning
A sketch of the proposed specification changes to the consensus layer is included below. 
Durring the implementation of the project these changes might extended, get altered or be removed.
:::

### eODS subfeature 1

Specifies the vertical dimension of the separation, by adding the following changes:

* Enable operator self-accountability  
    
    Delegated Validators (e.g. staking pools) are allowed to submit an execution address of a contract that maintains all delegations made up to that point. 
    Delegation contracts, maintained by staking pools, will have a pre-defined, protocol legible format(contain the Merkle root of all delegations). Delegation contract events can then be parsed in protocol, the same way deposit contract events data is being parsed today.
    
  * Enable `delegator_pubkey` (BLS)
  
    Delegators pubkeys will be parsed in-protocol part of the `delegation_receipts` of the querried delegation contract. Operator signs over the `DOMAIN_DEPOSIT` with it's private key.
    
  * The `process_deposit_receipt` function that handles `deposit_recipts` in the block processing routine will have to be adapted to accomodate delegations into the deposit operations.
    
  * Build the Delegators index and virtual balance in the Beacon state
    - Add new `class Delegator`
    
    ```python
    class Delegator(Container):
    pubkey: BLSPubkey
    withdrawal_credentials: Bytes32  # Commitment to pubkey for withdrawals
    effective_balance: Gwei  # Delegator Balance
    ```
    - Add delegations to BeaconState registry. e.g.:
    ```python
    class BeaconState(Container):
    # Registry
    validators: List[Validator, VALIDATOR_REGISTRY_LIMIT]
    balances: List[Gwei, VALIDATOR_REGISTRY_LIMIT]
    delegators: List[Validator, DELEGATOR_REGISTRY_LIMIT] # new in eODS
    delegators_balances: List[Gwei, DELEGATOR_REGISTRY_LIMIT]# new in eODS
    ```
   
    The validators balances is conssidered as `operator stake`
    
    The ammount of the principal each Delegator provided (delegators balances) is conssidered as `delegator stake`, that is added under the Operator's domain.
     
     - The state initiation routine will have to be adapted to accomodate delegations.
     
* Enable Delegator triggerable exits (0x01 credentials).

    Allow `0x01` Delegator initiated withdrawals. 
    Delegator pubkey will be provided in-protocol by the querried delegation contract provided by Operator, and Operator signs over the `DOMAIN_DEPOSIT` with it's private key.

### eODS subfeature 2

Specifies the horizontal dimension of the separation, by splitting staking into heavy layer and light layer:
* Enable the balance threshold
    * Add beacon chain new Constant, e.g. `TIER_BALANCE_THRESHOLD`

* Enable Validator tier allocation
    * Add beacon chain helper function (new Predicate) to allocate Validator tier based on the Validator's balance, e.g:
    
        ```python
        is_heavy_operator <- bool
        ```
        
* Validators (Operators) with `is_heavy_operator == true` predicate participate in Finality gadget(Gasper or a SSF variant of it) 
     
* Enable instant withdrawals of non-slashable stake (delegators, light operators)

### eODS subfeature 3

* Enable Delegator domain hash (`DOMAIN_DELEGATOR`)

* Randomly selected light Operators perform light services validator duties:
    *  co-signing block proposals, attestations
    The staking public key for a Validator for a slot would be set to `validator_pubkey` $+$ `delegator_pubkey`.
    *  signing in for censorship-resistance gadgets, e.g.inclusion lists, multiplicity gadgets

* Adapt slashing to account for `delegator_pubkey` (two slashable messages could have different delegator keys, but they would have the same validator key)

:::success
### DELIVERABLES
Specification notes for the eODS feature can be found [here](hackmd.io/gorondan/).

The beacon-chain specification of the enshrined operator delegator separation feature can be found here:
- [beacon-chain](consensus-specs/specs/_features/eODS/beacon-chain.md)
- [validator](consensus-specs/specs/_features/eODS/validator.md)
- [fork-choice](consensus-specs/specs/_features/eODS/fork-choice.md)
:::
## Roadmap

*What is your proposed timeline?*

The proposed timeline for the project is **9 months**, split in 3 work-packages as follows:

*Outline parts of the project and insight on how much time it will take to execute them.*

### I. Horizontal sepration - subfeature 1

1. I've done some of the work related to this phase in the weeks preceding EPF, I plan to go deep in research of eth2 for 3 weeks (**Week 2 - Week 4**) and give my python skills a new shine for 1 week (**Week 5**)
2. I plan to write the fully-fleshed specs of subfeature 1 in 8 weeks (**Week 6 - Week 13**) including getting fedback from mentors and case study tests.

### II. Vertical separation - subfeature 2

1. I plan to write the fully-fleshed specs of subfeature 2, add protocol services feature, including getting fedback from mentors and case study tests in 12 weeks (after EPF, after delivering work package III).

### III. Design of a plug-and-play interface for future integration of protocol services + subfeature 3

1. I've done some of the work related to this phase in the weeks preceding EPF, especially durring EPS, I plan to have the conceptual design of the plug-and-play interface for future integration of protocol services done in in 4 weeks (**Week 14 - Week 17**) including getting fedback from mentors.
2. I plan to write the as much of the specs of subfeature 3 in 4 weeks (**Week 18 - Week 21**) including getting fedback from mentors and case study tests, and continue past the EPF program time spam for as long as it needs to finish up this subfeature. I estimate I will fit in an extra 4-8 weeks (**Week 21+**).

## Possible challenges

What are the limitations and issues you may need to overcome?

* Electra fork specs in active development

* Data complexity
    :::warning
    Memory cost of adding extra beacon chain state elements
    :::
    Consuming computations to consider: 
    * signature verification 

## Goal of the project

What does success look like? Describe the end goal of the project, scope, state and impact for the project to be considered finished and successful.

The end goal of this project is to fully specificate eODS.

Expected impact/followup:
- eODS EIP
    - subfeature 1 + 3 could be functional on their own
    - subfeature 2 can be added later
- POC and client implementation for
    - full node
    - light client

Being a pretty ambitious project, I see the following realistic scenario:
- finalize subfeature 1, the conceptual design of the plug-and-play interface for future integration of protocol services and as much as possible of subfeature 3 durring EPF period. 
- finalize subfeature 3 in the months following the EPF if not done durring the EPF project time span.
- propose EIP with subfeature 1 + 3
- finalize subfeature 2 and add protocol services feature after EPF program and
- propose EIP subfeature 2 + protocol services

## Collaborators

### Fellows 

At this moment, there are no other fellows working with me on this project.

### Mentors

[Barnabé Monnot](https://github.com/barnabemonnot)

## Resources

[Week 0 research notes](https://hackmd.io/@kboomro/SJmdOEmXR)

[[1] Unbundling staking](https://ethresear.ch/t/unbundling-staking-towards-rainbow-staking/18683)

[[2] Protocol and staking pool changes that could improve decentralization and reduce consensus overhead](https://notes.ethereum.org/@vbuterin/staking_2023_10)

[[3] Should Ethereum be okay with enshrining more things in the protocol?](https://vitalik.eth.limo/general/2023/09/30/enshrinement.html#what-do-we-learn-from-all-this)

[[4] EIP-7215](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7251.md)

[[5] EIP- 6110](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6110.md)

[[7] Electra fork consensus specs](https://github.com/ethereum/consensus-specs/tree/dev/specs/electra)

[[8] EPF.wiki eODS page](https://epf.wiki/#/wiki/research/eODS)

Copyright and related rights waived via [CC0](../LICENSE.md).