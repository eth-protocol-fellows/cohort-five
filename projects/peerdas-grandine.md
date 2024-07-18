# PeerDAS improvements in Grandine

**TLDR**: link to our [slides proposal](https://docs.google.com/presentation/d/1_mKAAYlF0kKhDwaJ67o5_ki4_aSYg4SSGwiMuZD9sgg/edit?usp=sharing) for our motivation on the project.

PeerDAS specs is still maturing, so there are a lot of changes and improvements that need to be implemented in Grandine.

*Thanks to [Saulius Grigaitis](https://github.com/sauliusgrigaitis) for feedback and review*

## Motivation

The [recent blob fee market issues](https://x.com/mcutler/status/1803876002734735381) went crazy when too many type-3 transactions *(blob-carrying-transaction)* were competing to submit onchain, which is a clear evidence that the need for more scalability is essential for handling that much demands from L2-rollups.

*Porting from motivation in [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)*

> DAS is a method of scaling data availability beyond the levels of EIP-4844 by not requiring all nodes to download all data while still ensuring that all of the data has been made available.
> 
> Providing additional data availability helps bring scale to Ethereum users in the context of layer 2 systems called “roll-ups” whose dominant bottleneck is layer 1 data availability.

## Project description

*Abstraction from [EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)*
> PeerDAS (Peer Data Availability Sampling) is a networking protocol that allows beacon nodes to perform data availability sampling (DAS) to ensure that blob data has been made available while downloading only a subset of the data. PeerDAS utilizes gossip for distribution, discovery for finding peers of particular data custody, and peer requests for sampling.

The proposed solution is to continually improve existing PeerDAS implementation, which is done on major functionality by Grandine team. Since the specs is involving on different layer stack, it's better to divide tasks among fellows, we will have a person to porting on `libp2p` gossipsub and peer sampling *(networking)*, another person to handle updating core protocol to support lastest specs and ensure interop with other clients implementation *(core)*, while getting feedbacks and mentoring from Grandine team when we got stuck on the road.

## Specification

- For core protocol, we would be using [`das-core`](https://github.com/ethereum/consensus-specs/blob/dev/specs/_features/eip7594/das-core.md) specs as our compass, update existing implementation, and sync with other clients implementation.

- For p2p networking, we are backporting latest commits into [eth2_libp2p](https://github.com/grandinetech/eth2_libp2p/tree/eip_7594) compatible types in [grandine](https://github.com/grandinetech/grandine/tree/das).

- For kzg commitment cryptography, we would be using [c-kzg lib](https://github.com/ethereum/c-kzg-4844/tree/das) maintained by EF team, which is ready to use in the meantime, then switch to [rust-kzg](https://github.com/grandinetech/rust-kzg) once ready, maintained by Grandine team. Other folks are working on porting functionalities to the library.

## Roadmap

Since a few fellows are working on the same project, we will be dividing the work among ourselves. We got a draft plan from [mentors](#Mentors):
- Updating `PeerDAS` implementation to the latest specs
- Backporting `eth2_libp2p` library from [lighthouse](https://github.com/sigp/lighthouse/tree/das-devnet-1/beacon_node/lighthouse_network)
- Testing, Debugging `kurtosis` local devnets
- Ensure interop with other clients implementation

## Possible challenges

- **Limited Resources and Docs:** Grandine is a new consensus client implementation with a few contributors/core developers handle a handful of packages inside a single monorepo. They just open their source code in early 2024, so developers has no time to write a proper developer documentation. Their focus is on internal development, so for external contributors like us, we have to spend some times to get familiar with which package does what. A fellow is working on documentation and testing, we will collab with him on this side as well.
- **Devnet Monitoring and Debugging:** We have no experience at all on these aspects, it might be abit hard for us to understand the logs. Even if we see some errors/warning, we might don't know where it came from, and what its cause, and we are not sure if it's working or not even thought there is no errors. We might take some time to understand the logs, get used to it.

## Goal of the project

The goal of the project is to implement PeerDAS in Grandine, improve the existing implementation, optimize for better performance and security of the client, and ensure reliability of the network and interoperability between others client implementations. 

Beside implementation, battle tests need to be addressed against unexpected scenarios. So, it is essential to implement tests case and benchmarking those metrics as well. A fellow is working on metrics and benchmarking, we will collab with her on these aspects.

## Collaborators

### Fellows 

- [Hangleang SUN](https://github.com/hangleang)
- [Guha Rahul](https://github.com/guha-rahul)

### Mentors

- [Saulius Grigaitis](https://github.com/sauliusgrigaitis)

## Resources

- [Grandine Repo](https://github.com/grandinetech/grandine/tree/das)
- [PeerDAS Specs](https://github.com/ethereum/consensus-specs/tree/dev/specs/_features/eip7594)
- [eth2_libp2p Repo](https://github.com/grandinetech/eth2_libp2p/tree/eip_7594)
- [c-binding KZG Library](https://github.com/ethereum/c-kzg-4844/tree/das)
- [kurtosis local devnets](https://ethpandaops.io/posts/kurtosis-deep-dive/)