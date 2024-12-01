# EIP-7732: Enshrined Proposer-Builder Separation

Implementation of a working Proof-of-Concept for [EIP-7732 or ePBS](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7732.md).

## Motivation

Currently in the Ethereum, the Proposer-Builder Separation or PBS is handled by third-party software like mev-boost and an out-of-protocol relay network. The [Proposer-Builder Separation (PBS)](https://ethereum.org/en/roadmap/pbs) was introduced to segregate block proposing from block building. PBS democratizes access to MEV by enabling block proposers to sell their rights to construct a block, thereby creating a market for block builders. [mev-boost](https://github.com/flashbots/mev-boost), an out-of-protocol implementation of PBS built by [Flashbots](https://www.flashbots.net), has been dominantly adopted, accounting for approximately [90% of Ethereum blocks being produced](https://mevboost.pics).

Ideally, Proposers want their promised transaction bundles to be delivered and get paid safely, while builders want their bundles to avoid front-running. Relays sit between proposers and builders, acting as mutually trusted auctioneers. Due to a lack of sufficient incentives to run relays, we are witnessing another centralizing force. Over the past two weeks, only five relays has produced around [~94% of total blocks](https://mevboost.pics) that were proposed.

### Why enshrine PBS

Referring to this [doc](https://hackmd.io/ZNPG7xPFRnmMOf0j95Hl3w?view#3-Enshrining-PBS) by potuz, The primary problem in the current implementation of PBS in Ethereum is as followed:

1. A proposer that wants to sell his right to build a payload **must** trust an intermediary.
2. A builder that wants to buy the rights to build a payload **must** trust an intermediary.

This issue is critical because relying on intermediaries introduces several risks. Trusting intermediaries can lead to censorship, monopolization, and single points of failure. By eliminating the need for these trusted intermediaries, we can enhance censorship resistance, ensuring that no single entity can control or influence which transactions are included in blocks. Also, it promotes decentralization, which is a core principle of blockchains. Note that EIP-7732 purely focuses on changes in Consensus Layer and incorporates the block-auction design for ePBS.

## Original Project Proposal

The implementation of ePBS is fundamentally about solving trust issues, and **not about transaction ordering or MEV (Maximum Extractable Value)**. MEV considerations, such as MEV stealing and forkchoice attacks are not the core issue here.

Currently, most beacon block proposers in Ethereum rely on third-party builders to construct the execution payload for their blocks. They request a `hash tree root (HTR)` from the builder and submit a `SignedBlindedBeaconBlock` to a trusted party, which then replaces the HTR with the full execution payload before broadcasting. This process requires trust in intermediaries.

EIP-7732 introduces a trust-free method for this exchange, ensuring that an honest proposer gets paid and the honest builder’s payload becomes the canonical head of the chain, regardless of the other’s actions.

Validators have a short window (4 seconds on Ethereum mainnet) to validate both consensus and execution state transitions, check blob data availability, and evaluate the new head of the blockchain. By separating the validation tasks, validators only need to perform the consensus state transition immediately, deferring execution and data availability validation to later.

This change allows for faster network propagation by removing the execution payload from the consensus block. It reduces the risk of reorganizations caused by blob transactions and prevents validators from missing attestations. Additionally, it eliminates the need for trusted middleware in block construction delegation.

<figure>

![ePBS slot](https://hackmd.io/_uploads/rJdlt-sd0.png)

<figcaption>

_ePBS slot from potuz's presentation_

</figcaption>
</figure>

## Specification

The implementation would follow the spec mentioned in [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732).

The spec introduces a new staked Participant called _Builders_ and new honest validators duties called _payload timeliness attestations_.

The slot in the Ethereum protocol is divided into four intervals:

- Honest validators would gather _signed bids_ (`SignedExecutionPayloadHeader`) from builders and submit their consensus blocks (`SignedBeaconBlock`) with these bids.
- For the second part, Honest validators submit attestations, similar to the current process.
- For the 3rd Interval, Aggregators aggregate these attestations, and the builder broadcasts either the full payload or a message indicating they are withholding it (`SignedExecutionPayloadEnvelope`).
- For the 4th Interval, some validators selected for the new `Payload Timeliness Committee (PTC)` attest to the presence and timeliness of the builder’s payload.

At any given slot, the blockchain’s head status can be:

- A block from a previous slot if the current slot’s proposer did not submit a block.
- An empty block for the current slot if the proposer submitted a block but the builder did not reveal the payload on time.
- A full block for the current slot if both the proposer and the builder revealed on time.

There are various packages, that would require significant changes including but not limited to sync, core, beacon-apis for builder, forkchoice, engine api and blockchain etc. Additionally, there are numerous helper functions and once a working PoC is implemented we would be moving onto Networking packages for the actual p2p auction and bids' gossiping.

Towards the end of the cohort a new simplified fork-choice design was proposed by francesco. More details on the design can be found in a article [here](https://hackmd.io/@kira50/HyFDBzozkl).

## Roadmap

July: We would be spending first couple of weeks to directly implement helper functions, that would help us get started and work with the Prysm codebase. This will also help us avoid studying large packages' codebase just to get started and understand the flow.

August (4 weeks): Follow and Implement packages mentioned in the spec. We would be focusing on beacon-chain packages to test that proposer-builder separation works for a single validator. This period is aimed to build the MVP or a working PoC to see how would timeliness work according to the block-auction design for ePBS.

September (4 weeks): 2 weeks buffer for the PoC implementation and 2 weeks for testing the functionality of the PoC.

October (4 weeks): Once we have a working PoC we could focus on implementing the Networking part of the ePBS, this would include writing new topics for PTC and builder, Implement builder package if required, testing the whatever part we've implemented.

November (2 weeks): final cleanups and presentation preparations for devcon

Note: the timeline is tentative and might change based on the work done. Additionally we have weekly meetings between fellows for progress tracking, with mentors as well whenever required. The approach for this project will be more on figuring things out, implementing, communicating asynchronously and participating in code-reviews.

## Possible challenges

- Efficient distribution of tasks and coordination with other fellows is what I think would be a challenging. Active communication would be required such to avoid double working on a single issue.

## Goal of the Project

The goal for this project is to achieve a fully functional and working PoC for ePBS before devcon, this would include for a single validator:

- A proposer can request bids for payload from the builder.
- A builder can perform various duties like providing `signedExecutionPayloadHeader`, or a message indicating withhelding payload etc.
- For me personally, experience the development process and learn a ton under the mentorship of core devs and observe the lifecycle for an EIP implementation.

## Collaborators

#### Fellows

- [Caleb](https://github.com/Tomi-3-0)
- [Kira](https://github.com/shyam-patel-kira)
- [Amaan](https://github.com/Redidacove)
- [Jihoon](https://github.com/jihoonsong)

#### Mentors

- [Potuz](https://github.com/potuz)
- [Terence](https://github.com/terencechain)

## Resources

- [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)
- [ePBS Spec](https://github.com/ethereum/consensus-specs/pull/3828)
- [ePBS design constraints](<[/ZNPG7xPFRnmMOf0j95Hl3w](https://ethresear.ch/t/epbs-design-constraints/18728)>)
- [WIP ePBS PR in the Prysm repo](https://github.com/prysmaticlabs/prysm/pull/13917)
- [ePBS specification notes](https://hackmd.io/uWVGcvcKSoqS4P5c5NHG3g)
- [ePBS Forkchoice annotated spec](https://hackmd.io/@potuz/SJdXM43x0)
- [ePBS Annotated Validator Spec](https://hackmd.io/@ttsao/epbs-annotated-validator)
- [Payload boosts in ePBS](https://ethresear.ch/t/payload-boosts-in-epbs/18769/1)
- [All-in-one fork-choice rule](https://hackmd.io/@kira50/HyFDBzozkl)
