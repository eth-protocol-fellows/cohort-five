# Prototyping ePBS

TBD. (To be filled after the next office hour covering ePBS.)

## Motivation

### Emergence of MEV

In 2017, a thought experiment[^1] emerged: Imagine discovering a vulnerability in a smart contract with economic security valued at millions of dollars. The bug bounty program is well-designed to make exploitation less attractive, encouraging you to claim the reward. However, you recognize a risk — someone else might front-run your revelation and snatch the bounty before you can.

[^1]: [Enter the Hydra: Towards Principled Bug Bounties and Exploit-Resistant Smart Contracts](https://eprint.iacr.org/2017/1090)

In the same year, a concern[^2] was raised about the risks of building financial systems on a decentralized stack. Users could be exposed to arbitrage, and miners could arbitrarily front-run any transactions. Just a week after this article was published, 10-15 [PGA](https://www.mev.wiki/terms-and-concepts/priority-gas-auctions) MEV bots were introduced.

[^2]: [The Cost of Decentralization in 0x and EtherDelta](https://hackingdistributed.com/2017/08/13/cost-of-decent)

Fast forward to 2024, not much has changed in this regard.

### MEV as a centralizing force

Maximal Extractable Value (MEV) refers to the total amount of Ether block producers can extract from manipulation of transactions within a given timeframe, which may include multiple blocks’ worth of transactions.[^3] In a system where everyone might desire different subsequent states and heterogeneous systems interoperate through some gatekeepers, there are sufficient incentives for block producers to pursue their MEV. As a result, block producers were vertically integrated with trading firms making bespoke deals to boost their returns.

[^3]: [Flash Boys 2.0: Frontrunning, Transaction Reordering, and Consensus Instability in Decentralized Exchanges](https://arxiv.org/abs/1904.05234)

### Isolating the centralizing effects of MEV

To mitigate this crisis, [Proposer-Builder Separation (PBS)](https://ethereum.org/en/roadmap/pbs) was introduced to segregate block proposing from block building. PBS democratizes access to MEV by enabling block proposers to sell their rights to construct a block, thereby creating a market for block builders. [mev-boost](https://github.com/flashbots/mev-boost), an out-of-protocol implementation of PBS built by [Flashbots](https://www.flashbots.net), has been dominantly adopted, accounting for approximately [90% of Ethereum blocks being produced](https://mevboost.pics).

Proposers want their promised transaction bundles to be delivered and get paid safely, while builders want their bundles to avoid front-running. Relays sit between proposers and builders, acting as mutually trusted auctioneers. Due to a lack of sufficient incentives to run relays, we are witnessing another centralizing force. Over the past two weeks, only five relays have produced approximately [90% of total Ethereum block market](https://mevboost.pics).

This centralization of relays hurts censorship resistance. To make matters worse, out-of-protocol actors usually lag behind with network upgrades. Given the status quo, where 9 out of 10 Ethereum blocks go through relays, the risk of bugs is significant.

### Introducing in-protocol PBS

Ethereum community shifted their attention to enshrining PBS into the consensus layer of the Ethereum protocol. By allowing builders to bid for constructing transaction bundle and proposer to choose the winning bid at the protocol level, ePBS aims to eliminate the need for trust between builders and proposers. A builder may inherit the role of the relay, providing a faster RPC port for proposers to use. Nonetheless, ePBS guarantees that proposers can safely sell their block building rights without needing to trust any builder.

## Project description

This project aims to prototype a fully functional ePBS with Prysm consensus layer client. As ePBS is currently undergoing active research and development as part of The Scourge, this prototype aspires to help iron out the details and promote more rigorous discussions.

## Specification

How will you implement your solutions? Give details and more technical information on the project.

TBD. (To be filled after the next office hour covering ePBS.)

## Roadmap

What is your proposed timeline? Outline parts of the project and insight on how much time it will take to execute them.

TBD. (To be filled after the next office hour covering ePBS.)

## Possible challenges

* ePBS has been spec'd out but hasn't been implemented so far. It's likely to encounter a gap between the specification and implementation, or some unknown issues.
* It has an ambitious timeline to have a fully working prototype by Devcon. Defining a good scope and maintaining continuous effort are deemed crucial to meet the requirements.

## Goal of the project

With a fully functioning prototype, each actor should be able to:

* A builder commits to block content and bid payment.
* A proposer commits to the builder's bid.
* A builder delivers a block, satisfying the commitment to the content.
* ... and more. (TBD)

## Collaborators

### Fellows 
* [Jihoon Song](https://github.com/jihoonsong)

### Mentors

TBD

## Resources
* [ePBS Spec](https://github.com/potuz/consensus-specs/pull/2)
* [Prysm](https://github.com/prysmaticlabs/prysm/pull/13917)
* [ePBS specification notes](https://hackmd.io/uWVGcvcKSoqS4P5c5NHG3g)
* [ePBS Forkchoice annotated spec](https://hackmd.io/@potuz/SJdXM43x0)
* [ePBS Annotated Validator Spec](https://hackmd.io/@ttsao/epbs-annotated-validator)
* [ePBS design constraints](https://hackmd.io/ZNPG7xPFRnmMOf0j95Hl3w)
* [Payload boosts in ePBS](https://ethresear.ch/t/payload-boosts-in-epbs/18769/1)
