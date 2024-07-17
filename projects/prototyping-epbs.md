# Prototyping ePBS
Although ePBS has a full specification and recently obtained its EIP number, there are still arguments for and against it. A fully functioning ePBS prototype will foster more constructive discussions and can serve as a foundational layer for future work to evolve and operate on a testnet.

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
The prototype should follow [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732) and [ePBS Spec](https://github.com/ethereum/consensus-specs/pull/3828).

## Roadmap
As there is already a full specification and extensive discussions have taken place, I prefer to learn by coding rather than by reading. The roadmap below is subject to change and is expected to gain higher resolution over time.

* July: set up a development environment and start implementing beacon chain changes.
* August: implement beacon chain changes.
* September: implement p2p changes.
* October: implement fork choice changes.
* November: clean up and present demo at Devcon 2024 (November 9-17).

## Possible challenges
* ePBS has been spec'd out but hasn't been implemented so far. It's likely to encounter a gap between the specification and implementation, or some unknown issues.
* It has an ambitious timeline to have a fully working prototype by Devcon 2024. Defining a good scope and maintaining continuous effort are deemed crucial to meet the requirements.

## Goal of the project
With a fully functioning prototype, each actor should be able to:

* A proposer can sell their right to build a payload, with or without a trusted intermediary.
* A builder can buy the rights to build a payload and place a bid, with or without a trusted intermediary.

## Collaborators
### Fellows 
* [Jihoon Song](https://github.com/jihoonsong)

### Mentors
* [Potuz](https://github.com/potuz/)
* [Terrence](https://github.com/terencechain/)

## Resources
* [EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)
* [ePBS Spec](https://github.com/ethereum/consensus-specs/pull/3828)
* [Prysm](https://github.com/prysmaticlabs/prysm/pull/13917)
* [ePBS specification notes](https://hackmd.io/uWVGcvcKSoqS4P5c5NHG3g)
* [ePBS Forkchoice annotated spec](https://hackmd.io/@potuz/SJdXM43x0)
* [ePBS Annotated Validator Spec](https://hackmd.io/@ttsao/epbs-annotated-validator)
* [ePBS design constraints](https://hackmd.io/ZNPG7xPFRnmMOf0j95Hl3w)
* [Payload boosts in ePBS](https://ethresear.ch/t/payload-boosts-in-epbs/18769/1)
