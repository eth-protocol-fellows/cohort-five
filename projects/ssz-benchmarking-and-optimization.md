# SSZ Benchmarking and Optimization

Building a benchmarking suite to properly compare ssz implementations against each other on real blockchain data, and working on a high-performance rust implementation of SSZ.

## Motivation

Serialization is something that happens many times over the lifetime of the Ethereum protocol. Clients use this to store data locally and transmit data structures (like blocks, txs, and consensus objects) over the network. A standard format is required to share data between clients implemented in many different languages, where data structures may have different in-memory representations.

Optimal serialization is crucial, because without it your system pays an invisible tax over time in terms of encoding/decoding latency. I want to build a super optimized implementation to quantify how much time can be saved. Furthermore, I think the community can benefit from having better tools to compare and benchmark the many ssz implementations.

## Project description

### High Performance SSZ
First, I want to work on a new rust implementation of szz, which will hopefully be more performant than [ssz15](https://github.com/karalabe/ssz/tree/main) and [ethereum-ssz](https://github.com/sigp/ethereum_ssz). I will perform some benchmarking and diagnostic tests to narrow down possible bottlenecks in current implementations, and optimize those if there are any. Afterwards I want to try speeding up encoding/decoding using SIMD where possible, and trying out what I call "lockstep encoding and hashing". Hopefully these result in significant speedups.

#### Lockstep Encoding and Hashing
Part of the end-to-end flow of serialization objects on Ethereum also includes a step afterwards where the serialized output is then Merkleized (i.e. hashed into a tree). Currently, there are libraries for pretty [fast encoding/decoding](https://github.com/protolambda/eth2.0-ssz?tab=readme-ov-file#implementations) and [fast tree hashing](https://github.com/prysmaticlabs/hashtree/tree/main) separately. I have a hunch that there could be additional gains to be had by considering both steps as a whole, and I want to explore an implementation that considers this.

Keccak256 belongs to a class of hash functions called Sponge hash functions. These sponge functions work by having an absorption phase where an input of any length is split into r-sized chunks and XOR-ed into some state S. Finally, once all the input chunks are consumed, the state S is squeezed into an output of desired length.

I want to try absorbing the input as it gets encoded, passing in r-sized chunks whenever they’re ready to be absorbed.

This way we can encode and hash in one pass! Speeding this up even by a little is meaningful since we can expect to do this operation many times over the lifetime of the protocol.

### Benchmarking Suite
Second, I want to build a ssz benchmarking suite to accurately assess performance of various ssz implementations and visually display how they perform against each other. I want to add nice plots and useful reports as well as differential flamegraphs to compare where in the encoding/decoding steps are certain packages lagging behind others.

## Roadmap

### Phase 1

In the first phase, I will take my time running tests and benchmarking the current ecosystem of ssz implementations. It's a slow way to start but it should be worthwhile and remove a lot of the guesswork in optimizing my own implementation.
I will setup a workflow for:
- Obtaining real `BeaconBlock` and `BeaconState` data from mainnnet using [ethdo](https://github.com/wealdtech/ethdo) and
- Using said data in current benchmarks, which currently use consensus spec tests
- Profiling execution and memory allocations using [dhat](https://crates.io/crates/dhat). Allocation is the only real bottleneck in serialization since there are no expensive computations being done otherwise.

A benchmarking suite will emerge from the frequent testing I'll be doing as I begin streamlining my methodology. As such, I won't focus on building this suite from the getgo, but rather attempt to find optimizations first and then "productionize" my benchmarking flow.

### Phase 2

In this phase, I will begin performance bug-hunting in various ssz crates (mainly lighthouse's). I'm hoping to make meaningful contributions and submit some PRs. This phase will inform whether pushing changes upstream will be more than enough for optimizing rust ssz crates, or whether a redesign can achieve sizeable improvements here.

### Phase 3

I will begin working on my optimized ssz implementation, or productionizing the benchmarking suite.

### Phase 4

Polishing the optimized ssz implementation and benchmarking suite.

## Possible challenges

### Flamegraphs Incompatible For Comparisons Between Crates

It’s unclear how differential flamegraphs could be used to compare different implementations, even if they implement the same traits.

### Managing Complexity with SIMD

It’s possible that vectorizing some operations would make the library difficult to maintain and upgrade.

### Overhead of Lockstep Encode + Hash May Not Be Worth It

Any tooling to synchronize lockstep encoding & hashing might introduce some overhead that would eat away at any potential gains.

## Goal of the project

- Find worthwhile performance gains with this new ssz implementation. Shaving even a ms off encoding/decoding time would be great.
- Figure out if there's any gain to be had by considering encoding + hashing as a whole, rather than two separate parts. This might be off independent interest if it leads to performance gains.
- Improve benchmarking practices between [all ssz implementations](https://github.com/protolambda/eth2.0-ssz?tab=readme-ov-file#implementations) and visualize how they differ.

## Collaborators

### Fellows

No.

### Mentors

I don't have one yet, but I'd like to ask Potuz or someone from Lighthouse to mentor me.

## Resources

[EF Protocol Wiki](https://epf.wiki/#/wiki/CL/SSZ)
[Upgrading Ethereum: SSZ](https://eth2book.info/capella/part2/building_blocks/ssz/)
[ssz15](https://github.com/karalabe/ssz/tree/main)
[Lighthouse rust ssz crate](https://github.com/sigp/ethereum_ssz)
[gohashtree](https://github.com/prysmaticlabs/hashtree/tree/main)
[All ssz implementations](https://github.com/protolambda/eth2.0-ssz?tab=readme-ov-file#implementations)
