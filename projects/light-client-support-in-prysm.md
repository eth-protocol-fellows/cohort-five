# Light Client Server Support in Prysm

This project aims to add light client server support to the Prysm consensus client.

## Motivation



The Light Client protocol has been introduced since Altair, and it adds the possibility for light clients to connect to the network and keep up with the chain with minimal hardware and network requirements. 

For light clients to be able to connect to the network, full consensus clients need to add the support for the [sync protocol](https://github.com/Inspector-Butters/light-client-consensus-specs/blob/main/full-node.md). Right now only Lodestar and Nimbus have implemented the protocol into their clients. we aim to add the support in Prysm as well.

Adding light client support to Prysm would allow for:
- More diverse consensus client set that support light nodes.
- More light clients to connect to the network.
- Better load balancing between consensus clients.
- An stronger network.

## Project description

Based on the latest [consensus-specs](https://github.com/Inspector-Butters/light-client-consensus-specs/), We will implement the required API's and p2p subs, that allow light clients to connect to a Prysm node and get Light Client Updates.


## Specification
There are 4 API's and 2 gossip subs that are needed for light nodes to get updates and sync the chain. 

There is a `LightClientBootstrap` endpoint which allows light nodes to get the current/next Sync Committee from a block hash that they trust is part of the canonical chain. 

After that they will use the other 3 APIs `LightClientUpdate`, `LightClientFinalityUpdate`, and `LightClientOptimisticUpdate` to sync the rest of the chain up to the head. 

The two gossip subs are used then to broadcast new updates to the online light clients.

A caching mechanism will also be implemented to cache [the best update](https://github.com/Inspector-Butters/light-client-consensus-specs/blob/main/sync-protocol.md#is_better_update) from each period, so we would not need to calculate it every time.

## Roadmap

There are [a few steps](https://github.com/prysmaticlabs/prysm/issues/12991) we need to take. 
Also we have spent some time on researching and understanding the light client protocol, but there is still more to read.
An abstract timeline would look something like this:
- The first two months would be spent on understanding and implementing a working version of the protocol.
- Then a third month would be spent on refactoring and optimizing the code, and adding small features to the implementation.

## Possible challenges

- The implementation should not introduce visible overhead to the system e.g. cpu/memory/bandwidth usage.

## Goal of the project

The finished project will have all the needed [beacon APIs](https://github.com/ethereum/beacon-APIs/tree/master/apis/beacon/light_client) implemented in the Prysm client.
Hopefully we would have light clients connected to Prysm nodes and receiving updates from them. 

## Collaborators

### Fellows 

- [Rahul](https://github.com/guha-rahul)
- [Rupam Dey](https://github.com/rupam-04)
- [Bastin](https://github.com/Inspector-Butters)

### Mentors

- [Radek](https://github.com/rkapka)

## Resources

- [Prysm Repository](https://github.com/prysmaticlabs/prysm)
- [Tracking issue #12991 Light Client Support](https://github.com/prysmaticlabs/prysm/issues/12991)
- [Light client consensus specs](https://github.com/Inspector-Butters/light-client-consensus-specs)
- [Previous contributions](https://github.com/prysmaticlabs/prysm/pull/12854)
- [A list of light client sync endpoints](https://s1na.github.io/light-sync-endpoints/)
- [Implementation of light client support in Nimbus](https://github.com/status-im/nimbus-eth2/blob/stable/beacon_chain/rpc/rest_light_client_api.nim)
- [Implementation of light client support in Lodestar](https://github.com/ChainSafe/lodestar/blob/b453b37d53a946b6faf73277fe1d75becff3ae8f/packages/beacon-node/src/api/impl/lightclient/index.ts)