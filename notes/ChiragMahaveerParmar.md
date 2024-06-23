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
1. What happened in the merge?
3. How to setup RPC over the onion network?
4. Why does the consensus client require authentication to connect to the execution client? Do they connect over the network? If yes, what about the extra overhead of network communications that can obviously be avoided?
5. How does the ephemery testnet work?
6. why is syncing from genesis not secure and incompatible with data availability checks?
7. what exactly are the data availability checks talked about in the previous question?
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

### Beacon chain, weak subjectivity and the merge [June 11 - 16]

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


questions:
1. what if i deliberately use a less random key and then use it to commit the random reveal? Is signing a pseudo random process? Where does the initial randao value come from?
2. how is randao seeded initially? Is there a higher chance of bias?
3. how much effort do we save for light clients by not choosing fisher yates shuffle?

### Side Quests: Deploying a node over a VPS

TODO (everything )
preimages
pruning
beacon backfilling
execution client initially requires consensus client then it starts syncing and doesn't require it anymore. actualy the other way is true, the beacon chain requires the execution client because the head is optimistic. What is this process?
if i have finality why do i need to download the entire chain
state download and chain download are independent processes




