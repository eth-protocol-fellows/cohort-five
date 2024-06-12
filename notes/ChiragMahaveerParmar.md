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

### Beacon chain, weak subjectivity and the merge [June 11]



