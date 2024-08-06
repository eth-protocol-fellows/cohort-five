# Besu Portal Client

Implementation of the Portal Client Specifications in Besu 

## Motivation

I am looking to tackle the network storage solution proposed by the Portal Network. The Portal Network has the capability to affect the way Ethereum is interacted with by enabling it to be more accessible to less capable devices. This is done by drastically reducing node storage requirements creating a much more user oriented/friendly experience for Ethereum. Because such a client mainly has to do with the EL interactions with the Ethereum blockchain and primarily handles the distribution of information, it does not actually require an explicit change to the protocol. Rather, the Portal Network operates outside of the protocol and only interacts with the actual implementation and function of node storage. Due to the distributed design of the Portal Network it also has the potential to further decentralize Ethereum. By implementing a Portal Client to work with Besu I can increase Portal Client diversity and also make the Portal Network as a whole more accessible to users. In doing so I am able to advance the benefits that come from the use of Portal and contribute to creating a more diverse selection of clients. Finally, a Portal Client for Besu is something that the Besu team is looking to have implemented to take advantage of the benefits that the Portal Network provides.

## Project description

The purpose of my project is to implement the Portal Network Specification into a Portal Client designed for use with Besu. This project will be built using Java to match Besu. The project is largely just the implementation of the pre-existing specification from the Portal Network Specification repository. I intend to implement the Portal Wire Protocol and the state, history and beacon chain sub-networks which are the three most specification complete networks. If time allows I can then also begin implementing the remaining three preliminary sub-networks.


## Specification

The Portal Client will meet the following specifications:
- Designed using Java
- Use of the dependency injection library Dagger as specified by the Besu team
- Implement the Portal Wire Protocol
- Implement the three primary Portal sub-networks (state, history, beacon chain)
- Designed to integrate directly with Besu
- Aim to model base forms of communication such as Discovery V5 Protocol and JSON-RPC after the existing Besu implementation
- Designed to let the sub-networks operate independently
- Either provide a storage method or work with the Besu client to alter how information is stored to appropriately meet the Portal Network needs
- Meet any other design requirements that the Besu team may deem necessary

## Roadmap

### Project Design (~1-2 weeks)

In this portion the main goal is to create a project layout and plan as to which client communication implementations I should tackle first. It will also include setting up a barebones application for me to then build the project on. I will be spending more time familiarizing with the Besu codebase as well in order to find additional ways to better accommodate the client.

### Communication (~7 weeks)

Because every piece of the Portal Network relies on the Wire Protocol my main priority is to implement all relevant communication methods for the sub-networks to communicate with.

The main implementation pieces of this portion include:
- Discovery V5 Protocol
- uTP Protocol
- JSON-RPC capabilities
- Portal Wire Protocol

When implementing these concepts I am also looking to create a thorough test-bed. Doing so to ensure everything is functioning as intended before moving on to networks that will function on top of these communication methods. Additionally I will be able to perform some basic interop testing with existing Portal Clients.

### Portal Sub-networks (~8-9 weeks)

The first portion regarding the development of the Portal sub-networks is the storage design. Once that is in place I can begin working on the three sub-networks. There isn't a particular order that is set in stone but I will likely develop in order of history, state and beacon chain. 

Designing each sub-network will follow a similar process. Because the sub-networks are intended to be able to operate independently they can all be implemented in a step by step process consisting of:
1. Communication implementation on top of the Portal Wire Protocol
2. Necessary Portal specific JSON-RPC endpoints
3. Implementation of the actual sub-network function and linking to storage
4. Linking to the Besu Client
5. Internal Testing
6. Interop testing with existing Portal Clients


## Possible challenges

### Learning

When developing the client there will be some challenges in regards to learning different software and libraries to incorporate into its codebase. Some of such might include:
- Learning new library functionality features that Java offers. In order to create an up-to-date and best performing product I will likely have to take advantage of the many different features that the Java library has to offer. In order to do so I will have to learn new features as I go for when I need a certain functionality that the library may offer.
- Although I have prior experience with Java, it was in a much different context. To better suit the clients needs I will have to switch development paradigms which may require learning some new design frameworks.
- As the use of the dependency injection framework for the Besu Portal Client is requested by the Besu team, I will have to familiarize myself with its use and how to properly implement it.
- As I develop the client I will also have to continue to learn different parts of the Besu codebase as I need them. Mainly to be able to link the Portal Client with Besu so they can effectively work together.
- Any additional libraries that either the Besu team requests be used or that I find to be beneficial to the client will also have to be learned.

### Implementation

During the implementation process there are a few foreseeable roadblocks that I might run into. Most of which are certain design details that I will have to decide on in addition to meeting quality testing standards. Some of such challenges might include:
- Creating the base protocol for which the entire Portal Client will operate on top of. This will likely be my biggest challenge, which is also why I have allotted almost two months time to be able to complete it. It is incredibly important that it is fully functional so that everything else that follows does not run into any problems. Fortunately I am not alone in the development process for implementing things like Discovery V5 and uTP as others both in and outside of the EPF have expressed interest in this development portion.
- Another larger challenge has to do with creating an appropriate storage schema for the client. In addition to deciding on the best suited database software to achieve that design.
- The last big implementation challenge is to get the client to properly interact with the existing Portal Clients. This will likely require collaboration with the teams behind the clients to ensure that everything is functioning on both ends.

## Goal of the project

Given the large size of a complete Portal Client with all six sub-networks designed and functioning it will likely not be possible to implement the entirety of the Portal Specifications in the allotted time. However that is why I have adjusted my goal to a more reasonable scope of completing the three main sub-networks. Because of the modularity of these networks, they are able to function independently and so the client will still have most of the functionality when interacting with other Portal Clients. Seeing as the other three sub-networks are also still preliminary this means that the Besu Portal Client will be pretty much up to speed with the existing Portal Clients at the end of EPF 5. So in order to achieve full success on the project I will have implemented:
- The Portal Wire Protocol
- State Network
- History Network
- Beacon Chain Network

Which will then enable the Portal Client to have full functionality in regards to those networks on other Portal Clients. It will then have the majority of the Portal Client functionality as defined in the Portal Client Specifications and be essentially up-to-date with the existing clients. In the event that one or more sub-networks take longer than the specified scope, the networks that are implemented will still have full functionality. I would still consider such a situation as partial success as there would still be a fair amount of functionality. Should I have additional time I will be able to focus on implementing the three preliminary networks to have the client fully up-to-date.

## Collaborators

### Mentors

There are currently no mentors but I hope to attract a few throughout the development process.

## Resources

https://github.com/hyperledger/besu  
https://github.com/ethereum/portal-network-specs  
https://github.com/eth-protocol-fellows/cohort-five/blob/main/projects/project-ideas.md  
https://docs.google.com/presentation/d/1VE-vhn2C5BV2xdM5bps2uUS9kIjoCojkjhOVpnzM840/edit?usp=sharing  

