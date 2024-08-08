# Samba: A Simple Portal Client in Java

Implementation of the Portal Client Specifications as a separate focused component that is easy to understand and contribute leverage by already available libraries that could be freely used to speed development or used as references. 

Code: https://github.com/meldsun0/samba

## Motivation

Increase client diversity by having another Portal Client in this case in Java. Today we have the following clients: https://www.ethportal.net/clients

## Project description

Implement a proof of concept of the Execution History Network sub-protocol in a way that could later be extended to include other sub-protocols. The idea is to have a module with all the necessary code for basic operations and another module for each sub-protocol with specific needs. 

## Specification

- Define domain object of the protocol-wire
- Research DHT and implement it.
- Check existence of UTP libraries and incorporate to the design. 
- SSZ implementation
- Incorporate Netty 
- Implement the following operations:
	- Joining the network
	- Finding Nodes
	- Neighborhood Gossip
	- Storing content
	- Finding content
- Expose API according to the Execution History Network. 
- Define storage
- Add monitoring
- Add metrics
- Add structure building process. 
- Add documentation and a wiki page 
- Implement integration test and validate different test vectors. 

## Roadmap

### August 

- Define domain object of the protocol-wire
- Research DHT and implement it.
- SSZ implementation
- Incorporate Netty 

### September and  October

- Implement the following operations:
	- Joining the network
	- Finding Nodes
	- Neighborhood Gossip
	- Storing content
	- Finding content
- Check existence of UTP libraries and incorporate to the design. 
- Implement integration tests and validate different test vectors. 
- Define storage

###  November and December

- Expose API according to the Execution History Network. 
- Add monitoring
- Add metrics
- Add structure building process. 
- Add documentation and a wiki page 

## Possible challenges

- I will be building the proof of concept while learning a lot of different things at the same time. 


### Learning

- I will get deeper in new libraries and low level stuff around the protocol and how it works. 
- I will get familiar with DHT, SSZ, UTP and the portal protocol itself. 


## Goal of the project

Have a fully working proof of concept of the Execution History Network sub-protocol that could be easily extended to incorporate the next sub-protocols. It should be a starting point to attract more collaborators that are willing to focus on Portal. 


## Collaborators

- Coordinate with another member of the EPF that is also working on a similar project. 

### Mentors

- There are currently no mentors. 


## Resources

https://www.ethportal.net/
https://github.com/ethereum/portal-network-specs  
https://github.com/hyperledger/besu  
https://github.com/ethereum/devp2
https://github.com/Consensys/discovery
https://www.ethportal.net/clients


