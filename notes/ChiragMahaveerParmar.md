# Learning Ethereum

## Preface

I'm the kind of learner who likes to poke around, break some stuff, open it up and do everything else that breaks the carefully abstracted boundaries of the systems around us. I do believe abstractions in software are a necessary evil but I also believe that they are made to be broken. Moreover, I do not follow a systematic approach for gathering knowledge on a subject. Hence, this document is my unorganized scratch pad of the learning process.

Disclaimer:
I already have a fair amount of understanding of the ethereum protocol before POS, so this document will dive deeper into the newer concepts of the protocol(the merge and later). Sometimes I write down seemingly stupid and unnecessary statements, these are notes to myself or anyone viewing this document. 

## Phase One

### Always start with something tangible [June 10]

[Run a node](https://ethereum.org/en/developers/docs/nodes-and-clients/run-a-node/#spinning-up-node) - [What is a node?](https://ethereum.org/en/developers/docs/nodes-and-clients/#what-are-nodes-and-clients). You dont have to know what you are doing just copy paste instructions (we programmers are great at it :P). Dont be a wuss, go for a manual client setup.

Things learned:
* The Ethereum protocol is split into two(and a half) logical parts, execution and consensus(and validator, packed into consensus). There are softwares written to fullfil each logical parts and these are known as clients. So there is an execution client and an consensus client. Running both together = running a node.
* there are different flavors of clients based on the language they are written in and the features made available. Geth is the official execution client and is written in go. 
* always verify your downloads, if you dont you might be running a malicious version of the ethereum client which can result into bad thinds happening. Ethereum clients use PGP for verification, funny enough the tool is called GnuPG or GPG.
* the ethereum protocol has already been running for quite some time, hence, when you start your client you have to catch up with other nodes => syncing
* there are different sync startegies for execution clients: snap, full, archive, light. For some reason, light clients are not supported after the merge. Next step would be learning what happened in the merge, it almost seems equivalent to birth of jesus christ because almost every event is referred to as "after" or "before" merge.
* A full sync is a snap sync started from genesis instead of a trusted checkpoint. An archive sync, syncs everything from a-z, starting from the genesis block. 
* there are also different sync strategies for consensus clients: optimistic and checkpoint. 
* Based on how a node is synced(mostly execution) it is classified into three types: light node, full node, archive node.
* Consensus clients need a jwt secret to connect to the execution client. I wonder why this is required if both the clients live on the same machine?
* ephemery is an ephemeral testnet, a testnet that resets itself every 7 days. For setting up ephemery we start from genesis.json which literally decribes the the genesis block. This is interesting.
* Once the node is setup and running we can use the RPC to interact with it. Interestingly enough RPC can be made available through the Tor onion network also.

Open Questions:
1. What happened in the merge? Before the merge validators were just validating empty payloads, as an analogy, miners only calculating hashes for a block without transactions or any other block related data. The merge increased difficulty on og ethereum chain and incorporated the blocks from it into the beacon chain.
3. How to setup RPC over the onion network? still in process
4. Why does the consensus client require authentication to connect to the execution client? Do they connect over the network? If yes, what about the extra overhead of network communications that can obviously be avoided? [the answer lies within](https://github.com/ethereum/execution-apis/blob/main/src/engine/authentication.md)
5. How does the ephemery testnet work?
6. why is syncing from genesis not secure and incompatible with data availability checks? weak subjectivity
7. what exactly are the data availability checks talked about in the previous question? if the truth about the canonical chain cannot be established then data availability cannot be guaranteed(gurantees against witholding data by any node or group of nodes or even supermajority of nodes)
8. what is snap sync? importantly what is the range proof? how is the state regenerated? what is state healing? 

### Pair the Curves [June 10]

Elliptic curves and elliptic curve pairings seem to be the center of all things cryptography, including zero-knowledge.

[exploring elliptic curves](https://medium.com/@VitalikButerin/exploring-elliptic-curve-pairings-c73c1864e627) - [] 

Things learned:
1. Elliptic curves form a group under the operation of point addition. Negative points under point addition operation are defined to have a negative y coordinate. Therefore if we add P + (-P) we get a line parallel to the y axis and we say that the result of the addition equals to point at infinity (by the rule of intersection in point addition). This is similar to saying that two parallel lines meet at the point at infinity (it is figurative point). From a different perspective, we are trying to say that just as a pair of points define a line and pair of lines have to define a point. Although this is referred to as the axiomatic symmetry of points and lines and is called duality. [refer projective geommetry](https://en.wikipedia.org/wiki/Point_at_infinity)
2. Pairings are just two variable functions that are linear in both variables. [refer linearity here](https://en.wikipedia.org/wiki/Linearity) A bilinear function is linear in both variables i.e. when one variable is kept constant and the other one is varied it is linear and same goes the other way round as well. In elliptic curves, pairings take input as points from an elliptic curve group(either the same or different) and map the output to another point in a different group.
3. Pairings are particularly useful because, unlike normal elliptic curne group operations that allow only linear operations, pairings allows quadratic operations. Under normal ECC math, you can add points and multiply them by scalar quantities but you cant multiply points with points -> quadratic. Moreover, under normal ECC I can only check linear constraints (eg. if P = G * p, Q = G * q and R = G * r, checking 5 * P + 7 * Q = 11 * R is really checking that 5 * p + 7 * q = 11 * r), pairings let you check quadratic constraints (eg. checking e(P, Q) * e(G, G * 5) = 1 is really checking that p * q + 5 = 0).
4. Being able to check quadratic constraints means you have achieved homomorphic encryption.
4. In zero knowledge cryptosystems I can convert arithmetic circuits to what are known as quadratic arithmetic programs. And then I can use pairings to check the constraints in an encrypted way. I guess.
5. The complex part of pairings is constructing the bilinear function. You use divisors of a function and then construct bilinearity using the divisors.

Open questions:
1. Is there no simpler way to construct bilinear maps using elliptic curves? How did we land on using divisors? 

### Beacon chain and the merge [June 11 - 16]

[beacon chain explainer](https://ethos.dev/beacon-chain) - [the merge](https://www.youtube.com/watch?v=8N10a1EBhBc) - [why pos?](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) - [part2 of eth2book](https://eth2book.info/capella/part2/)

Things Learned:
1. 32 slots per epoch, each slot is 12s. Nodes need to maintain roughly synchronized clock [clock synchronization](https://ethresear.ch/t/network-adjusted-timestamps/4187)
2. each slot is meant for one block. block proposer are chosen at random from the pool of validators for each slot of the epoch. all validators are "uniformly" distributed over all the slots of that epoch. they are then grouped into commitees for each slot. 
    a. each committee should have a minimum number of validators. [minimum committee size](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20)
    b. each slot can have multiple committees and it is usually recommended to have multiple committees. why? because if all validators of a slot are assigned to only one single committee it would take longer to aggregate all attestations. But if we have more than one committee per slot then the total number of aggregate attestations for that block increases thereby increasing the block space. it is a trade-off. [committees best explained here](https://eth2book.info/capella/part2/building_blocks/committees/)
    c. a similar trade-off is made to divide validators over the entire epoch. because if all validators attest on all slots, first, it would take a long time to aggregate all attestations and secondly it would flood the entire network thereby increasing the load.
    d. since the entire design of commitees is based on trade offs, naturally, there is also an upper limit to the number of committees per slot. And there is also a max validators per committee, although this is expected to not be reached as it would require all the ether in the network and more to be staked.
    e. minimum number of validators per slot = 128, maximum number of commitees per slot = 64
    f. there is more to commitees and aggregations, per committee there are also aggregators selected, [more info here](https://eth2book.info/capella/part2/building_blocks/aggregator/)
3. An attestation is weighted by the validators balance. So is the random selection process for proposing a block, in a sense mo money translates to mo heavier vote.
4. The randomness of the selection process is also generated in a distributed manner. This is termed as RANDAO. Basically, proposers signature is hashed and added to the previous randao value that exists. this way the reveal value (the signature of the proposer) is verifiably random (the source being the proposers private key used for signing).
    a. however some accounts do not have a independently generated random number for private key they are derived just like in BIP-32. the exact EIP is [EIP-2333](https://github.com/ethereum/ercs/blob/master/ERCS/erc-2333.md) 
    b. [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399) discusses other sources of entropy for the random number. the eip itself proposes a method to reuse deprecated block header fields and obsolete EVM instructions for bringing in the randao value into the EVM context for randomness. Note this randomness is public and not private.
    c. the biasability of randao is in the last slot of the of the epoch. the last proposer can choose to commit or not commit their reveal based on the randao accumulated until the second last slot. if the randao value without their commitment is more favorable for the followinf epochs then they can choose to not commit. this is one bit of influence. Based on their balances if a proposer gets proposal opportunity for the last k slots the it has k bits of influence.
    d. to provide some time for the validators to get ready a randao value has a minimum lookahead of 2 epochs i.e. randao accumulated at the end of epoch N is decides duties for epoch N + 2.
    e. a validator with a large proportion of stake or with the ability to mount a wide scale DoS attack agaist block proposers can influence the randao significantly, thereby having the ability to lookahead more than 2 epochs. in turn this can be used to mount a even more efficient attack, join and exit validators strategically for maximum rewads. to stop this the protocol uses defines a maximum lookahead feasible and delays all activations and exits by those many epochs.
5. Randao accumulation and shuffling has an inherent problem, along with the proposer, everyone else on the network also know that the proposer has been assigned to propose a block. A feature called single shot leader election is being researched on so that only the proposer knows ahead of time and everyone else can verify when the block is actually proposed.
6. We chose an invertible shuffle function to allow light clients to reverse calculate. To understand this, imagine a shuffling algorithm takes as input an index and outputs a shuffled index. Now I start shuffling a list of 10 elements. let' say the 8th element gets shuffled into the 5th index and the 3rd element gets shuffled into the 6th index. so to know which element lands in the 5th and 6th index i have to run the shuffling function for every element first. If the function is invertible, i can basically provide input 5 and 6 to the inverted function and then know that the 8th and the 3rd element get shuffled here. Since we use shuffling for committee assignment, an invertible shuffling function can reduce the load for light clients to process the entire list of validators rather light clients can just calculate in reverse. There are other details pertaining to the biasability of the shuffling function.
7. EIP-1011 partial move to PoS in the ethereum blockchain
8. the name beacon chain was taken from dfinity's randomness beacon. it also published a white paper using BLS signatures for aggregation before justin drake posted the famous "pragmatic signature aggregation with BLS"
9. The BLS scheme also supports threshold signatures, this enables distributed validator technology.
10. The BLS scheme is vulnerable to an attack, called the rogue public key attack. i can publish my public key to be my public key minus your public key. after which when i sign a message i can claim that both of us signed over it (but you didn't). The signature would verify as an aggregated signature, because when your public key is added to rogue public key the resulting aggregate would be my original public key.
11. the merge essentially is merging the existing execution layer (without proof of work) into the new consensus layer or beacon chain. The contracts for PoS were launched on EL, where validators made deposits but they participated in the consensus game on the beacon chain. 
12. PoS is subject to lesser economic risks compared to PoW. 
13. SSZ serializes a data structure into a byte array but is dependent on knowledge of the schema to reconstruct the data structure. in other words, two different data structures can get serialized to the same byte array and without the schema of the data structure we won't know how to differentiate between the two.
    * in the serialized string, dynamicaly sized datatypes are represented as 32 bit pointers and sotred at the last of the serialized string. Pointers are relative to the start of the containers in which synamically sized datatypes live.
    * most importantly containers containing variable length types are themselves considered variable length. in other words if container A contains a List then container A is variable length. Interestingly, the list within container A uses pointers, and IFF container A is itself packed into another container B then even container A will use pointer.
14. hash tree roots run over ssz. first we ssz then we split into 32 byte chunks and create merkle tree. The rules are more nuanced than this but this is the gist. Hash tree roots do something awesome, the take advantge of second preimage attacks on merkle trees, since inclusion proofs of the roots of subtrees guarantee inclusion of the entire body. [summaries and expansions](https://eth2book.info/capella/part2/building_blocks/merkleization/#summaries-and-expansions)


questions:
1. what if i deliberately use a less random key and then use it to commit the random reveal? Is signing a pseudo random process? Where does the initial randao value come from?
2. how is randao seeded initially? Is there a higher chance of bias?
3. how much effort do we save for light clients by not choosing fisher yates shuffle?

### Weak Subjectivity [June 18 - 20]

[weak subjectivity period](https://www.symphonious.net/2019/11/27/exploring-ethereum-2-weak-subjectivity-period/) - [Weak subjectivity in Eth2.0](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2) - [https://ethresear.ch/t/weak-subjectivity-under-the-exit-queue-model/5187](https://ethresear.ch/t/weak-subjectivity-under-the-exit-queue-model/5187) - [abstract explanation of weak subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)

This is a reading guide, start reading from point 0, don't skip reading any point. Hopefully this is the fastest knowledge transfer for you on the topic.

0. First read adrian's blog completely
1. adrian defines the problem from high level view. Once you understand the view, it must be clear that we try to attack a person who is syncing from a past block (let's say C0). The set of validators active at C0 is V0. This person is gonna want to know what is the next finalized checkpoint. For this person any checkpoint block that has signatures of 2/3 of validators in V0 is the next checkpoint. Now, since the entire network is running ahead of this person, validators who have exited after C0 till the current head can choose to act maliciously. Remember that this person doesn't know that these validators have exited becuase he is still at C0. Therefore, such a malicious act will not create slashing because the validators have already exited, just NOT for the person who is syncing from C0 (or before C0). If these "exited" validators form 1/3 of the validator set V0 (at C0 i.e in the past) they can create a conflicting finalized checkpoint.
2. In adrian's view none of the validators will get slashed because the attack is played out in the past. What if the attacker took control of the current validator set and wants to launch the same attack at the current head. The attacker would have to give up 1/3 of his validators (that he took control of or has control of). This is a classic discouragement attack discussed very often.
3. aditya and vitalik take the question one level higher. They simply ask, what if the attacker wanted to launch the same attack NOT on the current head(losing 1/3 validators) NEITHER so far back in the past(losing no validators) but somewhere in between. To make it clear this somewhere in between is still in the past, and the number of validators who have exited from this "somewhere in between" till the current head is lesser than 1\3 of the validator set at "somewhere in between". So the attacker can use these exited validators along with current non exited validators and launch the attack. In this case the attacker would lose a little lesser than 1\3 validators. 
4. In reality, the attacker can also take advantage of activations that happen directly on the conflicting fork. Aditya and Vitalik's post take into account even activations. We should too and we will when we read their blogs but let's understand the gist of the problem we are trying to solve.
5. Aditya and Vitalik, parameterize "somewhere in between" based on how many validators will get slashed; they put it as (1/3 - D). After parameterizing, they ask where can the attacker place this attack in the past, "at the earliest" (as close to the current head but still in the past). There are two unknown's in the question, D and the location of the attack. With two unknowns you usually get an algebraic equation out and you try to put different values in it and plot a graph or a table.  
6. Check only the table in aditya's blog. There is an extra unknown, validator set size, this is because the exit rates and activation rates are dependent on the validator size.
7. Now directly read the "calcuating the weak subjectivity period [complete version]" section in aditya's blog. If some of the mathematical equations don't make sense then maybe the points below help you.
    * The chain is forkful and the attacker takes advantage of existing forks to finalize a different block.
    * `|Q1 ∩ Q2|` are the number of validators who voted for both the forks, therefore these are the validators that wanted to create a conflicting checkpoint. Hence they will be slashed. We want the number to be lesser than or equal to `(1/3 - D) * |V1|`.
    * `|Q1| ≥ 2/3 * |V1|` and `|Q2| ≥ 2/3 * |V2|` is the base conditizon to finalize any checkpoint.
    * TODO: add more explanations for other mathematical expressions.

### Gasper [June 17, June 21]

[TODO] Didn't quite take notes but summarizing the learning sometime later would be useful as a refresher 

### Verkle Trees

[elliptic curves cheatsheet](https://hackmd.io/@timofey/rJ8HP8Yaj#:~:text=Base%20field%20of%20an%20elliptic,%2C%20scalar%20multiplication%2C%20and%20pairing.) - [IPA](https://dankradfeist.de/ethereum/2021/07/27/inner-product-arguments.html) - [peep an eip](https://www.youtube.com/watch?v=RGJOQHzg3UQ) - [verkle tree structure](https://blog.ethereum.org/2021/12/02/verkle-tree-structure) - [eip itself](https://notes.ethereum.org/@vbuterin/verkle_tree_eip)

- Verkle trees don't make ethereum stateless as a whole. it just allows there to be stateless clients by severely relaxing the bandwidth requirements to share state witnesses.

### NATs

[PAT (look at the very last console output)](https://study-ccna.com/port-address-translation-pat-configuration/) - [types of NATs](https://www.cisco.com/c/en/us/support/docs/ip/network-address-translation-nat/217599-understand-nat-to-enable-peer-to-peer-co.html) - [infographic on usage of NATs by their types in the real world](https://web.archive.org/web/20200213115759/http://nattest.net.in.tum.de/results.php) - [autoNAT](https://github.com/libp2p/specs/blob/master/autonat/README.md) - [the only unambiguous source of truth](https://en.wikipedia.org/wiki/Network_address_translation)

- NATs have a basic job; convert internal IP to external IP as the packet goes from internal network to the external network. There are different ways to do this, 
    - every different internal IP gets mapped to unique external IP a.k.a one-to-one mapping
    - for every internal IP you have the same external IP but different ports a.k.a one-to-many mapping or port address translation or NAT overloading
    - there are further classifications that overlap at different degrees with the above two. The wikipedia article seems to be the only unambiguous source on the topic.

### EIP-1559 

[EIP](https://eips.ethereum.org/EIPS/eip-1559)

* This is the most brilliant EIP ever introduced in my opinion. Before EIP-1559, your transaction contained a single variable storing the gasPrice, a.k.a the amount of ETH you are willing to pay per gas. A normal transaction uses 21000gas as base gee (if you have calldata calling contracts then that adds more gas usage, the entire EVM model is based on this). Among so many users in the network, if I want the miner to include my transaction, then I pay them higher price per gas. Therefore, when the network got congested prior to EIP1559, the gas prices for a transaction to even be included in the block went up. It was worrysome because you could only predict to a certain degree and ended up over paying for the transaction (expecting congestions or spiked in the price). Moreover, and most importantly the voltaility of the fees did not match the social cost. 
    * The social cost of including one extra transaction at the very least is 21000gas.
    * but at times (ex. going from 8 million gas to 8.021 million gas) could shoot up the price of gas by 10x
 
Enter EIP-1559, seperate base fee and priority fee. The effective gas price = base fee + priority fee. But then what is the difference you may ask. The base fee is calculated by the network based on the last block's base fee and other things (check `def validate_block` under EIP-1559 draft). And the priority fee is decided by you. Since the base fee is calculated by the network using a set formula, prediction becomes easy = no overpayment. The best part, the base fee is burned, therefore the miners are not incentivizwed to create congestions.

### P2P metrics

* Strongly Connected (everyone can reach everyone) - Weakly connected (everyone can reach everyone if the graph was undirected) - Strongly connected sugraph - k-vertex connectivity (remain connected even if k - 1 nodes leave the network)
* Distance(u, v) - shortest path between u and v
* Eccentricity(u) - maximum distance between u and any other node
* Radius - minimum eccentricity over all nodes - shortest distance between any two nodes
* Diameter - mac ecc. over all nodes - max distance between any two nodes
* Characteristic Length - l - average distance between any two nodes
* Degree(u) - number of connections or edges of node u
    * accordingly there also exist max and average degree of all nodes
    * interesting metric is the degree distribution of the graph - degree vs num of nodes with that degree
* Betweeness Centrality counts the shortest paths that use a certain node in relation to all shortest paths. Therefore this metric is calculated for  every node. We check all paths from one node to the other and take ratio of how many go through the node in question. General rule of thumb, move away from ratio of 1 for any node
* Minimum Vertex Cut - a minimum set of nodes that will disconnect a good chunk of the graph
* Minimum Edge Cut - a minimum set of connections to nodes that will disconnect a good chunk of the graph
* General rules of thumb - avoid O(n) complexity for state and distance - avoid small cuts - roughly close to average degree for all nodes - minimize state while keeping characteristic length small
* types of graph construction strategies
    * random graphs - small world graphs (social networking) - waltz strogatz small world graphs - scale-free graphs (weighted peers with social networking) - rich get richer model by barabasi and albert.
* clusterin coefficient of a node - number of edges in neighbourhood of u divided by all possible edges in neighbourhood of u
* clustering coefficient of the graph - average it out

### Kademlia

[original paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) - [discv5 node table](https://github.com/ethereum/devp2p/blob/master/discv5/discv5-theory.md#node-table) - [concept explainer](https://www.youtube.com/watch?v=1QdKhNpsj8M)

1. The XOR metrix fulfills all the properties of a good distance metric, d(a,a) = 0, d(a,b) = d(b,a), d(a,b) + d(b,c) > d(a,c)
2. The routing table is constructed using k-buckets or lists of size of k. For every bit of the node ID one list is stored. This is a very ambiguous phrase. let's break it down.
    * so first of all, all node IDs are 160 bit digests. All keys of the data stored are also 160 bit digests. Both are mapped in the same space i.e. If i need to find a key with a certain value I look for a node with it's ID close to the key.
    * "For each 0 ≤ i < 160, every node keeps a list of <IP address, UDP port, Node ID> triples for nodes of distance between 2^i and 2^(i+1) from itself." To undertstand this here is an example. assume four node IDs 1101(13), 1001(9), 1111(15) and 1100(12). 13 and 9 differ in one bit (d = 1) but at the 2nd bit, 13 and 15 also differ in one bit but at the 3rd bit, 13 and 12 also differ in one bit but at the 4th position. The number of bits different is always one but the bit position changes. Every node maintains a list of k items for every bit position.
        * let's check the formula once assuming node id 13, i = 0 => all node ids with  d greater than 2^0 and lesser than 2^1 => 1100(12).
        * i = 1 => all node ids with d greater than 2^1 and lesser than 2^2 => 1111(15)
        * and so on...
    * What about 1010 => 1010 XOR 1101 => 0111(7) => this comes in between 2^2 and 2^3 so i = 3 => at position 2 there is indeed a change in the bit but there is also a change in bit position 1 and bit position 0.
    * There is no number that is in between 2^2 and 2^3 that differs more than first three bits. And MOST IMPORTANTLY there is no number in that range that does not differ in the 2nd bit.
    * So to speak, A list created for some 0 ≤ i < 160, there is only a difference in bits LOWER THAN the ith bit and THERE IS DEFINITELY A difference in the ith bit.
    * Inference: list of i + 1 is on average twice far away than that of list i.
3. From the explanation above it is clear that lists for the first few  values of i are most probably empty because the difference between node ids should only be a few bits
4. Nodes are added to list as encountered on the network(when a message is received from them). If the list has space the new node is added to the top of the list. If it is full, the node at the bottom of the list is contacted to check if alive, if not alive the new node is added to the top of the list. If the node at the bottom of the list responds, it is brought to the top of the list and the new node is evicted. If a node already exists on the list it is brought to the top of the list when encountered.
5. "By keeping the oldest live contacts around, k-buckets maximize the probability that the nodes they contain will remain online." This was an inference drawn from gnutella where the probability of a node staying alive for an extra hour is higher if the node has already been up for a long time. [This needs investigation, because "the more time a node is up the more wear it has gone through" is also a parallel theory.]
6. K buckets also provide a DOS resistance since new nodes are added only when old nodes are dead. So no node can flood the system without taking down old nodes.
7. NODE LOOKUP: I as a node get an ID to be looked up, first thing I do is XOR that id with my own id => `d`. Then I pick the appropriate k-bucket for `d`. Take `alpha` number of nodes from the `k` nodes and contact them. I send a FIND_NODE(ID) RPC request to those `alpha` nodes simultaneously. These nodes reply with `k` number of nodes each which are closest to the ID in their perspective. I refresh the `k` nodes with the closer nodes found in the replies (this refresh does not occur in the bucket itself but a copy of the bucket) I need not wait for all the `alpha` nodes to reply from before. I contact `alpha` number of nodes from this new list of `k` nodes. And the process repeats.
    * Termination Condition: The first reply gives me `k` nodes closest, the next one gives `k` more. I stop when I have `k` nodes in my list that are not farther than the `k` nodes in newer replies. https://github.com/libp2p/go-libp2p-kad-dht/issues/290. Will this even terminate? 
    * Edge Case: "If a round of FIND NODEs fails to return a node any closer than the closest already seen, the initiator resends the FIND NODE to all of the `k` closest nodes it has not already queried"
    * Different Perspective: Chord uses `alpha` = 1. Because a node contacts only one peer who it thinks is closest to the lookup ID. takes a hop if the contacted peer knows an ID closer to the lookup ID. Therefore, the terminating condition is when there are no more new hops to traverse.
8. maintenance and caching: refer paper.

Ethereum uses a kademlia DHT in its DISCv5 protocol, however, it makes modifications to it. First it does not use the XOR metric but the logarithm of the XOR metric (approximated to the next integer a.k.a ceil). The logarithm distance directly gives the length of suffix in bits. On top of this it does not use the DHT to store key value pairs. Instead it just uses the routing part (lookup and discovery) and every node's routing table consists of ENR records instead of <ip, port, id> triples.

There are more modifications, but the coolest one is the modification on the lookup. lookups in ethereum execute in multiple different paths. heh?? So in kademlia you pick up alpha nodes and send a FIND_NODE query, get replies and use the information within them to contact better nodes (closer). This is a single path. Ethereum executes multiple paths making sure NOT to use information from one path into another. More resiliency against 


### libp2p

[libp2p launchpad](https://pl-launchpad.io/curriculum/libp2p/connections/) - [ultimate pubsub explainer](https://docs.libp2p.io/concepts/pubsub/overview/#grafting-and-pruning) 

* Sits over the existing transport layer in the OSI layers. Is modular stack - but most of its usage is in the blockchain industry.
* it has the concept of negotiating protocols - where first you negotiate a meta protocol called multistream-select protocol - this is a protocol that define protocol negotiation
* once a multistream-select protocol has been agreed on - you select a security protocol - a multiplexer protocol - and a range of application protocols. 
* so the process is handshake - multistream-select - security - multiplexer - application. 
* a multiplexer allows supporting multiple application protocols over a single connection - imagine two protocols that are logically disjoint in their working and their use cases - if a particular peer has the choice of using both they would use a multiplexer - it is just a logical multiplexer, don't sweat it - the multiplexer switches between "streams" - each stream is one application protocol.
* to do the handshake you need to first know the peer address and port of the peer - for this libp2p exposes two interfaces(in the sense of object oriented programmin) - an advertiser and a discoverer interface - the discover interface has two default implementations - mDNS and Kademlia
* In ETH2 discv5 is implemented as a discoverer.
* The best part about the specification/project is their pubsub interface - it defines a publisher subscriber abastraction as an overlay of p2p network. pubsub is an application protocol interface (i guess) - and the protocol definitions of the interface are floodsub, randomsub and gossipsub - but i guess the three were sub protocol definitions - and now gossipsub is the default protocol definition
* Personal Note - Don't focus too much on what is derived from what because the gossipsub protocol is the default definition flattening everything.
* consensus client use the gossipsub protocol v1.1
    * the aim of gossip sub is to create a balanced trade-off between network bandwidth and robustness/resiliency of the pub/sub protocol.
    * it does this by employing two two strategies, first - it limits the networking degree of a peer (no. of connections) - this is controlled by a system wide parameter
    * Second it allows a peer to decide how many of its connection are full message connections and how many are metadata only connections
    * metadata connections are aptly represented by the dialogues "I have seen a particular message", "I want that particular message". The actual message is not included in these.
    * and the actual message is only transferred through a full message connection
    * While the gossip(metadata) flooding is controlled by the peering degree the heavy messages are controlled by the grafting and pruning strategy. The two strategies provide different controls.
    * there is an additonal control - fan out - publishing messages to topics you are not subscribed to - unidriectional connections to peers who are subscribed to that topic - these fanout peers are remembered on top of the existing peering degree.


### Project Specific

1. A good issue explaining why compilers are not great for cryptographic implementations. [here](https://github.com/mratsim/constantine/issues/39)
2. Refresher/Pre-req: [operand scanning and product scanning methods](https://iacr.org/archive/ches2011/69170459/69170459.pdf) - operand scanning is the school book method - school book method requires us to keep every intermediate result until everythingis accumulated - the product scannin method instead prioritizes calculating the partial products which would be needed to directly yield a part of the final result - check the diagrams in the paper
2. The abstract of the project as expalined in [this](https://github.com/mratsim/constantine/issues/200) is to create code generator in Nim for ARMv7 and ARMv8 architectures. Various papers are referenced in the issue. The key summaries are presented below,
    * [No Silver Bullet](https://eprint.iacr.org/2021/185.pdf) - Tests against ARM-Cortex-A and Apple A series processors (both ARMv8) - uses multiplication and then modular reduction - uses karatsuba for normal multiplication and karatsuba within the montogomery reduction technique (instead of using karatsuba within the montogomery multiplication + reduction technique) - reports said construction efficient for cortex processor but slower for apple processors - karatsuba replaces on multiplication with three additions/subtractions - apple processors have almost the same cycle count for multiplication and addition - therefore karatsuba increases the clock cycles that just normal school book method - the widely advertized complexity of karatsuba of O(n^1.58) takes into account only multiplications (i guess). Hence is proved wrong in this case - MUL and UMULH are the instructions used to get a full 64 bit multiplication result
    * [Kyber on ARM64](https://eprint.iacr.org/2021/561.pdf) - Uses SIMD for creating vectorized implementations of Barrett Reduction and Montogomery Reduction. Since the bit width is just 16-bits they do not require multi-precision techniques like karatsuba. Their use of montogomery and barrett reduction techniques in conjunction with NTT is not clear.
    * [Optimized SIKE Round 2 on ARM64](https://eprint.iacr.org/2019/721.pdf) - MUL and UMULH are the instructions used to get a full 64 bit multiplication result - This paper uses the school book method since it uses less number of addition operations at the expense of higher register usage - "The multiplication is performed in original row-wise multiplication rather than row-wise multiplication with Karatsuba method." - they also don't use a full karatsuba multiplication with the claim that it leads to more operations and memory accesses (probably since the width of the original multiplication divides up into a odd number of limbs) - they use montogomery reduction technque for modular reduction
    * [Curve448 on 32-bit ARM Cortex-M4](https://eprint.iacr.org/2021/1355.pdf) - UMAAL for multiplication and accumulation - The work seems to have used the term "operand-scanning" incorrectly since it uses the product scanning method with "operand caching" method. This method is particularly useful to save on loads and stores - they use fermat inversion and a custom method for fast reduction of curve448 since the modulus is static (needs more investigation)
    * [Efficient Multiplication of Somewhat Small Integers using Number-Theoretic Transforms](https://eprint.iacr.org/2022/439.pdf) - They challenge the viability of NTT for smaller width integers - this is against popular conclusions that NTT (scjonhage-strassen) algorithm only ever proves to be useful when considering integer with very large widths (in the order of 1000 or 10000 bits) - this paper shows the crossover point to be 2048 bits - this uses montogomery over NTT just like the kyber paper above - requires more investigation
     * [SIDH on ARM](https://eprint.iacr.org/2022/439.pdf) - they have a two pronged approach to implementation - they use both ARM and NEON(vector instr.) - they use consecutive operand caching method for ARM and karatsuba with cascade operand scanning method for NEON - their construction is rather complex - for reduction they use montogomery and within it they use other constructions for multiplications - definitely requires careful reading to fully understand the construction - They do however boast low clock cycles than most works of the same kind - [here is a informative presentation of the paper](https://ches.iacr.org/2018/slides/ches2018-session5-talk3-slides.pdf)
     * [] more coming soon
4. In other news: https://github.com/mratsim/constantine/blob/7d29cb9/constantine/platforms/isa/macro_assembler_x86.nim this is the code generator that mamy wrote for x86. It uses meta programming to define inline assembly code. Need to get into the details of this as well.

### Side Quests: Deploying a node over a VPS

1. What are preimages? these are the preimages to the hashes in the state trie. If we store preimages we save computational work in the future. Hence clients also have an option to store or not to store preimages while syncing.
2. what is pruning? pruning is removing stale data from the state trie. 
3. state download and chain download are independent processes, why is that? chain download downloads headers verifies them and then downloads receipts and block bodies and verifies them against the headers. state download is downloading the state.
4. if i have finality why do i need to download the entire chain?
5. What is beacon backfilling?
6. execution client initially requires consensus client then it starts syncing and doesn't require it anymore. After which the beacon chain requires the execution client because the head is optimistic. What is this process? beacon chain using checkpoint sync gives a target to execution client that it thinks is the tip of the chain. the execution client then starts from the target till the genesis(or whatever the local chain is from the last sync) to verify the entire chain and report to the beacon chain that the target indeed is correct. once this signal is given the beacon chain then follows the tip.

### Interesting Attacks
1. https://collective.flashbots.net/t/post-mortem-april-3rd-2023-mev-boost-relay-incident-and-related-timing-issue/1540
2. https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs



