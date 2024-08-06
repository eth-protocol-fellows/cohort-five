# Enhanced DHT Proposal with Rated List and Hierarchical Levels

Formal definition, implementation, and verification of the rated list Distributed Hash Table (DHT) for data availability sampling (DAS).

## Motivation

### Introduction to DAS
Data availability sampling in Ethereum is an attempt to solve both data integrity and data availability problems for nodes with minimal storage requirements. DAS ensures that the data is available by probing for specific samples from other nodes in the network, and then employs erasure codes for reconstruction. Full Danksharding aims to further enhance this mechanism by fully integrating data availability sampling into Ethereum's sharding design, thereby allowing each shard to independently verify data availability while maintaining the overall security and efficiency of the network.

### Step towards Full danksharding
However, there are a sufficiently large number of changes that are required to accommodate full danksharding, and to efficiently achieve the throughput that is envisioned. One such improvement lies in the structure of the Distributed Hash Table currently employed in protocol.
Existing DHT solutions like Kademlia present a bottleneck for sample dispersal [[1]](#Resources) when block proposers are the sole seeders of the DHT.  From the perspective of security, a single malicious hop in kademlia can lead to an infinite lookup. On the other hand, it practically has no sybil resistance allowing a local portion, or even a global portion, of the keyspace to be flooded. Moreover, kademlia is 20year old DHT technology leaving it ill-optimized for DHT solutions for a use case like Ethereum. Hence, to support the security and networking requirements of full danksharding a better construction of a DHT is required.

## Project description
We develop on the idea published by Dankrad in his blog titled “The Rated List”, which enhances existing DHTs based on having a “list” of all nodes and hierarchical levels, but with some rating added in for protection. There has been supporting research [[5]](#Resources) that validate simulating a social network for a DHT for stronger sybil resistance.

We start by first drawing out a formal specification of the rated list that serves as an extension of the formal definition of DAS [[3]](#Resources). Then we go on to build a Proof-of-Concept while also identifying and defining the security properties essential to the framework(Security-by-Design). Then we test against the POC for basic functionality, network analysis and security analysis. Finally, we intend to comment on the viability of the solution for full danksharding based on its robustness and integrity.

## Specification

While the spec is yet to be defined [[4]](#Resources), we do have a few descriptive points to add over the loose specification provided in the blog[[2]](#Resources). 

- We know that the rated list would sit over existing peer discovery protocols like discv5. Hence we first start developing template integrations into existing p2p libraries to pave way for the full implementation.
- We rely on a few already defined ideas like deterministic selection from peerDAS to enable certain parts of the rated list. Hence we start adding them to specs first and create abstract implementations for the same.
- The DHT would maintain a liveliness index of all the peers on a per slot basis. The lower scoring peers are marked as defunct, and all their descendants will now longer be queried unless they are also descendants of non-defunct peers.
- For the security properties, we will conduct the simulation and stress testing, adversarial testing, penetration testing to identify potential vulnerabilities and weaknesses.
We will simulate malicious behaviors (e.g., Sybil attacks, DDoS attacks) and verify the system's defenses and recovery mechanisms.

## Roadmap

The project will roughly consist of three phases.

- Phase 1: Formal definitions: week 6-8.
During this phase, we will convert the scheme into a formal definition one to better analyze it in the following.

- Phase 2: Implementation: week 8-14.
Implementing the p2p specification changes for rated list DHT and write tests, turns out the statistical results such as the bandwidth to maintain the list, storage and so on.

- Phase 3: Verification: week 14-20.
To ensure the security and integrity of the system, we will perform a comprehensive security analysis based on these defined properties. This process will involve:
    - Liveness Verification: Ensuring that the system remains operational and responsive, even under adverse conditions.
    - Robustness Verification: Assessing the system's ability to withstand and recover from various types of failures and attacks. 
    - Additional Security Properties: Evaluating other relevant security aspects, such as data integrity, confidentiality, and network partition resilience.


## Possible challenges
- Converting the scheme into implementation in the ethereum ecosystem
Simulate various network conditions, including high loads, node failures, and network partitions. 
- Obtaining system wide networking metrics in a consistent manner.
- Launch the adversary attacks and analyze the results. 


## Collaborators

### Fellows
[Ashely](https://github.com/AshliaYan)

[Hopinheimer](https://github.com/hopinheimer) 

[Chirag](https://github.com/chirag-parmar) 

### Mentors
[Dankrad](https://github.com/dankrad) 

## Resources

1. https://arxiv.org/pdf/2402.09993
2. https://notes.ethereum.org/hfbmSM_9RYas6t013xjq6Q
3. https://eprint.iacr.org/2023/1079.pdf
4. https://github.com/dankrad/rated-list-specs
5. https://pdos.csail.mit.edu/papers/sybil-dht-socialnets08.pdf
6. https://www.cl.cam.ac.uk/~rja14/Papers/sybildht.pdf
